<script setup>
  import CustomDialog from '@/components/dialogs/customDialog.vue';
  import Appointment from '@/models/appointment.js';
  import SelectInput from '@/components/inputs/selectInput.vue';
  import TextareaInput from '@/components/inputs/texareaInput.vue';
  import TextInput from '@/components/inputs/textInput.vue';
  import { reactive, toRaw } from 'vue';

  const emit = defineEmits(['save', 'close']);
  const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false },
  });

  const close = () => emit('close');

  const appointment = reactive(new Appointment());

  const durations = [15, 30, 45, 60, 90, 120];

  const save = () => emit('save', toRaw(appointment));
</script>

<template>
  <custom-dialog width="600px">
    <template #header>Create appointment</template>
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
          label="Description"
          v-model="appointment.description"
          name="description"
        />

        <!--        <div class="flex items-center justify-between gap-x-8">
          <dropdown-component
            value-field="id"
            name-field=""
            key-field=""
            :values="users"
          />
        </div>-->

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
