<template>
  <GameLayout>
    <template #header>
      <MainHeader title="🏇 Horse Racing Game">
        <template #controls>
          <GameControls 
            :race-in-progress="raceInProgress" 
            :has-horses="hasHorses"
            @start="startRace"
            @stop="stopRace"
            @new-race="generateRace"
          />
        </template>
      </MainHeader>
    </template>
    
    <template #sidebar-left>
      <HorseList />
    </template>
    
    <template #main>
      <WelcomeScreen v-if="!currentRound" />
      <RaceTrack v-else :round="currentRound" />
    </template>
    
    <template #sidebar-right>
      <RaceResults />
    </template>
    
    <template #footer>
      <MainFooter text="Horse Racing Game" />
    </template>
  </GameLayout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import GameLayout from '@/components/templates/GameLayout.vue'
import MainHeader from '@/components/organisms/MainHeader.vue'
import MainFooter from '@/components/atoms/MainFooter.vue'
import GameControls from '@/components/organisms/GameControls.vue'
import HorseList from '@/components/organisms/HorseList.vue'
import RaceTrack from '@/components/RaceTrack.vue'
import RaceResults from '@/components/RaceResults.vue'
import WelcomeScreen from '@/components/organisms/WelcomeScreen.vue'

export default {
  name: 'App',
  components: {
    GameLayout,
    MainHeader,
    MainFooter,
    GameControls,
    HorseList,
    RaceTrack,
    RaceResults,
    WelcomeScreen
  },
  computed: {
    ...mapState({
      raceInProgress: state => state.races?.raceInProgress || false,
      currentRound: state => state.races?.currentRound || null,
    }),
    ...mapGetters({
      isRaceCompleted: 'races/isRaceCompleted'
    }),
    hasHorses() {
      return this.$store.state.horses?.allHorses?.length > 0 || false
    }
  },
  methods: {
    ...mapActions({
      generateHorses: 'horses/generateHorses',
      generateSchedule: 'races/generateSchedule',
      startRace: 'races/startRace',
      stopRaceAction: 'races/stopRace'
    }),
    async generateRace() {
      await this.generateHorses()
      await this.generateSchedule()
    },
    stopRace() {
      this.stopRaceAction();
    }
  }
}
</script>

<style lang="scss">
@import './styles/variables.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: $gray-blue;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}
</style>