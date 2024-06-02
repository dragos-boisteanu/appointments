<script setup>
  const props = defineProps({
    label: { type: String, required: false, default: '' },
    id: { type: String, required: false, default: '' },
    name: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    errorMessage: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    valid: { type: Boolean, required: false, default: false },
    hideError: { type: Boolean, required: false, default: false },
  });

  const model = defineModel();
  const emitUpdate = (event) => {
    model.value = event.target.value;
  };
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label class="text-sm font-semibold" :for="props.id">{{
      props.label
    }}</label>
    <input
      class="h-10 rounded border-2 border-gray-200 bg-transparent p-1"
      :id="props.id"
      type="color"
      :value="model"
      @change="emitUpdate($event)"
    />
    <div v-if="!hideError" class="h-4 text-xs text-red-500">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<style scoped></style>
