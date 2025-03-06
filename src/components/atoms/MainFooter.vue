<template>
  <footer class="main-footer">
    <p class="main-footer__text">{{ text }}</p>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.main-footer {
  background-color: $dark-blue;
  color: $white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  font-size: 0.9rem;
  
  &__text {
    margin: 0;
  }
}
</style> 