<template>
  <div class="w-full h-auto flex items-center justify-center">
    <label :for="`imageUpload-${props.inputKey}`">
        <!-- <div v-if="image" class="w-[100px] h-[100px] border rounded-md  cursor-pointer">
            <img :src="image" alt="">
        </div> -->
        <div v-if="selectedImageUrl" class="w-[100px] h-[100px] border rounded-md  cursor-pointer">
            <img :src="selectedImageUrl" alt="">
        </div>
        <div v-else class="w-[100px] h-[100px] border rounded-md flex items-center justify-center cursor-pointer">
            <IconCamera class="text-[30px] text-[#cecece]" />
        </div>
        <input @change="handleSelectImage" type="file" :name="`imageUpload-${props.inputKey}`" :id="`imageUpload-${props.inputKey}`" class="hidden">
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconCamera from '~icons/mdi/camera-plus-outline'

let selectedImageUrl = ref(undefined)

const props = defineProps({
    image: {
        type: Object,
    },
    inputKey: {
        type: Number,
    }
})

const emits = defineEmits(['getImage'])

const handleSelectImage = (e) => {
    const image = e.target.files[0]

    const imageBlob = new Blob([image])
    const imageObj = {
        imageUrl: URL.createObjectURL(imageBlob),
        file: image
    }

    selectedImageUrl.value = imageObj.imageUrl

    emits('getImage', imageObj)

}

</script>

<style>

</style>