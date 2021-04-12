<template>
  <div>
    <!-- <Notifications /> -->
    <Navigation />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "@/components/ui/Navigation";
// import Notifications from "@/components/ui/Notifications";

export default {
  name: "MainLayout",
  components: {
    Navigation,
    // Notifications,
  },
};
</script>

<style lang="scss">
main {
  max-width: 750px;
  margin: 0 auto;
}
</style>
