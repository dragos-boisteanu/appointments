<template>
  <div class="w-100 flex flex-1 flex-col gap-y-1 bg-white bg-white">
    <label
      v-if="label"
      class="text-sm font-semibold"
      :for="props.id"
      >{{ props.label }}</label
    >
    <textarea
      class="max-h-40 min-h-20 w-full overflow-y-auto rounded border-2 border-gray-200 p-2 pr-7 text-sm outline-none focus:border-sky-700 focus:shadow-sm focus:shadow-sky-100"
      :class="{
        'border-red-500 focus:border-red-500 focus:shadow-sm focus:shadow-red-100':
          props.errorMessage,
        'border-green-600 focus:border-green-600 focus:shadow-sm focus:shadow-green-100':
          props.valid,
        'hover:border-sky-600': !props.disabled,
      }"
      type="text"
      ref="textareaRef"
      :id="props.id"
      :name="props.name"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="model"
      @input="emitUpdate($event)"
    />
    <div v-if="!hideError" class="h-4 text-xs text-red-500">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

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

  const textareaRef = ref(null);
  onMounted(() => {
    if (props.autofocus && textareaRef.value) {
      textareaRef.value.focus();
    }
  });
</script>
