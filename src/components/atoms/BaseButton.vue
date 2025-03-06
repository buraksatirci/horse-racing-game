<template>
  <button 
    :class="['base-button', `base-button--${variant}`, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
    @click="onClick">
    <span v-if="icon" class="base-button__icon">{{ icon }}</span>
    <span class="base-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['newRace', 'start', 'stop'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.base-button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &__icon {
    margin-right: 8px;
  }
  
  &--newRace {
    background-color: $button-newRace;
    color: $white;
    
    &:hover:not(:disabled) {
      background-color: darken($button-newRace, 10%);
    }
  }
  
  &--start {
    background-color: $primary-color;
    color: $white;
    
    &:hover:not(:disabled) {
      background-color: darken($primary-color, 10%);
    }
  }
  
  &--stop {
    background-color: $button-stop;
    color: $white;
    
    &:hover:not(:disabled) {
      background-color: darken($button-stop, 10%);
    }
  }
}
</style> 