<script setup>
  import CustomDialog from '@/components/dialogs/customDialog.vue';
  import Appointment from '@/models/appointment.js';
  import SelectInput from '@/components/inputs/selectInput.vue';
  import TextareaInput from '@/components/inputs/texareaInput.vue';
  import TextInput from '@/components/inputs/textInput.vue';
  import { reactive, toRaw } from 'vue';
  import ColorPickerComponent from '@/components/inputs/colorPickerComponent.vue';

  const emit = defineEmits(['save', 'close']);
  const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false },
  });
  const generateRandomColor = () => {
    let color =
      '#' +
      ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

    if (color === '#ffffff' || color === '#fff') {
      color = generateRandomColor();
    }

    return color;
  };
  const durations = [15, 30, 45, 60, 90, 120];

  const appointment = reactive(new Appointment());
  appointment.color = generateRandomColor();

  const save = () => emit('save', toRaw(appointment));
  const close = () => emit('close');
</script>

<template>
  <custom-dialog width="600px">
    <template #header>Create appointment</template>
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

        <div class="flex items-center gap-x-2">
          <input
            id="allDay"
            type="checkbox"
            v-model="appointment.allDay"
          />
          <label for="allDay" class="text-sm">All day event</label>
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
