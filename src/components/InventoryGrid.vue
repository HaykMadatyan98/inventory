<script setup lang="ts">
import InventoryItem from "./InventoryItem.vue";
import { nextTick, onMounted, ref } from "vue";
import { useInventoryStore } from "../store/inventory";
import type { Item } from "../interfaces";
import ItemDetails from "./ItemDetails.vue";
import Draggable from "vuedraggable";

const inventory = useInventoryStore();
const selectedItem = ref({} as Item);
const isOpen = ref(false);
const futureItem = ref();
const movingItem = ref();
const futureIndex = ref();
const movingIndex = ref();

const handleOpenModal = (item: Item) => {
  if (item.count) {
    selectedItem.value = item;
    isOpen.value = true;
  }
};

const handleDeleteItems = (item: number, count: number) => {
  inventory.removeItem(item, count);
  isOpen.value = false;
};

const handleDragEnd = () => {
  futureItem.value = inventory.items[futureIndex.value];
  movingItem.value = inventory.items[movingIndex.value];
  const _items: any = Object.assign([], inventory.items);
  _items[futureIndex.value] = movingItem.value;
  _items[movingIndex.value] = futureItem.value;
  inventory.items = _items;
  nextTick(() => {
    inventory.setItems(_items);
  });
};

const handleMove = (e: any) => {
  const { index, futureIndex: fIndex } = e.draggedContext;
  movingIndex.value = index;
  futureIndex.value = fIndex;
  return false;
};

onMounted(() => {
  inventory.loadItems();
});
</script>

<template>
  <div class="inventory-grid container">
    <Draggable
      v-model="inventory.items"
      item-key="id"
      class="inventory-grid container"
      :group="'inventory'"
      :animation="200"
      :move="handleMove"
      @end="handleDragEnd"
    >
      <template #item="{ element }">
        <InventoryItem
          :key="element.id"
          :item="element"
          @open-modal="handleOpenModal"
        />
      </template>
    </Draggable>
    <ItemDetails
      v-show="isOpen"
      :item="selectedItem"
      @close="isOpen = false"
      @delete="handleDeleteItems"
    />
  </div>
</template>

<style scoped lang="scss"></style>
