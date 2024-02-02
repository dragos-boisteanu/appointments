<template>
  <button
    class="flex items-center justify-between rounded-md border-transparent text-white"
    :disabled="props.disabled"
    :class="[classes, classObject]"
  >
    <spinner v-if="props.loading" />
    <slot></slot>
  </button>
</template>

<script setup>
  import { computed, ref } from 'vue';

  import spinner from './/loading/spinner.vue';

  const props = defineProps({
    type: { required: false, type: String },
    size: { required: false, type: String },
    text: { required: false, type: Boolean },
    disabled: { required: false, type: Boolean },
    loading: { required: false, type: Boolean },
  });

  const classObject = computed(() => ({
    'pointer-events-none': props.loading || props.disabled,
    '!bg-none !text-gray-500 font-semibold':
      props.text && props.disabled,
    '!bg-gray-300 !text-gray-500 ': props.disabled && !props.text,
  }));

  const classes = ref('');

  switch (props.type) {
    case 'warning':
      if (props.text) {
        classes.value =
          'bg-none text-yellow-600 active:bg-yellow-100 hover:text-yellow-500 hover:bg-yellow-50 font-semibold';
      } else {
        classes.value =
          'active:shadow-inner active:bg-yellow-500 bg-yellow-700 hover:bg-yellow-600';
      }

      break;
    case 'danger':
      if (props.text) {
        classes.value =
          'bg-none !text-red-600 active:bg-red-100 hover:text-red-500 hover:bg-red-50 font-semibold ';
      } else {
        classes.value =
          'active:shadow-inner active:bg-red-500  bg-red-700 hover:bg-red-600';
      }

      break;
    case 'success':
      if (props.text) {
        classes.value =
          '!text-green-600 active:bg-green-100 hover:text-green-500 hover:bg-green-50 font-semibold ';
      } else {
        classes.value =
          'active:shadow-inner active:bg-green-500 bg-green-700 hover:bg-green-600';
      }

      break;
    case 'plain': {
      if (props.text) {
        classes.value =
          '!text-gray-600 active:bg-gray-100 hover:text-gray-500 hover:bg-gray-50 font-semibold ';
      } else {
        classes.value =
          'active:shadow-inner active:bg-gray-500 bg-gray-700 hover:bg-gray-600';
      }
      break;
    }
    default:
      if (props.text) {
        classes.value =
          'bg-none text-white active:bg-sky-100 hover:text-sky-500 hover:bg-sky-50 font-semibold';
      } else {
        classes.value =
          'active:shadow-inner active:bg-sky-500 bg-sky-700 hover:bg-sky-600';
      }
  }

  switch (props.size) {
    case 'small':
      classes.value += ' text-xs px-2 py-1 ';
      break;
    default:
      classes.value += ' text-sm px-4 py-2 ';
      break;
  }
</script>
