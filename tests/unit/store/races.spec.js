// eslint-disable-next-line no-undef
/* global describe, test, expect, jest, beforeEach */
import { createStore } from 'vuex'

const getRacesModule = () => {
  const racesModule = {
    state: {
      rounds: [
        { id: 1, distance: 1200, completed: false, results: [] },
        { id: 2, distance: 1400, completed: false, results: [] },
        { id: 3, distance: 1600, completed: false, results: [] }
      ],
      currentRound: null,
      raceInProgress: false,
      schedule: [],
      allResults: [],
      raceInterval: null
    },
    mutations: {
      SET_CURRENT_ROUND(state, round) {
        state.currentRound = round
      },
      SET_RACE_PROGRESS(state, inProgress) {
        state.raceInProgress = inProgress
      },
      SET_RACE_INTERVAL(state, interval) {
        state.raceInterval = interval
      },
      SET_ROUND_COMPLETED(state, roundId) {
        const round = state.rounds.find(r => r.id === roundId)
        if (round) round.completed = true
      },
      SET_ROUND_RESULTS(state, { roundId, results }) {
        const round = state.rounds.find(r => r.id === roundId)
        if (round) round.results = results
        
        state.allResults.push({
          roundId,
          distance: round.distance,
          timestamp: new Date(),
          results
        })
      }
    },
    actions: {
      selectRound({ commit }, round) {
        commit('SET_CURRENT_ROUND', round)
      },
      startRace({ commit }) {
        commit('SET_RACE_PROGRESS', true)
      },
      stopRace({ commit, state }) {
        commit('SET_RACE_PROGRESS', false)
        
        if (state.raceInterval) {
          clearInterval(state.raceInterval)
          commit('SET_RACE_INTERVAL', null)
        }
      },
      completeRound({ commit }, { roundId, results }) {
        commit('SET_ROUND_COMPLETED', roundId)
        commit('SET_ROUND_RESULTS', { roundId, results })
      }
    },
    getters: {
      getCurrentRound: state => state.currentRound,
      isRaceInProgress: state => state.raceInProgress,
      getRounds: state => state.rounds,
      getCompletedRounds: state => state.rounds.filter(round => round.completed),
      getAllResults: state => state.allResults
    }
  }
  
  return racesModule
}

describe('Races Module', () => {
  let store
  let racesModule
  
  beforeEach(() => {
    racesModule = getRacesModule()
    store = createStore({
      modules: {
        races: racesModule
      }
    })
  })
  
  test('initial state is set correctly', () => {
    expect(store.state.races.rounds.length).toBe(3)
    expect(store.state.races.currentRound).toBeNull()
    expect(store.state.races.raceInProgress).toBe(false)
    expect(store.state.races.allResults).toEqual([])
  })
  
  test('selectRound action sets the current round', () => {
    const round = { id: 2, distance: 1400, completed: false, results: [] }
    store.dispatch('selectRound', round)
    expect(store.state.races.currentRound).toEqual(round)
  })
  
  test('startRace action sets the race in progress', () => {
    store.dispatch('startRace')
    expect(store.state.races.raceInProgress).toBe(true)
  })
  
  test('stopRace action stops the race', () => {
    store.state.races.raceInProgress = true
    
    const mockClearInterval = jest.fn()
    global.clearInterval = mockClearInterval
    
    const mockInterval = 123
    store.commit('SET_RACE_INTERVAL', mockInterval)
    
    store.dispatch('stopRace')
    
    expect(store.state.races.raceInProgress).toBe(false)
    expect(mockClearInterval).toHaveBeenCalledWith(mockInterval)
    expect(store.state.races.raceInterval).toBeNull()
  })
  
  test('completeRound action updates the round status and results', () => {
    const roundId = 1
    const results = [
      { horseId: 1, position: 1, time: 74.3 },
      { horseId: 2, position: 2, time: 75.1 }
    ]
    
    store.dispatch('completeRound', { roundId, results })
    
    const completedRound = store.state.races.rounds.find(r => r.id === roundId)
    expect(completedRound.completed).toBe(true)
    expect(completedRound.results).toEqual(results)
    
    expect(store.state.races.allResults.length).toBe(1)
    expect(store.state.races.allResults[0].roundId).toBe(roundId)
    expect(store.state.races.allResults[0].results).toEqual(results)
    expect(store.state.races.allResults[0].distance).toBe(1200)
  })
  
  test('getters return the correct values', () => {
    const round = { id: 3, distance: 1600, completed: false, results: [] }
    store.dispatch('selectRound', round)
    store.dispatch('startRace')
    
    store.dispatch('completeRound', { 
      roundId: 1, 
      results: [{ horseId: 1, position: 1, time: 74.3 }] 
    })
    
    expect(store.getters.getCurrentRound).toEqual(round)
    expect(store.getters.isRaceInProgress).toBe(true)
    expect(store.getters.getRounds.length).toBe(3)
    expect(store.getters.getCompletedRounds.length).toBe(1)
    expect(store.getters.getCompletedRounds[0].id).toBe(1)
    expect(store.getters.getAllResults.length).toBe(1)
  })
}) 