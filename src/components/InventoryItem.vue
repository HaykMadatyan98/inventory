<script setup lang="ts">
import { defineProps } from "vue";
import type { Item } from "../interfaces";

const emits = defineEmits(["openModal"]);

const props = defineProps<{
  item: Item;
}>();

const handleOpenModal = () => {
  emits("openModal", props.item);
};

const getImgUrl = (name: string) => {
  return new URL(name, import.meta.url).href;
};
</script>

<template>
  <div class="inventory-grid-item" @click="handleOpenModal">
    <img v-if="props.item.src" :src="getImgUrl(props.item.src)" />
    <span v-if="props.item.count" class="inventory-grid-item-count">{{
      props.item.count
    }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
