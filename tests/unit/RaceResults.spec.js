// eslint-disable-next-line no-undef
/* global describe, test, expect, jest */
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceResults from '@/components/RaceResults.vue'
import RoundResult from '@/components/organisms/RoundResult.vue'

jest.mock('@/components/organisms/RoundResult.vue', () => ({
  name: 'RoundResult',
  template: '<div class="mock-round-result" data-testid="round-result"></div>',
  props: ['result']
}))

const createVuexStore = (allResults = []) => {
  return createStore({
    state: {
      races: {
        allResults
      }
    }
  })
}

describe('RaceResults.vue', () => {
  const resultsMock = [
    {
      roundId: 1,
      distance: 1200,
      timestamp: new Date('2025-03-06T14:30:00'),
      results: [
        { horseId: 1, horseName: 'Thunder', position: 1, finishTime: 75.42 },
        { horseId: 2, horseName: 'Storm', position: 2, finishTime: 76.15 }
      ]
    },
    {
      roundId: 2,
      distance: 1400,
      timestamp: new Date('2025-03-06T15:00:00'),
      results: [
        { horseId: 3, horseName: 'Lightning', position: 1, finishTime: 85.21 },
        { horseId: 1, horseName: 'Thunder', position: 2, finishTime: 85.75 }
      ]
    }
  ]

  test('displays empty state when no results available', () => {
    const store = createVuexStore([])
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store]
      }
    })

    const emptyState = wrapper.find('.empty-state')
    expect(emptyState.exists()).toBe(true)
    expect(wrapper.text()).toContain('No races completed yet')
    
    const roundResults = wrapper.findAll('[data-testid="round-result"]')
    expect(roundResults.length).toBe(0)
  })

  test('renders list of results when results are available', () => {
    const store = createVuexStore(resultsMock)
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store]
      }
    })

    const emptyState = wrapper.find('.empty-state')
    expect(emptyState.exists()).toBe(false)
    
    const roundResults = wrapper.findAll('[data-testid="round-result"]')
    expect(roundResults.length).toBe(2)
  })

  test('passes correct data to RoundResult components', () => {
    const store = createVuexStore(resultsMock)
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store]
      }
    })

    const roundResultComponents = wrapper.findAllComponents(RoundResult)
    expect(roundResultComponents.length).toBe(2)
    
    expect(roundResultComponents[0].props('result')).toEqual(resultsMock[0])
    
    expect(roundResultComponents[1].props('result')).toEqual(resultsMock[1])
  })
}) 