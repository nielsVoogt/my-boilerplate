<template>
  <div class="auth-view">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style lang="scss">
.auth-view {
  height: 100%;
  background: #ededed;
  overflow: auto;
}
</style>
