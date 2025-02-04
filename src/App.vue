<script setup lang="ts">
import InventoryGrid from "./components/InventoryGrid.vue";
import LeftBlock from "./components/LeftBlock.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";
const isDark = ref(true);
</script>

<template>
  <div id="app" :class="{ dark: isDark }">
    <button @click="isDark = !isDark" class="theme">
      {{ isDark ? "Dark Mode" : "Light Mode" }}
    </button>
    <div class="main">
      <LeftBlock />
      <InventoryGrid />
    </div>
    <Footer />
  </div>
</template>
