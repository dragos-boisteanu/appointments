<script setup>
  import CustomDialog from '../../dialogs/customDialog.vue';
  import TextInput from '../../inputs/textInput.vue';
  import { reactive, toRaw } from 'vue';
  import TextareaInput from '../../inputs/texareaInput.vue';
  import SelectInput from '@/components/inputs/selectInput.vue';
  import ColorPickerComponent from '@/components/inputs/colorPickerComponent.vue';

  const props = defineProps({
    appointment: { type: Object, required: true },
    isLoading: { type: Boolean, required: false, default: false },
  });

  const emit = defineEmits(['close', 'save']);

  const close = () => emit('close');

  const appointment = reactive(
    JSON.parse(JSON.stringify(props.appointment)),
  );

  const durations = [15, 30, 45, 60, 90, 120];

  const save = () => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setMinutes(
      appointmentDate.getMinutes() + appointment.duration,
    );
    appointment.endDate = appointmentDate;
    appointment.date = new Date(appointment.date);

    if (!appointment.duration) {
      appointment.duration = durations[0];
    }

    emit('save', toRaw(appointment));
  };
</script>

<template>
  <custom-dialog @close="close()" width="600px">
    <template #header>Edit appointment</template>
    <template #content>
      <form class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
          <text-input
            id="title"
            label="Title"
            v-model="appointment.title"
            name="title"
          />

          <color-picker-component
            id="color"
            label="Color"
            name="Color"
            v-model="appointment.color"
          />
        </div>

        <textarea-input
          id="description"
          label="Description"
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
