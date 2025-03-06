<template>
  <div 
    class="position-item"
    :class="{'position-item--winner': isWinner}">
    <div class="position-item__rank">{{ position }}</div>
    <div class="position-item__details">
      <span class="position-item__horse-id">#{{ horseId }}</span>
      <span class="position-item__horse-name">{{ horseName }}</span>
    </div>
    <div class="position-item__time">{{ formattedTime }}</div>
  </div>
</template>

<script>
import { useFormatters } from '@/composables/useFormatters'

export default {
  name: 'RoundResultItem',
  props: {
    horseId: {
      type: Number,
      required: true
    },
    horseName: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    finishTime: {
      type: Number,
      required: true
    }
  },
  computed: {
    isWinner() {
      return this.position === 1
    },
    formattedTime() {
      const { formatTime } = useFormatters()
      return formatTime(this.finishTime)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.position-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid $gray-lighter;
  transition: background-color 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: $result-hover-bg;
  }
  
  &--winner {
    background-color: rgba($primary-color, 0.05);
    
    .position-item__rank {
      background-color: gold;
      color: $dark-gray;
    }
  }
  
  &__rank {
    background-color: $position-bg;
    color: $white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    margin-right: 12px;
  }
  
  &__details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  &__horse-id {
    font-size: 0.8rem;
    color: $gray-light;
  }
  
  &__horse-name {
    font-weight: 500;
  }
  
  &__time {
    font-family: monospace;
    font-size: 0.9rem;
    color: $text-color;
    padding: 3px 6px;
    background-color: $position-time-bg;
    border-radius: 4px;
  }
}

.result-stats__time {
  font-size: 0.8rem;
  color: $gray-light;
  margin-left: 10px;
  background-color: $position-time-bg;
  padding: 2px 5px;
  border-radius: 3px;
}
</style> 