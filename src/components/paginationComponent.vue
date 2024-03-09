<script setup>
  import { computed, ref, watch } from 'vue';

  const props = defineProps({
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
  });

  const emit = defineEmits(['select']);

  const selectPage = (page) => {
    emit('select', page);
  };

  const extraPages = 1;
  const minGroupsSize = 3;
  const firstGroupCount = ref(0);
  const lastGroup = ref([]);

  watch(
    () => props.currentPage,
    (value) => {
      if (value <= minGroupsSize - 1) {
        firstGroupCount.value = 0;
      } else if (value === minGroupsSize) {
        firstGroupCount.value = 1;
      } else if (value === minGroupsSize + 1) {
        firstGroupCount.value = 2;
      } else {
        firstGroupCount.value = minGroupsSize;
      }

      if (value <= props.totalPages - (minGroupsSize + 1)) {
        lastGroup.value = [2, 1, 0];
      } else if (value === props.totalPages - minGroupsSize) {
        lastGroup.value = [1, 0];
      } else if (value === props.totalPages - (minGroupsSize - 1)) {
        lastGroup.value = [0];
      }
    },
    { immediate: true },
  );
  const displayPages = computed(() => {
    const pages = [];

    let startPage = Math.max(1, props.currentPage - extraPages);
    let endPage = Math.min(
      props.totalPages,
      props.currentPage + extraPages,
    );

    if (startPage === 1 && endPage === 2 && props.totalPages > 2) {
      endPage++;
    }

    if (
      endPage === props.totalPages &&
      props.totalPages - extraPages === startPage
    ) {
      startPage--;
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  });
</script>

<template>
  <ul
    class="align-center flex w-full justify-between gap-x-2 pt-4 lg:justify-start"
  >
    <button
      class="min-w-[28px] px-1.5 py-1 disabled:text-gray-400"
      :disabled="currentPage <= minGroupsSize"
      @click="selectPage(1)"
    >
      &#171;
    </button>
    <button
      class="min-w-[28px] px-1.5 py-1 disabled:text-gray-400"
      :disabled="currentPage === 1"
      @click="selectPage(currentPage - 1)"
    >
      &#8249;
    </button>
    <template v-if="currentPage > 2">
      <li
        v-for="page in firstGroupCount"
        :key="page"
        class="align-center hidden min-w-[32px] cursor-pointer justify-center rounded border border-gray-400 px-1.5 py-1 text-gray-500 hover:border-blue-500 hover:text-blue-600 lg:flex"
        :class="{
          '!border-blue-500 bg-blue-500 !text-white shadow':
            currentPage === page,
        }"
        @click="selectPage(page)"
      >
        {{ page }}
      </li>
    </template>
    <div
      v-if="currentPage > 5"
      class="hidden min-w-[28px] self-end px-1.5 py-1 lg:block"
    >
      ....
    </div>
    <li
      v-for="page in displayPages"
      :key="page"
      class="align-center hidden min-w-[32px] cursor-pointer justify-center rounded border border-gray-400 px-1.5 py-1 text-gray-500 hover:border-blue-500 hover:text-blue-600 lg:flex"
      :class="{
        '!border-blue-500 bg-blue-500 !text-white shadow':
          currentPage === page,
      }"
      @click="selectPage(page)"
    >
      {{ page }}
    </li>
    <div
      v-if="currentPage < totalPages - 4"
      class="hidden min-w-[28px] self-end px-1.5 py-1 lg:block"
    >
      ...
    </div>
    <template v-if="currentPage < totalPages - extraPages">
      <li
        v-for="page in lastGroup"
        :key="page"
        class="align-center hidden min-w-[32px] cursor-pointer justify-center rounded border border-gray-400 px-1.5 py-1 text-gray-500 hover:border-blue-500 hover:text-blue-600 lg:flex"
        :class="{
          '!border-blue-500 bg-blue-500 !text-white shadow':
            currentPage === totalPages - page,
        }"
        @click="selectPage(totalPages - page)"
      >
        {{ totalPages - page }}
      </li>
    </template>

    <li
      class="align-center flex min-w-[32px] cursor-pointer justify-center rounded border border-blue-500 bg-blue-500 px-1.5 py-1 text-white shadow hover:border-blue-500 hover:text-blue-600 lg:hidden"
    >
      {{ currentPage }}
    </li>

    <button
      class="min-w-[28px] px-1.5 py-1 disabled:text-gray-400"
      :disabled="currentPage === totalPages"
      @click="selectPage(currentPage + 1)"
    >
      &#8250;
    </button>

    <button
      class="min-w-[28px] px-1.5 py-1 disabled:text-gray-400"
      :disabled="currentPage >= totalPages - minGroupsSize"
      @click="selectPage(totalPages)"
    >
      &#187;
    </button>
  </ul>
</template>

<style scoped></style>
