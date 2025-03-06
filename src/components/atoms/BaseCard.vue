<template>
  <div class="base-card" :class="{ 'base-card--shadow': shadow }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    shadow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.base-card {
  background-color: $white;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &--shadow {
    box-shadow: 0 4px 6px $gray-lighter;
  }
}
</style> 