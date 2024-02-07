<template>
  <div class="flex flex-1 flex-col gap-y-1">
    <label
      v-if="props.label"
      class="text-sm font-semibold"
      :for="props.id"
      >{{ props.label }}</label
    >
    <div
      class="group flex w-full items-center justify-between rounded border-2 border-gray-200 px-2 focus-within:border-sky-700 focus-within:shadow-sm focus-within:shadow-sky-100"
      :class="{
        'border-red-500 focus-within:border-red-500 focus-within:shadow-sm focus-within:shadow-red-100':
          props.errorMessage,
        'border-green-600 focus-within:border-green-600 focus-within:shadow-sm focus-within:shadow-green-100':
          props.valid,
        'hover:border-sky-600': !props.disabled,
      }"
    >
      <input
        ref="textInputRef"
        class="w-full p-2 pl-0 text-sm outline-none"
        type="text"
        :id="props.id"
        :name="props.name"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :value="model"
        @input="emitUpdate($event)"
      />
      <button
        v-show="canClear"
        class="invisible flex justify-center rounded-full p-1 align-middle hover:bg-gray-100 group-hover:visible"
        @click.prevent="clearInput"
      >
        <!-- <icon name="close" class="text-gray-500"/> -->
        <XMarkIcon class="h-4 w-4 text-gray-500" />
      </button>
    </div>

    <div v-if="!hideError" class="h-4 text-xs text-red-500">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';

  const props = defineProps({
    id: { type: String, required: false, default: '' },
    name: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    errorMessage: { type: String, required: false, default: '' },

    disabled: { type: Boolean, required: false, default: false },
    valid: { type: Boolean, required: false, default: false },
    autofocus: { type: Boolean, required: false, default: false },
    hideError: { type: Boolean, required: false, default: false },
  });

  const model = defineModel();
  const emitUpdate = (event) => {
    model.value = event.target.value;
  };

  const textInputRef = ref(null);
  const canClear = computed(() => model.value.length > 0);
  const clearInput = () => {
    textInputRef.value.focus();
    model.value = '';
  };
  onMounted(() => {
    if (props.autofocus && textInputRef.value) {
      textInputRef.value.focus();
    }
  });
</script>
