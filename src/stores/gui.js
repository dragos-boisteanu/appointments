import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGuiStore = defineStore('gui', () => {
  const showFullLefNavBar = ref(true);

  const setShowFUllLeftNavBar = (value) => {
    showFullLefNavBar.value = value;
  };

  return {
    showFullLefNavBar,
    setShowFUllLeftNavBar,
  };
});
