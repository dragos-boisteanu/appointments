<script setup>
  import CustomDialog from './customDialog.vue';
  import ButtonComponent from '../buttonComponent.vue';

  const emit = defineEmits(['close', 'confirm']);

  const props = defineProps({
    title: { type: String, required: true },
    text: { type: String, required: true },
  });

  const close = () => emit('close');

  const confirm = () => emit('confirm');
</script>

<template>
  <custom-dialog @close="close()" width="500px">
    <template #header>{{ props.title }}</template>
    <template #content> <span v-html="props.text" /></template>
    <template #actions>
      <button-component :text="true" type="plain" @click="close()"
        >Cancel</button-component
      >
      <button-component @click="confirm()">Ok</button-component>
    </template>
  </custom-dialog>
</template>

<style scoped></style>
