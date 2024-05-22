<script setup>
  import {
    computed,
    inject,
    onUnmounted,
    ref,
    toRaw,
    watch,
  } from 'vue';
  import { createPopper } from '@popperjs/core';
  import { vOnClickOutside } from '@vueuse/components';

  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';

  const props = defineProps({
    appointment: { type: Object, required: true },
  });

  const emit = defineEmits(['edit', 'delete']);

  const dayjs = inject('dayJS');

  const toast = useToast();
  const usersService = inject('usersService');
  const router = useRouter();

  const popperInstance = ref(null);
  const showPopover = ref(false);

  watch(showPopover, (value) => {
    if (value) {
      const popcorn = document.getElementById(
        `appointment${props.appointment.id}`,
      );
      const tooltip = document.getElementById(
        `tooltip${props.appointment.id}`,
      );

      console.log('popperInstance', popperInstance.value);
      popperInstance.value = createPopper(popcorn, tooltip, {
        placement: 'right-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
    } else {
      popperInstance.value.destroy();
    }
  });

  onUnmounted(() => {
    if (popperInstance.value) popperInstance.value.destroy();
  });

  const startTime = computed(() => {
    return dayjs(props.appointment.date).format('HH:mm');
  });
  const endTime = computed(() => {
    return dayjs(props.appointment.endDate).format('HH:mm');
  });

  const createdBy = computed(() => {
    let user;

    try {
      user = usersService.getById(props.appointment.createdBy);
    } catch (error) {
      user = null;
    }

    return user;
  });
  const createdByName = computed(() => {
    let name = 'User not found';
    if (createdBy.value) {
      name = `${createdBy.value.firstName} ${createdBy.value.lastName}`;
    }

    return name;
  });

  const assignedTo = computed(() => {
    let user;

    try {
      user = usersService.getById(props.appointment.assignedTo);
    } catch (error) {
      user = null;
    }

    return user;
  });
  const assignedToName = computed(() => {
    let name = 'User not found';
    if (assignedTo.value) {
      name = `${assignedTo.value.firstName} ${assignedTo.value.lastName}`;
    }

    return name;
  });

  const client = computed(() => {
    let user;

    try {
      user = usersService.getById(props.appointment.clientId);
    } catch (error) {
      user = null;
    }

    return user;
  });
  const clientName = computed(() => {
    let name = 'User not found';
    if (client.value) {
      name = `${client.value.firstName} ${client.value.lastName}`;
    }

    return name;
  });
  const handleUserClick = (id) => {
    if (!id) {
      toast.error('User not found');
      return;
    }
    router.push({ name: 'user', params: { id } });
  };
  const togglePopover = () => {
    //  TODO: find why showPopover doesn't add the class for newly created appointments

    showPopover.value = !showPopover.value;
  };

  const appointmentDetails = ref(null);

  const closePopover = [
    () => {
      showPopover.value = false;
    },
    { ignore: [appointmentDetails] },
  ];

  const editAppointment = () =>
    emit('edit', toRaw(props.appointment));

  const deleteAppointment = () =>
    emit('delete', toRaw(props.appointment));

  const style = ref({ backgroundColor: props.appointment.bgColor });
</script>

<template>
  <p
    :id="`appointment${props.appointment.id}`"
    v-on-click-outside="closePopover"
    class="mb-1 mt-0 cursor-pointer rounded-sm p-1 text-xs leading-tight text-white hover:shadow hover:brightness-110"
    :style="style"
    @click="togglePopover"
  >
    <span class="italic">{{ startTime }}</span>
    {{ props.appointment.title }}
  </p>
  <Teleport to="body">
    <div
      :id="`tooltip${props.appointment.id}`"
      ref="appointmentDetails"
      class="hidden w-fit min-w-80 max-w-[500px] overflow-hidden rounded border bg-white p-4 shadow"
      :class="{ '!block': showPopover }"
    >
      <div
        class="flex items-center justify-between text-lg font-medium"
      >
        <div>{{ props.appointment.title }}</div>

        <div class="flex items-center gap-x-2">
          <button
            class="cursor-pointer rounded-full p-2 hover:bg-gray-100"
            @click="editAppointment"
          >
            <PencilIcon class="h-4 w-4 text-gray-500" />
          </button>

          <button
            class="cursor-pointer rounded-full p-2 hover:bg-gray-100"
            @click="deleteAppointment"
          >
            <TrashIcon class="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
      <div class="my-2 text-xs italic">
        <span>Scheduled at</span> {{ startTime }}
        <span>Ends At</span>
        {{ endTime }}
      </div>
      <div class="flex items-center gap-x-4">
        <div>
          <div class="text-xs font-bold">Assigned to</div>
          <div
            class="mt-0.5 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap rounded-3xl border border-gray-200 bg-gray-100 p-1 text-center text-xs hover:cursor-pointer hover:brightness-105"
            @click="handleUserClick(assignedTo?.id)"
          >
            {{ assignedToName }}
          </div>
        </div>
        <div v-if="client">
          <div class="text-xs font-bold">Client</div>
          <div
            class="mt-0.5 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap rounded-3xl border border-gray-200 bg-gray-100 p-1 text-center text-xs hover:cursor-pointer hover:brightness-105"
            @click="handleUserClick(client?.id)"
          >
            {{ clientName }}
          </div>
        </div>

        <div>
          <div class="text-xs font-bold">Created by</div>
          <div
            class="mt-0.5 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap rounded-3xl border border-gray-200 bg-gray-100 p-1 text-center text-xs hover:cursor-pointer hover:brightness-105"
            @click="handleUserClick(createdBy?.id)"
          >
            {{ createdByName }}
          </div>
        </div>
      </div>
      <div
        class="mt-3 max-h-[150px] overflow-y-auto text-xs text-gray-400"
      >
        {{ props.appointment.description }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
