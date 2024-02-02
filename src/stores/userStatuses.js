import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStatusesStore = defineStore(
  'userStatuses',
  () => {
    const list = ref([]);

    const set = (userStatuses) => {
      list.value = userStatuses;
    };

    return {
      list,
      set,
    };
  },
);
