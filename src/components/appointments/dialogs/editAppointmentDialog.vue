<script setup>
  import CustomDialog from '../../dialogs/customDialog.vue';
  import TextInput from '../../inputs/textInput.vue';
  import { ref, toRaw } from 'vue';
  import TextareaInput from '../../inputs/texareaInput.vue';
  import SelectInput from '@/components/inputs/selectInput.vue';

  const props = defineProps({
    appointment: { type: Object, required: true },
    isLoading: { type: Boolean, required: false, default: false },
  });

  const emit = defineEmits(['close', 'save']);

  const close = () => emit('close');

  const appointment = ref(
    JSON.parse(JSON.stringify(props.appointment)),
  );

  const durations = [15, 30, 45, 60, 90, 120];

  const save = () => emit('save', toRaw(appointment.value));
</script>

<template>
  <custom-dialog @close="close()" width="600px">
    <template #header>Edit appointment</template>
    <template #content>
      <form class="flex flex-col gap-y-2">
        <text-input
          id="title"
          label="Title"
          v-model="appointment.title"
          name="title"
        />
        <textarea-input
          id="description"
          label="Descroption"
          v-model="appointment.description"
          name="description"
        />

        <div class="flex items-center justify-between gap-x-8">
          <datepickerInput
            id="date"
            v-model="appointment.date"
            name="date"
            label="Date"
            mode="dateTime"
          />

          <select-input
            :items="durations"
            v-model="appointment.duration"
            id="duration"
            label="Duration"
          />
        </div>
      </form>
    </template>
    <template #actions>
      <buttonComponent :text="true" type="plain" @click="close()"
        >Cancel</buttonComponent
      >

      <buttonComponent :loading="props.isLoading" @click="save()"
        >Save</buttonComponent
      >
    </template>
  </custom-dialog>
</template>

<style scoped></style>
