<template>

    <div v-for="(input, index) in getInputs" :key="index">
        <div v-if="input.type === 'text' || input.type === 'email' || input.type === 'password'">
                <InputText
                   :value="formValues[input.key]"
                   v-model:model-value="formValues[input.key]"
                   :type="input.type"
                   :placeholder="input.placeholder"
                   :state="input.hasOwnProperty('state') ? (input.state ?? null) : null"
                   :validations="input.validations"
                   :errors="input.errors"
                   @setError="setError($event, index)"
                   @onChange="getDataForm($event,input.key as keyof object)"
                />
        </div>

        <div v-if="input.type === 'file'">
          <InputFile
            @onChange="setFiles"
          />
        </div>
    </div>

</template>


<script lang="ts" setup>
import InputText from '../components/form/InputText.vue';
import InputFile from "../components/form/InputFile.vue";
import { isEmpty } from '../helpers/validations';
import { Validator } from '../helpers/validator';
import { PropsInput } from '../interfaces/form/PropsForm';
import { ComputedRef, PropType, computed, ref, toRefs } from 'vue';

// Props
/*interface Props<K extends string > {
  inputs: {
    [key in K]: GeneratedInputs; // Keys dinamicas
  };
}*/

const props = defineProps({
  inputs: {
    type: Array as PropType<PropsInput[]>,
    required: true
  },
})

const { inputs } = toRefs(props)

// End Props

// Emits
/*const emit = defineEmits<{
  dataBack : [data : object]
}>();
*/


const generateForm = ref<Array<PropsInput>>([]);
const formValues = ref<object>({});

// Computed properties
const getInputs: ComputedRef<Array<PropsInput>> = computed<Array<PropsInput>>(() => {

        inputs.value.forEach(({key}, inputIndex) => {
          const inputExists : boolean = generateForm.value.some(input => input.key === key)//.map((input) => input.key).indexOf(key);

          if(inputExists){
            generateForm.value[inputIndex] = {
                ...generateForm.value[inputIndex],
                ...inputs.value[inputIndex],
            };
            if (inputs.value[inputIndex].value) {
            formValues.value[key] = inputs.value[inputIndex].value;
            }
          }else {
            // si no existe, agrego el input
            generateForm.value.push({ ...inputs.value[inputIndex], key });

            // Inicializando en el objeto databBack las keys correspondientes 
            // a cada input
            Object.defineProperty(formValues.value, key, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: {}
            });

            // si viene con valor, lo seteo
            formValues.value[key] = inputs.value[inputIndex]?.value ?? null
          }
        })

        console.log("s", generateForm.value);
        return generateForm.value;
})

// Methods
const setError = (value : boolean,index : number) => generateForm.value[index].state = value;

const getDataForm = (data : string | Array<File> , key : string) => {
  formValues.value = {...formValues.value, [key] : data}
};

// Validator
const validator = new Validator();

const isFormValid = () : boolean => {
  let result : boolean = true;
  Object.keys(generateForm.value).forEach((_,index) => {
    const actualInput = generateForm.value[index]
    if(actualInput.validations){
      validator.validate(formValues.value[actualInput.key], actualInput.validations.rules)
      if(!isEmpty(validator.getErrors)){
        generateForm.value[index].errors = validator.getErrors;
        result = false;
      }
    }
  })
  return result;
}

const getValues = () : object => formValues.value

const processformValues = ()  => {
  return {
    'isFormValid' : isFormValid(),
    'data' : getValues()
  }
}


const setFiles = (files) => {
  formValues.value.images = []
  Object.values(files).forEach(async (file) => {
        formValues.value.images.push(file)
  });
}

// Haciendo accesibles los metodos, para que el componente padre pueda utilizarlo
defineExpose({ processformValues })

</script>