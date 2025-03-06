/* global describe, test, expect, jest */
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import HorseList from '@/components/organisms/HorseList.vue'

jest.mock('@/components/atoms/BaseCard.vue', () => ({
  name: 'BaseCard',
  template: '<div class="base-card-mock"><slot /></div>'
}))

jest.mock('@/components/molecules/PanelHeader.vue', () => ({
  name: 'PanelHeader',
  template: '<div class="panel-header-mock">{{ title }}</div>',
  props: ['title']
}))

jest.mock('@/components/molecules/EmptyState.vue', () => ({
  name: 'EmptyState',
  template: `
    <div class="empty-state" data-testid="empty-state">
      <div class="empty-state__icon">{{ icon }}</div>
      <p class="empty-state__message">{{ message }}</p>
      <p class="empty-state__hint">{{ hint }}</p>
      <slot name="action"></slot>
    </div>
  `,
  props: ['icon', 'message', 'hint']
}))

jest.mock('@/components/HorseCard.vue', () => ({
  name: 'HorseCard',
  template: '<div class="horse-card-mock" data-testid="horse-card">{{horse.name}}</div>',
  props: ['horse']
}))

const createVuexStore = (allHorses = []) => {
  return createStore({
    state: {
      horses: {
        allHorses
      }
    }
  })
}

describe('HorseList.vue', () => {
  const horsesMock = [
    { id: 1, name: 'Thunder', speed: 35, color: '#ff0000' },
    { id: 2, name: 'Storm', speed: 40, color: '#00ff00' },
    { id: 3, name: 'Lightning', speed: 38, color: '#0000ff' }
  ]

  test('displays empty state when no horses are available', () => {
    const store = createVuexStore([])
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    })

    const emptyState = wrapper.find('[data-testid="empty-state"]')
    expect(emptyState.exists()).toBe(true)
    expect(emptyState.text()).toContain('No horses available yet')
    expect(emptyState.text()).toContain('Click \'New Race\' to generate horses')
    
    expect(wrapper.findAll('[data-testid="horse-card"]').length).toBe(0)
  })

  test('renders a list of horses when horses are available', () => {
    const store = createVuexStore(horsesMock)
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.vm.$store.state.horses.allHorses.length).toBe(3)
    
    const horseCards = wrapper.findAll('[data-testid="horse-card"]')
    expect(horseCards.length).toBe(3)
    expect(horseCards[0].text()).toBe('Thunder')
    expect(horseCards[1].text()).toBe('Storm')
    expect(horseCards[2].text()).toBe('Lightning')
  })

  test('has correct title in panel header', () => {
    const store = createVuexStore([])
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    })

    const header = wrapper.find('.panel-header-mock')
    expect(header.exists()).toBe(true)
    expect(header.text()).toBe('Available Horses')
  })
}) 