<template>
    <div class="min-w-[700px] h-auto p-[20px] flex flex-col">
      <header>Add Blog Category</header>
      <div class="h-full flex-1 flex gap-4 py-2">
          <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-auto">
              <Input v-model="blogCategoryName" :label="'Blog Category Name'" placeholder="name" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleAddBlogCategory" :label="'Add Category'" :color="'primary'" />
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { BlogStore } from '~~/store/blogStore';
  import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
  import Input from '@/components/UI/Input/Input.vue';
  import Button from '@/components/UI/Button/Button.vue'
  
  // Store
  const { addBlogCategory } = BlogStore()
  
  const blogCategoryName = ref('')
  const blogCategoryImage = ref(null)
  
  const handleAddBlogCategory = () => {
      const formData = new FormData()
      formData.append('name', blogCategoryName.value)
    //   formData.append('img', blogCategoryImage.value[0].file)
      
    addBlogCategory({name: blogCategoryName.value})
  }
  
  </script>
  
  <style>
  
  </style>