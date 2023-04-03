<template>
  <div class="min-w-[700px] h-[700px] p-[20px] flex flex-col">
    <header>Add Category</header>
    <div class="h-full flex-1 flex gap-4 py-2">
        <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-auto">
            <UploadImage @get-images="(image) => categoryImage = image" :only-one="false" />
            <Input v-model="categoryName" :label="'Category Name'" placeholder="name" />
            <!-- <Input v-model="categoryParent" :label="'Parent Category'" placeholder="parent" /> -->
            <Select class="w-full" :label="'Category'" placeholder="parent"  :options="categories" @get-active-item="value => categoryParent = value._id" />
        </div>
    </div>
    <footer class=" flex items-center justify-end gap-2">
        <Button @click="handleAddCategory" :label="'Add Category'" :color="'primary'" />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { CategoryStore } from '~~/store/categoryStore';
import UploadImage from '../../UploadImage/UploadImage.vue';
import Input from '../../Input/Input.vue';
import Button from '../../Button/Button.vue'
import Select from '../../Select/Select.vue';

// Store
const { addCategory } = CategoryStore()
const { categories } = storeToRefs(CategoryStore())

const categoryName = ref('')
const categoryParent = ref('')
const categoryImage = ref(null)

const handleAddCategory = () => {
    const formData = new FormData()
    formData.append('name', categoryName.value)
    if( categoryParent.value ) {
      formData.append('parent', categoryParent.value)
    }
    formData.append('img', categoryImage.value[0].file)
    
    addCategory(formData)
}

</script>

<style>

</style>