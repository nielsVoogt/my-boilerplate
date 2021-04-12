<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    const locale = localStorage.getItem("locale");
    if (locale) this.$i18n.locale = locale;
  },
};
</script>

<style lang="scss">
@import "./style/reset";
@import "./style/base";
</style>
