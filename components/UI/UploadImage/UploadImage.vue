<template> 
    <div class="w-full h-full flex flex-col">
        <div 
            
            @dragenter.prevent="handleDragEnter" 
            @dragleave.prevent="handleDragLeave" 
            @dragover.prevent 
            @drop.prevent="handleOnDrop"
        >
            <div class="w-full h-[250px] flex flex-col items-center justify-center border-[2px] border-dashed rounded-md border-[#00b7ff] bg-[#f4f6ff]">
                <IconCamera class="text-[80px] text-[gray]" />
                <div class="pt-4 flex items-center">
                    <IconUpload class="text-[#00b7ff]" />
                    Drop your image here or <label for="imageUpload" class="px-1 text-[#00b7ff] cursor-pointer" >Browse</label>
                </div>
            </div>
            <input @change="uloadImage" type="file" name="imageUpload" id="imageUpload" class="hidden">
        </div>
        <div v-show="uploadImages" class="flex-1 overflow-auto py-2">
            <div v-if="!uploadImages.length && onlyOne">
                <img class="w-[70px] h-[70px] flex p-2 border rounded mt-2 gap-2" :src="images[0]" alt="">
            </div>
            <div class="w-full h-[70px] flex p-2 border rounded mt-2 gap-2" v-for="image in uploadImages" :key="image.imageUrl">
                <img :src="image.imageUrl" alt="" class="w-[50px] h-[50px]">
                <div class="flex-1 flex flex-col gap-1">
                    <span>{{ image.file.name }}</span>
                    <span>{{ image.file.size / 1000 }} KB</span>
                </div>
                <div class="h-full w-[40px] flex items-center justify-center">
                    <IconDelete @click="() => deleteUploadImage(image)" class="text-[red] text-[20px]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';
import IconCamera from '~icons/mdi/camera-plus-outline'
import IconUpload from '~icons/mdi/upload'
import IconDelete from '~icons/mdi/delete'

const props = defineProps({
    onlyOne: {
        type: Boolean,
        required: false
    },
    images: {
        type: Array,
        required: false
    }
})

const emits = defineEmits(['getImages'])

const uploadImages = reactive([])

const uloadImage = (e) => {
    console.log(e.target.files)
}

const deleteUploadImage = (imageObj) => {
    const imageIndex = uploadImages.indexOf(imageObj)
    uploadImages.splice(imageIndex, 1)
}


const handleOnDrop = (e) => {
    const files = [...e.dataTransfer.files]
    if(props.onlyOne) {
        const image = files[0]
        const imageBlob = new Blob([image])
        const imageObj = {
            imageUrl: URL.createObjectURL(imageBlob),
            file: image
        }
        uploadImages.splice(0, 1 ,imageObj)
    } else {
        files.map(image => {
            const imageBlob = new Blob([image])
            const imageObj = {
                imageUrl: URL.createObjectURL(imageBlob),
                file: image
            }
            uploadImages.push(imageObj)
        }) 
    }
    emits('getImages', uploadImages)
}

const handleDragEnter = (e) => {
    console.log('drag-enter')
}
const handleDragLeave = (e) => {
    console.log('drag-leave')
}

</script>

<style>

</style>