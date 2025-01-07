<script setup>
  import { ref } from 'vue';
  import { vOnClickOutside } from '@vueuse/components';

  const props = defineProps({
    items: { type: Array, required: true },

    name: { type: String, required: false, default: '' },
    id: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    error: { type: String, required: false, default: '' },

    disabled: { type: Boolean, required: false, default: false },
    hideError: { type: Boolean, required: false, default: false },
    valid: { type: Boolean, required: false, default: false },
  });

  const model = defineModel();
  const selectedItem = ref('');

  if (model.value) {
    selectedItem.value = model.value;
  } else {
    selectedItem.value = props.items[0];
  }

  const select = (item) => {
    toggleList();
    model.value = item;
    selectedItem.value = item;
  };

  const checkSelected = (item) => {
    return item === model.value;
  };

  const showList = ref(false);
  const toggleList = () => (showList.value = !showList.value);
  const closeList = () => (showList.value = false);
</script>

<template>
  <div
    class="relative flex flex-1 flex-col gap-y-1 bg-white"
    v-on-click-outside="closeList"
  >
    <label
      v-if="props.label"
      class="text-sm font-semibold"
      :for="props.id"
      >{{ props.label }}</label
    >
    <div
      :id="props.id"
      class="relative flex h-10 w-full cursor-pointer items-center gap-x-2 rounded border-2 border-gray-200 px-2 focus-within:border-sky-700 focus-within:shadow-sm focus-within:shadow-sky-100 "
      :class="{
        'border-red-500 focus-within:border-red-500 focus-within:shadow-sm focus-within:shadow-red-100':
          props.error,
        'border-green-600 focus-within:border-green-600 focus-within:shadow-sm focus-within:shadow-green-100':
          props.valid,
        'hover:border-sky-600': !props.disabled,
        'pointer-events-none bg-neutral-100': props.disabled,
      }"
    >
      <div
        @click="toggleList"
        class="flex h-full w-full items-center justify-between text-sm"
      >
        {{ selectedItem }}

        <ChevronDownIcon class="h-4 w-4 text-black" />
      </div>
      <div
        v-if="showList"
        class="absolute left-0 top-10 max-h-32 w-full overflow-y-auto rounded bg-white shadow"
      >
        <div
          class="w-full p-2 hover:cursor-pointer hover:bg-gray-50"
          :class="{ 'bg-gray-50': checkSelected(item), 'text-neutral-200': props.disabled }"
          v-for="(item, index) in props.items"
          :key="index"
          @click="select(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div v-if="!hideError" class="h-4 text-xs text-red-500">
      {{ props.error }}
    </div>
  </div>
</template>
