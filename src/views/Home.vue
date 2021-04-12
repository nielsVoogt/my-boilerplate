<template>
  <div class="home">
    <h1>{{ $t("home.header") }}</h1>
    <SelectLocale />
  </div>
</template>

<script>
import SelectLocale from "@/components/ui/SelectLocale.vue";

export default {
  name: "Home",
  components: {
    SelectLocale,
  },
};
</script>
