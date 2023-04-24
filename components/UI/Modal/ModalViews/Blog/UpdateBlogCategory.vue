<template>
    <div class="min-w-[700px] h-auto p-[20px] flex flex-col">
      <header>Update Blog Category</header>
      <div class="h-full flex-1 flex gap-4 py-2">
          <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-auto">
              <Input v-model="blogCategoryName" :label="'Category Name'" placeholder="name" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleUpdateBlogCategory" :label="'Update Category'" :color="'primary'" />
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { BlogStore } from '~~/store/blogStore';
  import { useUi } from '~~/store/uiStore';
  import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
  import Input from '@/components/UI/Input/Input.vue';
  import Button from '@/components/UI/Button/Button.vue'
  import Select from '@/components/UI/Select/Select.vue'
  
  // Store
  const { updateBlogCategory } = BlogStore()
  // const { categories } = storeToRefs(CategoryStore())

  // UI Store
  const { openConfirmationModal } = useUi()
  const { modalData } = storeToRefs(useUi())
  
  const blogCategoryName = ref(modalData.value.name)
  // const categoryImage = ref([])
  
  const handleUpdateBlogCategory = () => {

    // openConfirmationModal({
    //   question: `You want to change Blog Category?`,
    //   callback: () => updateBlogCategory(modalData.value._id ,blogCategoryName.value)
    // })
    updateBlogCategory(modalData.value._id , {name: blogCategoryName.value})
  }
  
  </script>
  
  <style>
  
  </style>