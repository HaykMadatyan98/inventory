<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Item } from "../interfaces";
import { Skeleton } from "primevue";

const emits = defineEmits(["delete", "close"]);

const props = defineProps<{
  item: Item;
}>();

const isDelete = ref(false);
const countForDelete = ref();

const handleDeleteItems = () => {
  if (props.item.count >= countForDelete.value && countForDelete.value > 0) {
    emits("delete", props.item.id, countForDelete.value);
  }
};
const handleCloseDelete = () => {
  countForDelete.value = undefined;
  isDelete.value = false;
};

const getImgUrl = () => {
  return new URL(props.item.src, import.meta.url).href;
};
</script>

<template>
  <div class="inventory-grid-modal container">
    <div>
      <img :src="getImgUrl()" width="130" height="130" />
    </div>
    <div class="modal-skeletons">
      <Skeleton height="30px" width="211px" />
      <div class="modal-skeletons-nested">
        <Skeleton height="10px" width="211px" />
        <Skeleton height="10px" width="211px" />
        <Skeleton height="10px" width="211px" />
        <Skeleton height="10px" width="180px" />
        <Skeleton height="10px" width="80px" />
      </div>
    </div>
    <div>
      <button v-if="!isDelete" @click="isDelete = true" class="delete">
        Удалить предмет
      </button>
      <div v-else class="inventory-grid-modal-count">
        <input
          type="number"
          v-model="countForDelete"
          placeholder="Введите количество"
          :max="item.count"
          min="0"
        />
        <div class="inventory-grid-modal-actions">
          <button @click="handleCloseDelete" class="reset">Отмена</button>
          <button @click="handleDeleteItems" class="confirm">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
    <img
      src="../assets/images/close.svg"
      @click="emits('close')"
      class="close"
    />
  </div>
</template>

<style scoped lang="scss"></style>
