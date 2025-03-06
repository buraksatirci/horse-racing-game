<template>
  <div class="panel-header">
    <h2 class="panel-header__title">{{ title }}</h2>
    <div class="panel-header__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.panel-header {
  background-color: $dark-blue;
  color: $white;
  padding: 15px;
  border-bottom: 1px solid $gray-lighter;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &__title {
    margin: 0;
    font-size: 1.2rem;
  }
  
  &__actions {
    display: flex;
    gap: 8px;
  }
}
</style> 