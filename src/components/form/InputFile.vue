<template>

    <div>
        <input type="file" multiple @change="uploadFiles"/>
    />
    </div>



</template>

<script lang="ts" setup>

//Emits
const emit = defineEmits<{
    onChange : [data : Array<File>]
}>();


// Methods

const uploadFiles = async (event: Event) =>  {
  const target = event.target as HTMLInputElement
  const files = target.files as unknown as Array<File>
    if (files.length > 0) {
        emit("onChange", files);
    } 
}


</script>