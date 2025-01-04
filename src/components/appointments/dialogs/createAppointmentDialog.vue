<script setup>
  import CustomDialog from '@/components/dialogs/customDialog.vue';
  import Appointment from '@/models/appointment.js';
  import SelectInput from '@/components/inputs/selectInput.vue';
  import TextareaInput from '@/components/inputs/texareaInput.vue';
  import TextInput from '@/components/inputs/textInput.vue';
  import { computed, reactive, ref, toRaw } from 'vue';
  import ColorPickerComponent from '@/components/inputs/colorPickerComponent.vue';
  import generateRandomColor from '@/helpers/generateRandomColor.js';
  import DropdownComponent from '@/components/dropdownComponent.vue';
  import { useUsersStore } from '@/stores/users.js';

  const usersStore = useUsersStore();

  const emit = defineEmits(['save', 'close']);
  const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false },
  });

  const durations = [15, 30, 45, 60, 90, 120];
  const appointment = reactive(new Appointment());
  appointment.color = generateRandomColor();

  const save = () => {
    if (!appointment.allDay) {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setMinutes(
        appointmentDate.getMinutes() + appointment.duration,
      );

      appointment.endDate = appointmentDate;

      if (!appointment.duration) {
        appointment.duration = durations[0];
      }
    }

    appointment.date = new Date(appointment.date);
    appointment.createdBy = '1';

    emit('save', toRaw(appointment));
  };

  const close = () => emit('close');

  const datePickerMode = computed(() => {
    let mode = 'dateTime';

    if (appointment.allDay) {
      mode = 'date';
    }

    return mode;
  });

  const staffList = usersStore.list.filter((user) =>
    ['1', '2'].includes(user.roleId),
  );
  const assignedStaffId = ref('');
  const selectUser = (userId) => {
    console.log('selectUser', userId);
    appointment.assignedTo = userId;
  };

  const assignedClient = ref(null);
  const selectClient = (userId) => {
    console.log('selectClient', userId);
    appointment.clientId = userId;
  };
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
            :mode="datePickerMode"
          />

          <select-input
            :disabled="appointment.allDay"
            :items="durations"
            v-model="appointment.duration"
            id="duration"
            label="Duration"
          />
        </div>

        <div class="flex items-center justify-between gap-x-8">
          <dropdownComponent
            id="assignedTo"
            :value="assignedStaffId"
            :values="staffList"
            name-field="fullName"
            key-field="id"
            value-field="id"
            label="Assigned To"
            name="assignedTo"
            :multi-select="false"
            @select="selectUser"
          />
          <dropdownComponent
            id="clientId"
            v-model="assignedClient"
            :values="usersStore.list"
            name-field="fullName"
            key-field="id"
            value-field="id"
            label="Client"
            name="clientId"
            :multi-select="false"
            @select="selectClient"
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
        >Cancel
      </buttonComponent>

      <buttonComponent :loading="props.isLoading" @click="save()"
        >Save
      </buttonComponent>
    </template>
  </custom-dialog>
</template>

<style scoped></style>
