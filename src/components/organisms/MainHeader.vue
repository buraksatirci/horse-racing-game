<template>
  <header class="main-header">
    <div class="main-header__logo">{{ title }}</div>
    <div class="main-header__controls">
      <slot name="controls"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  props: {
    title: {
      type: String,
      default: 'Application'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.main-header {
  background-color: $dark-blue;
  color: $white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px $gray-lighter;
  
  &__logo {
    font-size: 1.8rem;
    font-weight: bold;
  }
  
  &__controls {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    padding: 1rem;
    
    &__logo {
      margin-bottom: 1rem;
    }
    
    &__controls {
      width: 100%;
    }
  }
}
</style> 