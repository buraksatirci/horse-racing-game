<template>
  <div class="welcome-screen">
    <div class="welcome-screen__content">
      <h2 class="welcome-screen__title">{{ title }}</h2>
      <p class="welcome-screen__message">{{ message }}</p>
      <img 
        src="@/assets/horse-silhouette.png" 
        alt="Horse silhouette" 
        class="welcome-screen__image" 
        onerror="this.style.display='none'"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
  props: {
    title: {
      type: String,
      default: 'Welcome to Horse Racing!'
    },
    message: {
      type: String,
      default: 'Generate a new race or start an existing one to begin.'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.welcome-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  background: $gray-lighter;
  
  &__content {
    max-width: 500px;
  }
  
  &__title {
    color: $text-color;
    margin-bottom: 1rem;
  }
  
  &__message {
    color: $gray-light;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    max-width: 600px;
  }
  
  &__image {
    max-width: 200px;
    margin: 0 auto;
    opacity: 0.7;
  }
}
</style> 