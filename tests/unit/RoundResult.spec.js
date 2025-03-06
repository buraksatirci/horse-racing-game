// eslint-disable-next-line no-undef
/* global describe, test, expect, jest */
import { mount } from '@vue/test-utils'
import RoundResult from '@/components/organisms/RoundResult.vue'
import { useFormatters } from '@/composables/useFormatters'

jest.mock('@/components/molecules/RoundResultItem.vue', () => ({
  name: 'RoundResultItem',
  template: '<div class="position-item" :class="{\'position-item--winner\': isWinner}">{{horseName}} - {{position}}</div>',
  props: ['horseId', 'horseName', 'position', 'finishTime'],
  computed: {
    isWinner() {
      return this.position === 1
    }
  }
}))

describe('RoundResult.vue', () => {
  const resultMock = {
    roundId: 1,
    distance: 1200,
    timestamp: new Date('2025-03-06T14:30:00'),
    results: [
      { horseId: 1, horseName: 'Thunder', position: 1, finishTime: 75.42 },
      { horseId: 2, horseName: 'Storm', position: 2, finishTime: 76.15 },
      { horseId: 3, horseName: 'Lightning', position: 3, finishTime: 77.89 }
    ]
  }

  test('renders round header correctly', () => {
    const wrapper = mount(RoundResult, {
      props: {
        result: resultMock
      }
    })

    const header = wrapper.find('.round-result__title')
    expect(header.exists()).toBe(true)
    expect(header.text()).toContain('Round 1')
    expect(header.text()).toContain('(1200m)')
  })

  test('renders all positions correctly', () => {
    const wrapper = mount(RoundResult, {
      props: {
        result: resultMock
      }
    })

    const positions = wrapper.findAll('.position-item')
    expect(positions.length).toBe(3)
    
    expect(positions[0].classes()).toContain('position-item--winner')
    expect(positions[0].text()).toContain('Thunder')
    expect(positions[0].text()).toContain('1')
    
    expect(positions[1].text()).toContain('Storm')
    expect(positions[1].text()).toContain('2')
    
    expect(positions[2].text()).toContain('Lightning')
    expect(positions[2].text()).toContain('3')
  })
}) 