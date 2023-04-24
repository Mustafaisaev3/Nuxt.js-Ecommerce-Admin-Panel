<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col relative">
      <header>Add Blog Post</header>
      <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
          <div class="w-full min-h-full flex flex-col border rounded-md p-4 overflow-hidden">
              <UploadImage @get-images="image => postImage = image[0]" :only-one="true"/>
          </div>
          <div class="w-full min-h-full border rounded-md p-4 flex flex-col gap-2 overflow-y-auto">
              <Input v-model="postTitle" :label="'Title'" placeholder="Title" />
              <Textarea v-model="postDescription" rows="5" :label="'Description'" placeholder="Description" />
              <Select class="w-full" :value="postCategory" :label="'Category'" placeholder="category" :options="blogCategories" @get-active-item="value => postCategory = value" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button :label="'Add Post'" :color="'primary'" @click="handleAddPost" />
      </footer>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
  import Input from '@/components/UI/Input/Input.vue';
  import Textarea from '@/components/UI/Textarea/Textarea.vue';
  import Dropdown from '@/components/UI/Dropdown/Dropdown.vue';
  import Button from '@/components/UI/Button/Button.vue'
  import Label from '@/components/UI/Label/Label.vue'
  import Select from '@/components/UI/Select/Select.vue';
  import SelectInput from '~~/components/UI/SelectInput/SelectInput.vue'
  import { BlogStore } from '~~/store/blogStore';
  
  // Icons
  import IconMinus from '~icons/mdi/minus'
  
  // Blog Store
  const { fetchBlogCategories, addBlogPost } = BlogStore()
  const { blogCategories } = storeToRefs(BlogStore())
  
  const postTitle = ref('')
  const postDescription = ref('')
  const postCategory = ref('')
  const postImage = ref('')
  
  
  const handleAddPost = () => {
    const formData = new FormData()
  
    formData.append('title', postTitle.value)
    formData.append('description', postDescription.value)
    formData.append('category', postCategory.value._id)
    formData.append('img', postImage.value.file)

    // productImages.value.forEach(image => {
    //   formData.append('img', image.file)
    // })
  
    addBlogPost(formData)
    // console.log(formData)
  }

  onBeforeMount(() => {
    fetchBlogCategories()
  })
  
  </script>
  
  <style>
  
  </style>


<!-- 
title
description
image
category
author
numLikes
numDislikes
status 
-->