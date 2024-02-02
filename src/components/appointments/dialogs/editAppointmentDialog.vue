<script setup>
  import CustomDialog from '../../dialogs/customDialog.vue';
  import TextInput from '../../inputs/textInput.vue';
  import { ref } from 'vue';
  import TextareaInput from '../../inputs/texareaInput.vue';

  const props = defineProps({
    appointment: { type: Object, required: true },
    isLoading: { type: Boolean, required: false, default: true },
  });

  const emit = defineEmits(['close']);

  const close = () => emit('close');

  const appointment = ref(
    JSON.parse(JSON.stringify(props.appointment)),
  );

  const durations = [15, 30, 45, 60, 90, 120];
</script>

<template>
  <custom-dialog @close="close()">
    <template #header>Edit appointment</template>
    <template #content>
      <form class="flex flex-col gap-y-4">
        <text-input
          id="title"
          v-model="appointment.title"
          name="title"
        />
        <textarea-input
          id="description"
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
            :enable-time-picker="false"
          ></datepickerInput>

          <select>
            <option
              v-for="(duration, index) in durations"
              :key="index"
            >
              {{ duration }}
            </option>
          </select>
        </div>
      </form>
    </template>
  </custom-dialog>
</template>

<style scoped></style>
