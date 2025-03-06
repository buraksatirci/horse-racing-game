<template>
  <div class="game-layout">
    <slot name="header"></slot>
    
    <main class="game-layout__main">
      <div class="game-layout__sidebar-left">
        <slot name="sidebar-left"></slot>
      </div>
      
      <div class="game-layout__center">
        <slot name="main"></slot>
      </div>
      
      <div class="game-layout__sidebar-right">
        <slot name="sidebar-right"></slot>
      </div>
    </main>
    
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'GameLayout'
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.game-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  &__main {
    display: grid;
    grid-template-columns: minmax(250px, 20%) minmax(400px, 60%) minmax(250px, 20%);
    gap: 20px;
    padding: 20px;
    flex: 1;
  }
  
  &__sidebar-left, 
  &__sidebar-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  &__center {
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0 4px 6px $gray-lighter;
    overflow: hidden;
    height: calc(100vh - 160px);
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 1200px) {
  .game-layout {
    &__main {
      grid-template-columns: 1fr 2fr;
    }
    
    &__sidebar-right {
      grid-column: span 2;
      grid-row: 2;
    }
  }
}

@media (max-width: 768px) {
  .game-layout {
    &__main {
      grid-template-columns: 1fr;
    }
    
    &__sidebar-left {
      grid-row: 2;
    }
    
    &__sidebar-right {
      grid-column: 1;
      grid-row: 3;
    }
  }
}
</style> 