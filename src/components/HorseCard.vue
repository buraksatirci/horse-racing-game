<template>
  <div class="horse-card">
    <div class="horse-avatar" :style="{ backgroundColor: horse.color }">
      <span>{{ horse.id }}</span>
    </div>
    <div class="horse-details">
      <p class="horse-name">{{ horse.name }}</p>
      <div class="horse-stats">
        <div class="stat">
          <span class="stat-label">Speed {{ getSpeed(horse) }}</span>
          <div class="stat-bar">
            <div class="stat-fill" :style="{ width: `${getSpeed(horse)}%` }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="horse-condition" :class="conditionClass">
      {{ horse.condition }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorseCard',
  props: {
    horse: {
      type: Object,
      required: true
    }
  },
  computed: {
    conditionClass() {
      switch (this.horse.condition) {
        case 'Excellent':
          return 'condition-excellent'
        case 'Good':
          return 'condition-good'
        case 'Average':
          return 'condition-average'
        case 'Poor':
          return 'condition-poor'
        default:
          return ''
      }
    }
  },
  methods: {
    getSpeed(horse) {
      return horse.speed || 50;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.horse-card {
  display: flex;
  align-items: center;
  border: 1px solid $gray-lighter;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 2px 8px $gray-lighter;
    transform: translateY(-2px);
  }
}

.horse-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: $white;
  font-weight: bold;
  font-size: 1.2rem;
}

.horse-details {
  flex: 1;
}

.horse-name {
  font-weight: bold;
  margin: 0 0 8px 0;
  font-size: 1rem;
}

.horse-stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
}

.stat-label {
  width: 60px;
  color: $gray-light;
}

.stat-bar {
  flex: 1;
  height: 6px;
  background-color: $gray-lighter;
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background-color: $primary-color;
  border-radius: 3px;
}

.horse-condition {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: bold;
  position: absolute;
  top: 12px;
  right: 12px;
}

.condition-excellent {
  background-color: $condition-excellent;
  color: $white;
}

.condition-good {
  background-color: $condition-good;
  color: $white;
}

.condition-average {
  background-color: $condition-average;
  color: $dark-gray;
}

.condition-poor {
  background-color: $condition-poor;
  color: $white;
}

.stats {
  font-size: 0.85rem;
  margin-top: 10px;
  color: $gray-light;
  display: flex;
  gap: 8px;
}
</style> 