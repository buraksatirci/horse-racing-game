<template>
  <div class="empty-state">
    <div class="empty-state__icon">{{ icon }}</div>
    <p class="empty-state__message">{{ message }}</p>
    <p v-if="hint" class="empty-state__hint">{{ hint }}</p>
    <div v-if="$slots.action" class="empty-state__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    icon: {
      type: String,
      default: '📋'
    },
    message: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  
  &__icon {
    font-size: 3rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }
  
  &__message {
    margin-top: 1rem;
    font-size: 1rem;
    color: $gray-light;
  }
  
  &__hint {
    font-size: 0.9rem;
    color: $gray-light;
    margin: 5px 0 15px;
  }
  
  &__action {
    margin-top: 15px;
  }
}
</style> 