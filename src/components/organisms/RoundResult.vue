<template>
  <div class="round-result">
    <div class="round-result__header">
      <h3 class="round-result__title">
        Round {{ result.roundId }} 
        <span class="round-result__distance">({{ result.distance }}m)</span>
      </h3>
      <span class="round-result__timestamp">{{ formattedTimestamp }}</span>
    </div>
    
    <div class="round-result__positions">
      <RoundResultItem
        v-for="pos in result.results" 
        :key="pos.horseId"
        :horse-id="pos.horseId"
        :horse-name="pos.horseName"
        :position="pos.position"
        :finish-time="pos.finishTime"
      />
    </div>
  </div>
</template>

<script>
import { useFormatters } from '@/composables/useFormatters'
import RoundResultItem from '@/components/molecules/RoundResultItem.vue'

export default {
  name: 'RoundResult',
  components: {
    RoundResultItem
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedTimestamp() {
      const { formatTimestamp } = useFormatters()
      return formatTimestamp(this.result.timestamp)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.round-result {
  margin-bottom: 15px;
  background-color: $result-bg;
  border-radius: 8px;
  overflow: hidden;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background-color: $result-header-bg;
    border-bottom: 1px solid $result-border;
  }
  
  &__title {
    margin: 0;
    font-size: 1rem;
    color: $text-color;
    display: flex;
    align-items: center;
  }
  
  &__distance {
    color: $gray-light;
    font-size: 0.9rem;
    font-weight: normal;
    margin-left: 5px;
  }
  
  &__timestamp {
    font-size: 0.8rem;
    color: $gray-light;
  }
  
  &__positions {
    padding: 8px;
  }
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $text-color;
}

p {
  margin-bottom: 1rem;
  color: $gray-light;
}

.empty {
  text-align: center;
  padding: 2rem;
  color: $gray-light;
}
</style> 