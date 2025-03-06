<template>
  <div class="race-track">
    <div class="track-header">
      <div class="round-info">
        <h2><span class="race-label">Race:</span> Round {{ round.id }}</h2>
        <div class="race-meta">
          <div class="meta-item">
            <span class="meta-label">Distance:</span> 
            <span class="meta-value">{{ round.distance }}m</span>
          </div>
          <div class="meta-item" v-if="timer > 0">
            <span class="meta-label">Time:</span> 
            <span class="meta-value">{{ formatTime(timer) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="track">
      <div class="distance-markers">
        <div class="marker start" style="left: 5%">0m</div>
        <div class="marker quarter" :style="{left: `${5 + (round.distance / 4) / round.distance * 90}%`}">{{ Math.floor(round.distance / 4) }}m</div>
        <div class="marker half" :style="{left: `${5 + (round.distance / 2) / round.distance * 90}%`}">{{ Math.floor(round.distance / 2) }}m</div>
        <div class="marker three-quarters" :style="{left: `${5 + (round.distance * 3 / 4) / round.distance * 90}%`}">{{ Math.floor(round.distance * 3 / 4) }}m</div>
        <div class="marker finish" :style="{left: `${5 + 90}%`}">{{ round.distance }}m</div>
      </div>
      
      <div v-for="(horse, index) in selectedHorses" 
        :key="horse.id" 
        class="horse-runner"
        :class="{ 
          'leader': isLeader(horse), 
          'finished': horse.finished,
          'first-place': isFirstPlace(horse)
        }"
        :style="{
          backgroundColor: horse.color,
          left: `${5 + (horse.position / round.distance) * 90}%`,
          top: `${calculateHorsePosition(index)}%`
        }"
        :title="horse.name">
        <div class="horse-indicator">{{ horse.id }}</div>
        <div class="horse-stats">
          <div class="horse-name">{{ horse.name }}</div>
          <div class="horse-position">{{ horse.position.toFixed(1) }}m</div>
          <div v-if="horse.finishTime" class="finish-time">{{ formatTime(horse.finishTime) }}</div>
        </div>
      </div>
      
      <div class="finish-line" :style="{right: 'calc(5% - 5px)'}">
        <div class="finish-line-pattern"></div>
        <div class="finish-flag">🏁</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RaceTrack',
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timer: 0,
      timerInterval: null,
      finishedHorses: []
    }
  },
  computed: {
    ...mapState({
      selectedHorses: state => state.horses?.selectedHorses || []
    }),
   },
  methods: {
    calculateHorsePosition(index) {
      if (!this.selectedHorses.length) return 0;
      
      const horseCount = this.selectedHorses.length;
      const padding = 15;
      const availableSpace = 100 - (2 * padding);
      const step = horseCount > 1 ? availableSpace / (horseCount - 1) : 0;
      
      if (horseCount === 1) return 50;
      
      return padding + (index * step);
    },
    isLeader(horse) {
      if (!this.selectedHorses.length) return false;
      
      const finishedHorses = this.selectedHorses.filter(h => h.finished);
      if (finishedHorses.length === this.selectedHorses.length) return false;
      
      const maxPosition = Math.max(...this.selectedHorses.filter(h => !h.finished).map(h => h.position));
      return !horse.finished && horse.position === maxPosition;
    },
    isFirstPlace(horse) {
      const finishedHorses = this.selectedHorses.filter(h => h.finished);
      if (finishedHorses.length === 0) return false;
      
      const sortedHorses = [...finishedHorses].sort((a, b) => a.finishTime - b.finishTime);
      return sortedHorses.length > 0 && sortedHorses[0].id === horse.id;
    },
    updateFinishedHorses() {
      const finishedHorses = this.selectedHorses.filter(h => h.finished);
      this.finishedHorses = finishedHorses.map(h => h.id);
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      const millisecs = Math.floor((seconds % 1) * 100);
      
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millisecs.toString().padStart(2, '0')}`;
    },
    startTimer() {
      this.timer = 0;
      this.timerInterval = setInterval(() => {
        this.timer += 0.1;
        this.updateFinishedHorses();
      }, 100);
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  watch: {
    'round.id'() {
      this.finishedHorses = [];
      this.stopTimer();
      this.startTimer();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.race-track {
  position: relative;
  background-color: $white;
  border-radius: 10px;
  height: calc(100vh - 160px);
  overflow: hidden;
  transition: height 0.3s ease;
  display: flex;
  flex-direction: column;
}

.track-header {
  background-color: $dark-blue;
  color: $white;
  padding: 15px 20px;
  border-bottom: 1px solid $black;
}

.round-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    margin: 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    
    .race-label {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-right: 5px;
    }
  }
}

.race-meta {
  display: flex;
  gap: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  
  .meta-label {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-right: 5px;
  }
  
  .meta-value {
    font-weight: bold;
  }
}

.track {
  position: relative;
  flex: 1;
  background: $gray-lighter;
  padding: 20px;
  padding-left: 50px;
  padding-right: 20px;
  overflow: visible;
}

.distance-markers {
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  width: calc(100% - 30px);
  height: 20px;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  
  .marker {
    position: absolute;
    transform: translateX(-50%);
    
    &::after {
      content: '';
      position: absolute;
      top: 15px;
      left: 50%;
      height: 100vh;
      width: 1px;
      background: rgba(0, 0, 0, 0.1);
      transform: translateX(-50%);
    }
    
    &.finish::after {
      display: none;
    }
  }
}

.horse-runner {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-weight: bold;
  transition: left 0.1s linear, top 0.3s ease;
  z-index: 5;
  cursor: pointer;
  box-shadow: 0 2px 5px $black;
  transform: translateX(-50%);
  
  &.leader::after {
    content: '👑';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    z-index: 10;
  }
  
  &.first-place::after {
    content: '👑';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    z-index: 10;
  }
  
  &.finished:not(.first-place)::after {
    content: '✅';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
  }
  
  &.finished {
    box-shadow: 0 0 10px rgba($primary-color, 0.7);
    border: 2px solid $primary-color;
  }
  
  &:hover .horse-stats {
    opacity: 1;
  }
}

.horse-indicator {
  font-size: 1.2rem;
}

.horse-stats {
  position: absolute;
  bottom: 45px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 8px 10px;
  min-width: 100px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  transform: translateX(-50%);
  left: 50%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.8);
  }
  
  .horse-name {
    font-size: 0.9rem;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .horse-position {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  
  .finish-time {
    font-size: 0.8rem;
    color: gold;
    margin-top: 4px;
  }
}

.finish-line {
  position: absolute;
  top: 0;
  width: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
}

.finish-line-pattern {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    black,
    black 10px,
    white 10px,
    white 20px
  );
}

.finish-flag {
  position: absolute;
  top: -15px;
  font-size: 24px;
}

.distance-marker {
  position: absolute;
  width: calc(100% - 30px);
  height: 30px;
  top: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: $text-color;
  border-bottom: 1px solid $gray-lighter;
}
</style>