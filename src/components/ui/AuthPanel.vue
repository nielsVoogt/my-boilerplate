<template>
  <div class="auth-panel-container">
    <div class="auth-panel">
      <slot />
    </div>
    <div v-if="!!$slots.link" class="auth-panel-link">
      <slot name="link" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthPanel",
};
</script>

<style lang="scss">
.auth-panel-container {
  margin: 10em auto 2.5em;
  max-width: 30em;
  width: 100%;
}

.auth-panel {
  background: white;
  padding: 3em;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.auth-panel-link {
  padding: 2em;
  text-align: center;
  a {
    text-decoration: none;
  }
}

.auth-panel-logo {
  margin: 0 auto 2.5em;
  max-width: 100%;
  display: block;
}
</style>
