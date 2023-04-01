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
            <div v-if="!uploadImages.length && onlyOne" class="image-container w-[70px] h-[70px] border rounded mt-2 overflow-hidden relative">
                <img class="w-full h-full flex gap-2 object-cover" :src="images[0]" alt="">
                <!-- <div class="close hidden w-full h-full absolute top-0 right-0 items-center justify-center bg-[#1313136e]">
                    <IconCloseCircle class="text-white text-[20px] cursor-pointer" />
                </div> -->
            </div>
            <div v-if="!onlyOne" class="flex gap-2">
                <div v-for="image in propsImages" :key="image" class="image-container w-[70px] h-[70px] border rounded mt-2 overflow-hidden relative">
                    <img class="w-full h-full flex gap-2 object-cover" :src="image" alt="">
                    <div class="close hidden w-full h-full absolute top-0 right-0 items-center justify-center bg-[#1313136e]">
                        <IconCloseCircle class="text-white text-[20px] cursor-pointer" @click="() => deleteExistingImage(image)" />
                    </div>
                </div>
            </div>
            <div class="w-full h-[70px] flex p-2 border rounded mt-2 gap-2" v-for="image in uploadImages" :key="image.imageUrl">
                <img :src="image.imageUrl" alt="" class="w-[50px] h-[50px] object-cover">
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
import IconCloseCircle from '~icons/mdi/close-circle'

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


const propsImages = reactive(props.images)
const uploadImages = reactive([])

const uloadImage = (e) => {
    console.log(e.target.files)
}

const deleteExistingImage = (imageObj) => {
    const imageIndex = propsImages.indexOf(imageObj)
    propsImages.splice(imageIndex, 1)
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

<style scoped>
.image-container:hover .close {
    display: flex;
}
</style>