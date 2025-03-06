<template>
  <BaseCard>
    <PanelHeader title="Race Results" />
    
    <EmptyState 
      v-if="!allResults.length"
      icon="📊"
      message="No races completed yet"
      hint="Results will appear here after races finish"
    />
    
    <div v-else class="results-list">
      <RoundResult 
        v-for="(result, index) in allResults" 
        :key="index" 
        :result="result" 
      />
    </div>
  </BaseCard>
</template>

<script>
import { mapState } from 'vuex'
import BaseCard from '@/components/atoms/BaseCard.vue'
import PanelHeader from '@/components/molecules/PanelHeader.vue'
import EmptyState from '@/components/molecules/EmptyState.vue'
import RoundResult from '@/components/organisms/RoundResult.vue'

export default {
  name: 'RaceResults',
  components: {
    BaseCard,
    PanelHeader,
    EmptyState,
    RoundResult
  },
  computed: {
    ...mapState({
      allResults: state => state.races?.allResults || []
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.results-list {
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  padding: 10px;
}
</style>