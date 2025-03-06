// eslint-disable-next-line no-undef
/* global describe, test, expect */
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceTrack from '@/components/RaceTrack.vue'

const createVuexStore = (selectedHorses = []) => {
  return createStore({
    state: {
      horses: {
        selectedHorses
      }
    }
  })
}

describe('RaceTrack.vue', () => {
  const roundMock = {
    id: 1,
    distance: 1000
  }

  const horsesMock = [
    { id: 1, name: 'Horse 1', position: 0, color: '#ff0000', finished: false },
    { id: 2, name: 'Horse 2', position: 200, color: '#00ff00', finished: false },
    { id: 3, name: 'Horse 3', position: 400, color: '#0000ff', finished: true, finishTime: 120 }
  ]

  test('renders track with correct round information', () => {
    const store = createVuexStore([])
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.text()).toContain('Race: Round 1')
    expect(wrapper.text()).toContain('Distance:1000m')
  })

  test('renders distance markers correctly', () => {
    const store = createVuexStore([])
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })

    const markers = wrapper.findAll('.marker')
    expect(markers.length).toBe(5)

    expect(markers[0].text()).toBe('0m')
    expect(markers[1].text()).toBe('250m')
    expect(markers[2].text()).toBe('500m')
    expect(markers[3].text()).toBe('750m')
    expect(markers[4].text()).toBe('1000m')
  })

  test('renders horses correctly', async () => {
    const store = createVuexStore(horsesMock)
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })

    await wrapper.vm.$nextTick()

    const horses = wrapper.findAll('.horse-runner')
    expect(horses.length).toBe(3)

    expect(horses[0].find('.horse-name').text()).toBe('Horse 1')
    expect(horses[1].find('.horse-name').text()).toBe('Horse 2')
    expect(horses[2].find('.horse-name').text()).toBe('Horse 3')

    expect(horses[2].classes()).toContain('finished')
  })

  test('calculates horse position correctly', () => {
    const store = createVuexStore(horsesMock)
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.vm.calculateHorsePosition(0)).toBe(15)
    expect(wrapper.vm.calculateHorsePosition(1)).toBe(50)
    expect(wrapper.vm.calculateHorsePosition(2)).toBe(85)

    const storeWithOneHorse = createVuexStore([horsesMock[0]])
    const wrapperOneHorse = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [storeWithOneHorse]
      }
    })

    expect(wrapperOneHorse.vm.calculateHorsePosition(0)).toBe(50)
  })

  test('identifies leader correctly', async () => {
    const store = createVuexStore(horsesMock)
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.isLeader(horsesMock[0])).toBe(false)
    expect(wrapper.vm.isLeader(horsesMock[1])).toBe(true)
    expect(wrapper.vm.isLeader(horsesMock[2])).toBe(false)
  })

  test('identifies first place correctly', () => {
    const store = createVuexStore(horsesMock)
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })
    
    expect(wrapper.vm.isFirstPlace(horsesMock[0])).toBe(false)
    expect(wrapper.vm.isFirstPlace(horsesMock[1])).toBe(false)
    expect(wrapper.vm.isFirstPlace(horsesMock[2])).toBe(true)
  })

  test('formats time correctly', () => {
    const store = createVuexStore([])
    const wrapper = mount(RaceTrack, {
      props: {
        round: roundMock
      },
      global: {
        plugins: [store]
      }
    })
    
    expect(wrapper.vm.formatTime(65.42)).toBe('01:05.42')
    expect(wrapper.vm.formatTime(120)).toBe('02:00.00')
    expect(wrapper.vm.formatTime(0.5)).toBe('00:00.50')
  })
}) 