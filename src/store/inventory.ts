import { defineStore } from "pinia";
import { ref } from "vue";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage";

interface Item {
  id: number;
  name: string;
  count: number;
  src: string;
}

const defaultItems: Item[] = [
  { id: 1, name: "Item 1", count: 4, src: "../assets/images/1.png" },
  { id: 2, name: "Item 2", count: 2, src: "../assets/images/2.png" },
  { id: 3, name: "Item 3", count: 5, src: "../assets/images/3.png" },
  ...Array.from({ length: 22 }, (_, i) => ({
    id: i + 4,
    name: `Item ${i + 4}`,
    count: 0,
    src: "",
  })),
];

export const useInventoryStore = defineStore("inventory", () => {
  const items = ref<Item[]>([]);

  function loadItems() {
    const storedItems = loadFromLocalStorage("inventory", null) || [];
    if (!storedItems || storedItems.length === 0) {
      items.value = defaultItems;
      saveToLocalStorage("inventory", items.value);
    } else {
      items.value = storedItems;
    }
  }

  function removeItem(id: number, count: number) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.count -= count;
    }
    saveToLocalStorage("inventory", items.value);
  }

  function setItems(items: Item[]) {
    saveToLocalStorage("inventory", items);
  }

  loadItems();

  return { items, setItems, removeItem, loadItems };
});
