<template>
  <div class="flex w-full flex-1 flex-col gap-y-1">
    <label
      v-if="label"
      class="text-sm font-semibold"
      :for="props.id"
      >{{ props.label }}</label
    >
    <VDatepicker
      v-model="date"
      :popover="{ visibility: 'click' }"
      :masks="{ input: 'DD/MM/YYYY' }"
      :update-on-input="false"
      :model-config="modelConfig"
      :input-debounce="500"
      :mode="mode"
      color="blue"
      title-position="left"
    >
      <template #default="{ inputValue, togglePopover, inputEvents }">
        <div
          class="relative flex w-full justify-between align-middle"
        >
          <input
            :id="props.id"
            :placeholder="placeholder"
            class="w-full rounded border-2 border-gray-200 p-2 pr-7 text-sm outline-none focus:border-sky-700 focus:shadow-sm focus:shadow-sky-100"
            :class="{
              'border-red-500 focus:border-red-500 focus:shadow-sm focus:shadow-red-100':
                props.errorMessage,
              'border-green-600 focus:border-green-600 focus:shadow-sm focus:shadow-green-100':
                props.valid,
              'hover:border-sky-600': !props.disabled,
            }"
            type="text"
            :name="props.name"
            :disabled="disabled"
            :value="inputValue"
            @click="togglePopover"
            v-on="inputEvents"
          />
          <button
            v-show="canClear"
            class="absolute right-2 top-2 flex justify-center rounded-full p-1 align-middle hover:bg-gray-100"
            @click.prevent="clearInput"
          >
            <!-- <icon name="close" class="text-gray-500"/> -->
            <XMarkIcon class="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </template>
    </VDatepicker>

    <div class="h-4 text-xs text-red-500">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';

  const props = defineProps({
    id: { type: String, required: false, default: '' },
    name: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    errorMessage: { type: String, required: false, default: '' },

    mode: {
      type: String,
      required: true,
      validator(value) {
        return ['date', 'dateTime'].includes(value);
      },
    },

    disabled: { type: Boolean, required: false, default: false },
    valid: { type: Boolean, required: false, default: false },
    timePicker: { type: Boolean, required: false, default: false },
  });

  const model = defineModel();
  const modelConfig = ref({
    type: 'string',
    mask: 'iso',
  });

  const clearInput = () => {
    date.value = '';
  };
  const canClear = computed(() => model.value !== '');

  const date = computed({
    get() {
      return model.value;
    },
    set(value) {
      model.value = value.toString();
    },
  });
</script>

<style scoped>
  :deep(.dp__input) {
    @apply max-h-48 rounded border p-2 pl-9 text-sm outline-none outline-offset-[-1px] hover:border-slate-500 focus:border-slate-600 focus:outline-slate-600;
  }
  :deep(.error .dp__input) {
    @apply border-red-500 focus:border-red-500;
  }
  :deep(.valid .dp__input) {
    @apply border-green-600 focus:border-green-600;
  }
</style>
