<template>
  <div class="fixed left-0 top-0 z-40 h-full w-full">
    <div
      class="absolute z-10 h-full w-full bg-zinc-800 opacity-75"
    ></div>
    <!--    xl:w-1/2 2xl:w-2/5 3xl:w-1/3 4xl:w-1/4 5xl:w-2/12-->
    <div
      v-on-click-outside="closeByClickOutside"
      class="absolute left-1/2 top-1/2 z-20 h-auto w-auto max-w-[85%] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 opacity-100 shadow"
      :style="{ width: `${width} !important` }"
    >
      <slot name="dialog"></slot>

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
    width: { type: String, required: false, default: '' },
  });

  const emit = defineEmits(['close']);

  const closeByClickOutside = () => {
    if (!props.ignoreClickOutside) {
      emit('close');
    }
  };
</script>
