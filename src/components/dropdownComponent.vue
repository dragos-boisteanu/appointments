<script setup>
  import { computed, ref, watch } from 'vue';
  import { vOnClickOutside } from '@vueuse/components';

  const props = defineProps({
    values: { type: Array, required: true },

    keyField: { type: String, required: true },
    nameField: { type: String, required: true },
    valueField: { type: String, required: true },

    name: { type: String, required: false, default: '' },
    id: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    error: { type: String, required: false, default: '' },

    disabled: { type: Boolean, required: false, default: false },
    hideError: { type: Boolean, required: false, default: false },
  });
  const emit = defineEmits(['select']);

  const model = defineModel();
  const input = ref(null);
  const inputTextValue = ref('');

  const foundValues = ref(props.values);
  const selectedItems = ref([]);
  const showDropdown = ref(false);

  watch(
    () => model,
    (model) => {
      const value = model.value;
      if (value) {
        if (typeof value === 'string') {
          const foundItem = props.values.find(
            (v) => v[props.keyField] === value,
          );

          if (foundItem) {
            inputTextValue.value = foundItem[props.nameField];
          }
        } else if (Array.isArray(value)) {
          value.forEach((id) => {
            const foundItem = props.values.find(
              (value) => value[props.keyField] === id,
            );

            if (foundItem) {
              selectedItems.value.push(foundItem);
            }
          });
        }
      }
    },
    { immediate: true },
  );

  const canClear = computed(() => inputTextValue.value.length > 0);

  const select = (event, value) => {
    emit('select', value[props.valueField]);
    inputTextValue.value = value[props.nameField];
    showDropdown.value = false;
  };
  const showDropdownFun = () => {
    if (!props.disabled) {
      showDropdown.value = true;
      foundValues.value = props.values;
    }
  };
  const closeDropDown = () => {
    showDropdown.value = false;
    foundValues.value = [];
  };

  const clearInput = () => {
    console.log('clearInput');
    inputTextValue.value = '';
    emit('select', '');
  };
  const searchValue = (event) => {
    const inputElement = event.target;
    if (inputElement.value.trim() === '') {
      foundValues.value = props.values;
    } else {
      foundValues.value = props.values.filter((value) =>
        value[props.nameField].includes(inputElement.value),
      );
    }
  };
  const checkSelected = (keyFieldValue) =>
    selectedItems.value.findIndex(
      (item) => item[props.keyField] === keyFieldValue,
    ) > -1;
  const removeSelected = (keyFieldValue) => {
    const selectedItemIndex = selectedItems.value.findIndex(
      (item) => item[props.keyField] === keyFieldValue,
    );

    if (selectedItemIndex > -1) {
      selectedItems.value.splice(selectedItemIndex);
    }
  };
</script>

<template>
  <div class="relative flex flex-1 flex-col gap-y-1">
    <label
      v-if="props.label"
      class="text-sm font-semibold"
      :for="props.id"
      >{{ props.label }}</label
    >
    <div
      class="group flex w-full items-center gap-x-2 rounded border-2 border-gray-200 px-2 focus-within:border-sky-700 focus-within:shadow-sm focus-within:shadow-sky-100"
    >
      <div
        v-if="props.multiSelect"
        class="flex-0 flex flex-wrap items-center gap-1 py-1"
      >
        <div
          v-for="item in selectedItems"
          :key="item"
          class="flex items-center gap-x-1 rounded border px-1 py-1 text-xs hover:bg-gray-50"
        >
          <div>
            {{ item[props.nameField] }}
          </div>

          <button
            class="flex items-center rounded-full"
            @click="removeSelected(item[props.keyField])"
          >
            <XCircleIcon class="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      <input
        :id="props.id"
        ref="input"
        v-model="inputTextValue"
        v-on-click-outside="closeDropDown"
        class="w-full p-2 pl-0 text-sm outline-none"
        type="text"
        :name="props.name"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        @input="searchValue"
        @click="showDropdownFun"
      />
      <button
        v-show="canClear"
        class="invisible flex justify-center rounded-full p-1 align-middle hover:bg-gray-100 group-hover:visible"
        @click.prevent="clearInput"
      >
        <!-- <icon name="close" class="text-gray-500"/> -->
        <XMarkIcon class="h-4 w-4 text-gray-500" />
      </button>

      <ul
        v-if="showDropdown"
        class="absolute left-0 top-16 max-h-32 w-full overflow-y-auto rounded bg-white shadow"
      >
        <li
          v-for="v in foundValues"
          :key="v[props.keyField]"
          class="w-full p-2 hover:cursor-pointer hover:bg-gray-50"
          :class="{ 'bg-gray-50': checkSelected(v[props.keyField]) }"
          @click.self="select($event, v)"
        >
          {{ v[props.nameField] }}
        </li>
      </ul>
    </div>

    <div v-if="!hideError" class="h-4 text-xs text-red-500">
      {{ props.error }}
    </div>
  </div>
</template>
