<template>

<b-form-invalid-feedback v-if="!isEmpty(errorMessages)">
      <div class="d-flex">
        <span style="margin-right:4px;" v-for="(err,index) in errorMessages">
          {{ errorMessages.length > 1 && index < errorMessages.length - 1 ? err + ',' : err }}
        </span>
      </div>
</b-form-invalid-feedback>



</template>


<script lang="ts" setup>
import { isEmpty } from '@/helpers/validations';
import { toRefs } from 'vue';


// Props
interface Props {
    errorMessages : Array<string>
}

const props = defineProps<Props>()

const { errorMessages } = toRefs(props)

// End Props


</script>