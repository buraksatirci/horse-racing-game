import { generateRandomColor, horseNames } from '@/utils/helpers'

const state = {
  allHorses: [],
  selectedHorses: []
}

const mutations = {
  SET_ALL_HORSES(state, horses) {
    state.allHorses = horses
  },
  SET_SELECTED_HORSES(state, horses) {
    state.selectedHorses = horses
  }
}

const getConditionText = (value) => {
  if (value >= 80) return 'Excellent';
  if (value >= 60) return 'Good';
  if (value >= 40) return 'Average';
  return 'Poor';
}

const actions = {
  generateHorses({ commit }) {
    const horses = Array.from({ length: 20 }, (_, index) => {
      const speed = Math.floor(Math.random() * 100) + 1;
      
      return {
        id: index + 1,
        name: horseNames[index],
        color: generateRandomColor(),
        speed: speed,
        condition: getConditionText(speed),
        position: 0,
        finished: false,
        finishTime: null
      }
    })
    
    commit('SET_ALL_HORSES', horses)
    return horses
  },
  
  clearAllHorses({ commit }) {
    commit('SET_ALL_HORSES', [])
    commit('SET_SELECTED_HORSES', [])
  },
  
  selectRandomHorses({ commit, state }) {
    const availableHorses = [...state.allHorses]
    const selectedHorses = []
    
    for (let i = 0; i < 10; i++) {
      if (availableHorses.length === 0) break
      
      const randomIndex = Math.floor(Math.random() * availableHorses.length)
      const horse = availableHorses.splice(randomIndex, 1)[0]
      
      horse.position = 0
      horse.finished = false
      horse.finishTime = null
      
      selectedHorses.push(horse)
    }
    
    commit('SET_SELECTED_HORSES', selectedHorses)
    return selectedHorses
  },
  
  toggleSelection({ commit, state, getters }, horseId) {
    const horse = getters.getHorseById(horseId);
    
    if (!horse) return;
    
    let updatedSelection;
    
    if (state.selectedHorses.some(h => h.id === horseId)) {
      updatedSelection = state.selectedHorses.filter(h => h.id !== horseId);
    } 
    else if (state.selectedHorses.length < 10) {
      const horseCopy = {
        ...horse,
        position: 0,
        finished: false,
        finishTime: null
      };
      updatedSelection = [...state.selectedHorses, horseCopy];
    } else {
      return;
    }
    
    commit('SET_SELECTED_HORSES', updatedSelection);
  }
}

const getters = {
  getHorseById: state => id => state.allHorses.find(horse => horse.id === id),
  selectedHorses: state => state.selectedHorses || []
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}