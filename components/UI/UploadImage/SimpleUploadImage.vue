<template>
  <div class="w-full h-auto flex items-center justify-center">
    <label :for="`imageUpload-${inputKey}`">
        <div v-if="url && !selectedImageUrl" class="w-[100px] h-[100px] border rounded-md  cursor-pointer">
            <img :src="url" alt="">
        </div>
        <div v-if="selectedImageUrl" class="w-[100px] h-[100px] border rounded-md  cursor-pointer">
            <img :src="selectedImageUrl" alt="">
        </div>
        <div v-if="!url && !selectedImageUrl" class="w-[100px] h-[100px] border rounded-md flex items-center justify-center cursor-pointer">
            <IconCamera class="text-[30px] text-[#cecece]" />
        </div>
        <input @change="handleSelectImage" type="file" :name="`imageUpload-${inputKey}`" :id="`imageUpload-${inputKey}`" class="hidden">
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
    url: {
        type: String
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