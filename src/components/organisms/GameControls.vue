<template>
  <div class="game-controls">
    <div class="game-controls__race">
      <BaseButton 
        variant="start" 
        icon="🏁"
        :disabled="raceInProgress || !hasHorses"
        @click="$emit('start')">
        Start
      </BaseButton>
      
      <BaseButton 
        variant="stop" 
        icon="⏹️"
        :disabled="!raceInProgress"
        @click="$emit('stop')">
        Stop
      </BaseButton>
    </div>
    
    <div class="game-controls__game">
      <BaseButton 
        variant="newRace" 
        icon="🔄"
        :disabled="raceInProgress"
        @click="$emit('new-race')">
        New Race
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/BaseButton.vue'

export default {
  name: 'GameControls',
  components: {
    BaseButton
  },
  props: {
    raceInProgress: {
      type: Boolean,
      default: false
    },
    hasHorses: {
      type: Boolean,
      default: false
    }
  },
  emits: ['start', 'stop', 'new-race']
}
</script>

<style lang="scss" scoped>
.game-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  
  &__race {
    display: flex;
    gap: 10px;
  }
  
  &__game {
    display: flex;
  }
}

@media (max-width: 768px) {
  .game-controls {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    
    &__race, &__game {
      width: 100%;
      justify-content: center;
    }
  }
}
</style> 