<template>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center gap-x-2">
      <button
        class="w-10 rounded-full px-2 py-2 text-black active:bg-gray-50"
        @click="toggleFullLeftNav"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        class="flex h-5 h-fit items-center text-xl font-semibold capitalize"
      >
        {{ currentRoute.name }}
      </div>
    </div>

    <div class="flex items-center gap-x-4">
      <div class="align-center flex flex-col justify-center text-xs">
        <div class="font-bold text-black">User name</div>
        <div class="text-black">Role</div>
      </div>

      <div class="h-8 w-8 rounded-full bg-gray-200"></div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { useGuiStore } from '@/stores/gui.js';

  const currentRoute = useRoute();

  const guiStore = useGuiStore();

  const toggleFullLeftNav = () => {
    guiStore.setShowFUllLeftNavBar(!guiStore.showFullLefNavBar);
  };
</script>

<style scoped></style>
