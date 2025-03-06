const state = {
    rounds: [
      { id: 1, distance: 1200, completed: false, results: [] },
      { id: 2, distance: 1400, completed: false, results: [] },
      { id: 3, distance: 1600, completed: false, results: [] },
      { id: 4, distance: 1800, completed: false, results: [] },
      { id: 5, distance: 2000, completed: false, results: [] },
      { id: 6, distance: 2200, completed: false, results: [] }
    ],
    currentRound: null,
    raceInProgress: false,
    schedule: [],
    allResults: [],
    raceInterval: null
  }
  
  const mutations = {
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
    },
    RESET_RACE_DATA(state) {
      state.rounds.forEach(round => {
        round.completed = false
        round.results = []
      })
      state.currentRound = null
      state.raceInProgress = false
      state.allResults = []
      
      if (state.raceInterval) {
        clearInterval(state.raceInterval)
        state.raceInterval = null
      }
    },
    GENERATE_SCHEDULE(state, schedule) {
      state.schedule = schedule
    }
  }
  
  const actions = {
    generateSchedule({ commit, dispatch, rootState }) {
      commit('RESET_RACE_DATA')
      
      if (!rootState.horses.allHorses.length) {
        dispatch('horses/generateHorses', null, { root: true })
      }
      
      const schedule = state.rounds.map(round => ({
        ...round,
        horses: []
      }))
      
      commit('GENERATE_SCHEDULE', schedule)
      return schedule
    },
    
    startRace({ commit, state, dispatch }) {
      if (state.raceInProgress) return
      
      commit('SET_RACE_PROGRESS', true)
      
      const firstIncompleteRound = state.rounds.find(round => !round.completed)
      if (firstIncompleteRound) {
        commit('SET_CURRENT_ROUND', firstIncompleteRound)
        return dispatch('runRound', firstIncompleteRound.id)
      }
    },
    
    stopRace({ commit, state }) {
      if (state.raceInterval) {
        clearInterval(state.raceInterval)
        commit('SET_RACE_INTERVAL', null)
      }
      
      commit('SET_RACE_PROGRESS', false)
      commit('SET_CURRENT_ROUND', null)
    },
    
    async runRound({ commit, state, dispatch, rootGetters }, roundId) {
      const round = state.rounds.find(r => r.id === roundId)
      if (!round || round.completed) return
      
      await dispatch('horses/selectRandomHorses', null, { root: true })
      
      return new Promise(resolve => {
        const selectedHorses = rootGetters['horses/selectedHorses'] || []
        
        if (!selectedHorses || selectedHorses.length === 0) {
          console.error('No horses selected for the race')
          commit('SET_RACE_PROGRESS', false)
          resolve()
          return
        }
        
        const distance = round.distance
        const results = []
        let finishedCount = 0
        const startTime = Date.now()
        
        if (state.raceInterval) {
          clearInterval(state.raceInterval)
        }
        
        const raceInterval = setInterval(() => {
          selectedHorses.forEach(horse => {
            if (horse.finished) return
            
            const baseSpeed = horse.speed || 50
            const randomBoost = Math.random() * 2
            const moveAmount = (baseSpeed / 50) + randomBoost
            
            horse.position += moveAmount
            
            if (horse.position >= distance) {
              horse.finished = true
              horse.position = distance
              horse.finishTime = (Date.now() - startTime) / 1000
              finishedCount++
              
              results.push({
                horseId: horse.id,
                horseName: horse.name,
                position: finishedCount,
                finishTime: horse.finishTime
              })
            }
          })
          
          if (finishedCount === selectedHorses.length) {
            clearInterval(raceInterval)
            commit('SET_RACE_INTERVAL', null)
            
            results.sort((a, b) => a.position - b.position)
            
            commit('SET_ROUND_RESULTS', { roundId, results })
            commit('SET_ROUND_COMPLETED', roundId)
            
            const nextRound = state.rounds.find(r => r.id > roundId && !r.completed)
            
            if (nextRound) {
              commit('SET_CURRENT_ROUND', nextRound)
              dispatch('runRound', nextRound.id)
            } else {
              commit('SET_CURRENT_ROUND', null)
              commit('SET_RACE_PROGRESS', false)
              dispatch('horses/clearAllHorses', null, { root: true })
            }
            
            resolve()
          }
        }, 100)
        
        commit('SET_RACE_INTERVAL', raceInterval)
      })
    }
  }
  
  const getters = {
    currentRoundDistance: state => state.currentRound ? state.currentRound.distance : null,
    isRaceCompleted: state => state.rounds.every(round => round.completed),
    remainingRounds: state => state.rounds.filter(round => !round.completed)
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }