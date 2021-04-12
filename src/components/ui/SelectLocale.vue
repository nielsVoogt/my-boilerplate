<template>
  <select v-model="$i18n.locale" @change="setLocale()">
    <option v-for="(locale, i) in locales" :key="`lang-${i}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectLocale",
  data() {
    return { locales: ["en", "nl"] };
  },
  methods: {
    setLocale() {
      localStorage.setItem("locale", `${this.$i18n.locale}`);
    },
  },
};
</script>
