<template>

    <div>
      <BFormInput
        :modelValue="value"
        :type="inputType"
        :placeholder="placeholder"
        :state="state !== null ? !state : null"
        @input="onChange($event)"
    />

    <ErrorsForm :error-messages="errorMessages"/>
    </div>


</template>

<script lang="ts" setup>
import { InputType } from 'bootstrap-vue-next';
import { computed, reactive , toRefs, watch} from 'vue';
import ErrorsForm from "../../components/errors/ErrorsForm.vue" 
import { useError } from '../../composables/useError';
import { InputsTypes } from '../../types/InputsTypes';
import { Validations } from '../../interfaces/validations/validationFormInterface';

interface BaseProps {
        type : InputsTypes,
        validations?: Validations,
        placeholder? : string,
        state?: boolean | null;
        value?: any;
        errors?: Array<string>;
}

// Props
const props = defineProps<BaseProps>()
const { value, type, validations, state ,placeholder, errors} = toRefs(reactive(props));

// Computed Properties
const inputType = computed((): InputType => type.value as InputType);

//Emits
const emit = defineEmits<{
  (e: "setError", value: boolean): void;
  (e: "onChange", value: string): void;
}>();

// Events
const onChange = (value: string) => {
  handleValidations(value)
  emit('onChange', value)
};

// Composables
const { errorMessages, handleValidations, hasError } = useError(validations.value)


// Watchs
watch(hasError, (value: boolean | null) =>  emit("setError", value));


</script>