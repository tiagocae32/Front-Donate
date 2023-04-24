<template>

    <div v-for="(input, index) in getInputs" :key="index">
        <div v-if="input.type === 'text' || input.type === 'password'">
                <InputText
                   :value="dataBack[input.key]"
                   v-model:model-value="dataBack[input.key]"
                   :type="input.type"
                   :placeholder="input.placeholder"
                   :state="input.hasOwnProperty('state') ? (input.state ?? null) : null"
                   :validations="input.validations"
                   :errors="input.errors"
                   @setError="setError($event, index)"
                   @onChange="getDataForm($event,input.key as keyof object)"
                />
        </div>
    </div>

</template>


<script lang="ts" setup>
import InputText from '../components/form/InputText.vue';
import { isEmpty } from '../helpers/validations';
import { Validator } from '../helpers/validator';
import { GeneratedInputs} from '../interfaces/form/PropsForm';
import { ComputedRef, computed, ref, toRefs } from 'vue';

// Props
interface Props<K extends string > {
  inputs: {
    [key in K]: GeneratedInputs; // Keys dinamicas
  };
}

const props = defineProps<Props<string>>()
const { inputs } = toRefs(props)

// End Props

// Emits
const emit = defineEmits<{
  (e: "dataBack", data: object): void;
}>();


const generateForm = ref<Array<GeneratedInputs>>([]);
const dataBack = ref<object>({});

// Computed properties
const getInputs: ComputedRef<Array<GeneratedInputs>> = computed<Array<GeneratedInputs>>(() => {
        Object.keys(inputs.value).forEach(key => {
        const index : number = generateForm.value.map((input) => input.key).indexOf(key);
        if (index > -1) {
        // mergeo lo que tengo con lo que viene
        generateForm.value[index] = {
                ...generateForm.value[index],
                ...inputs.value[key],
        };
        if (inputs.value[key].value) {
            dataBack.value[key] = inputs.value[key].value;
        }
    } else {
      // si no existe, agrego el input
      generateForm.value.push({ ...inputs.value[key], key });

      // Inicializando en el objeto databBack las keys correspondientes 
      // a cada input
      Object.defineProperty(dataBack.value, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
      });

      // si viene con valor, lo seteo
      dataBack.value[key] = inputs.value[key].value ?? null
    }
  })
    return generateForm.value
})

// Methods
const setError = (value : boolean,index : number) => generateForm.value[index].state = value;

const getDataForm = (data : string , key : string) => {
  dataBack.value = {...dataBack.value, [key] : data}
  emit('dataBack', dataBack.value)
};


// Validator

const validator = new Validator();

const isFormValid = () : boolean => {
  let result : boolean = true;
  Object.keys(generateForm.value).forEach((_,index) => {
    const actualInput = generateForm.value[index]
    if(actualInput.validations){
      validator.validate(dataBack.value[actualInput.key], actualInput.validations.rules)
      if(!isEmpty(validator.getErrors)){
        generateForm.value[index].errors = validator.getErrors;
        result = false;
      }
    }
  })
  return result;
}

const getValues = () : object => dataBack.value

const processDataBack = ()  => {
  return {
    'isFormValid' : isFormValid(),
    'values' : getValues()
  }

}

// Haciendo accesibles los metodos, para que el componente padre pueda utilizarlo
defineExpose({processDataBack})

</script>