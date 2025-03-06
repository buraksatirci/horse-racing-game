<template>
  <BaseCard>
    <PanelHeader title="Available Horses" />
    
    <div class="horse-list">
      <EmptyState
        v-if="allHorses.length === 0"
        icon="🐎"
        message="No horses available yet"
        hint="Click 'New Race' to generate horses"
      >
      </EmptyState>
      
      <HorseCard 
        v-else
        v-for="horse in allHorses" 
        :key="horse.id" 
        :horse="horse" 
      />
    </div>
  </BaseCard>
</template>

<script>
import { mapState } from 'vuex'
import BaseCard from '@/components/atoms/BaseCard.vue'
import PanelHeader from '@/components/molecules/PanelHeader.vue'
import EmptyState from '@/components/molecules/EmptyState.vue'
import HorseCard from '@/components/HorseCard.vue'

export default {
  name: 'HorseList',
  components: {
    BaseCard,
    PanelHeader,
    EmptyState,
    HorseCard
  },
  computed: {
    ...mapState({
      allHorses: state => state.horses?.allHorses || []
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.horse-list {
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  padding: 10px;
  flex: 1;
}

.empty-horse-image {
  max-width: 120px;
  margin: 10px 0;
  opacity: 0.6;
}
</style> 