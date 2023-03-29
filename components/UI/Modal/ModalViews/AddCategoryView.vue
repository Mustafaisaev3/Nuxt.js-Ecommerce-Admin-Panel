<template>
  <div class="min-w-[700px] h-[700px] p-[20px] flex flex-col">
    <header>Add Category</header>
    <div class="h-full flex-1 flex gap-4 py-2">
        <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-hidden">
            <UploadImage @get-images="(image) => categoryImage = image" :only-one="false" />
            <Input v-model="categoryName" :label="'Category Name'" placeholder="name" />
            <Input v-model="categoryParent" :label="'Parent Category'" placeholder="parent" />
        </div>
    </div>
    <footer class=" flex items-center justify-end gap-2">
        <!-- <div class="p-2 bg-cyan-500 rounded-md">hello</div> -->
        <Button @click="handleAddCategory" :label="'Add Category'" :color="'primary'" />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CategoryStore } from '~~/store/categoryStore';
import UploadImage from '../../UploadImage/UploadImage.vue';
import Input from '../../Input/Input.vue';
import Button from '../../Button/Button.vue'

const { addCategory } = CategoryStore()

const categoryName = ref('')
const categoryParent = ref('')
const categoryImage = ref(null)

const handleAddCategory = () => {
    const formData = new FormData()
    formData.append('name', categoryName.value)
    formData.append('parent', categoryParent.value)
    formData.append('img', categoryImage.value[0].file)
    
    addCategory(formData)
}

</script>

<style>

</style>