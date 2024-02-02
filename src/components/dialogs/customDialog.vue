<template>
  <div class="fixed left-0 top-0 z-40 h-full w-full">
    <div
      class="absolute z-10 h-full w-full bg-zinc-800 opacity-75"
    ></div>
    <slot name="dialog"></slot>
    <div
      v-on-click-outside="closeByClickOutside"
      class="absolute left-1/2 top-1/2 z-20 h-auto w-4/5 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 opacity-100 shadow sm:w-11/12 md:w-3/4 lg:w-2/5 xl:w-1/3"
    >
      <div
        class="flex justify-between align-middle text-xl font-semibold"
      >
        <slot name="header"></slot>
      </div>
      <div class="relative w-full py-4">
        <slot name="content"></slot>
      </div>
      <div class="flex justify-end gap-x-4 align-middle">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { vOnClickOutside } from '@vueuse/components';

  const props = defineProps({
    ignoreClickOutside: {
      type: Boolean,
      required: false,
      default: false,
    },
  });

  const emit = defineEmits(['close']);

  const closeByClickOutside = () => {
    if (!props.ignoreClickOutside) {
      emit('close');
    }
  };
</script>
