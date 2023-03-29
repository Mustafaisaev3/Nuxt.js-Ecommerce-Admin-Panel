<template>
    <div class="min-w-[700px] h-[700px] p-[20px] flex flex-col">
      <header>Update Category</header>
      <div class="h-full flex-1 flex gap-4 py-2">
          <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-hidden">
              <UploadImage @get-images="(image) => categoryImage = image" :images="[modalData.image]" :only-one="true" />
              <Input v-model="categoryName" :label="'Category Name'" placeholder="name" />
              <Input v-model="categoryParent" :label="'Parent Category'" placeholder="parent" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleUpdateCategory" :label="'Update Category'" :color="'primary'" />
          <Button @click="some" :label="'Category'" :color="'secondary'" />
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { CategoryStore } from '~~/store/categoryStore';
  import { useUi } from '~~/store/uiStore';
  import UploadImage from '../../UploadImage/UploadImage.vue';
  import Input from '../../Input/Input.vue';
  import Button from '../../Button/Button.vue'
  
  const { updateCategory } = CategoryStore()
  const { modalData } = storeToRefs(useUi())
  
  const categoryName = ref(modalData.value.name)
  const categoryParent = ref(modalData.value.parent)
  const categoryImage = ref([])
  
  const handleUpdateCategory = () => {
      const formData = new FormData()
      formData.append('name', categoryName.value)
      // formData.append('parent', categoryParent.value)
      if (categoryImage.value[0]) {
        formData.append('img', categoryImage.value[0].file)
      } else {
        formData.append('url', modalData.value.image)
      }
      
      updateCategory(modalData.value._id ,formData)
  }

  const some = () => {
    console.log(modalData.value)
  }
  
  </script>
  
  <style>
  
  </style>