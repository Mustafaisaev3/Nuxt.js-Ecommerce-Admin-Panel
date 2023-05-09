<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col relative">
      <header>Update Blog Slider</header>
      <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
          <div class="w-full min-h-full flex flex-col border rounded-md p-4 overflow-hidden">
              
            <SelectInput :data="posts" :placeholder="'Search products...'" @get-select-item="(item) => handleAddItemToSlider(item)"/>
            <!-- <Input v-model="sliderName" :label="'Select Slider Item'" placeholder="Name" /> -->

            <div class="flex-1 overflow-auto py-2">
                <div class="w-full h-[70px] flex p-2 border rounded mt-2 gap-2" v-for="post in sliderItems" :key="post._id">
                    <img :src="post.image" alt="" class="w-[50px] h-[50px] object-cover">
                    <div class="flex-1 flex flex-col gap-1">
                        <span>{{ post.title }}</span>
                        <!-- <span>{{ post.price }} $</span> -->
                    </div>
                    <div class="h-full w-[40px] flex items-center justify-center cursor-pointer">
                        <IconClose @click="() => handleDeleteItemFromSlider(post)" class="text-[gray] text-[20px]" />
                    </div>
                </div>
            </div>
          </div>
          <div class="w-full min-h-full border rounded-md p-4 flex flex-col gap-2 overflow-y-auto">
              <Input v-model="sliderTitle" :label="'Slider Title'" placeholder="Title" />
              <Input v-model="sliderLink" :label="'Link'" placeholder="link" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button :label="'Update Slider'" :color="'primary'" @click="handleAddProduct" />
          <Button :label="'Update Slider'" :color="'danger'" @click="handle" />
      </footer>
  
    </div>
</template>
  
<script setup>
  import { ref, reactive } from 'vue';
  import { BlogStore } from '~~/store/blogStore';
  import { ModulesStore } from '~~/store/modulesStore';
  import { storeToRefs } from 'pinia';
  import { useUi } from '~~/store/uiStore';
  import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
  import Input from '@/components/UI/Input/Input.vue';
  import Button from '@/components/UI/Button/Button.vue'
  import Label from '@/components/UI/Label/Label.vue'
  import SelectInput from '~~/components/UI/SelectInput/SelectInput.vue'
  
  // Icons
  import IconMinus from '~icons/mdi/minus'
  import IconClose from '~icons/mdi/close'
  import IconDelete from '~icons/mdi/delete'

  // UI Store
  const { modalData } = storeToRefs(useUi())
  
  //   Product Store
  const { fetchBlogPosts } = BlogStore()
  const { posts } = storeToRefs(BlogStore())

  // Modules Store
  const { updateBlogSlider } = ModulesStore()

  const sliderName = ref('Blog Slider')
  const sliderTitle = ref(modalData.value.title ? modalData.value.title : '')
  const sliderLink = ref(modalData.value.link ? modalData.value.link : '')    
  const sliderStatus = ref(modalData.value.status ? modalData.value.status : true)    
  const sliderItems = ref(modalData.value.items ? modalData.value.items : [])
//   const sliderItems = ref(modalData.value.items)

  // Handle add item to Slider Items
  const handleAddItemToSlider = (item) => {
    sliderItems.value.push(item)
    console.log(item)
  }

  // Handle delete item from Slider Items
  const handleDeleteItemFromSlider = (item) => {
    const filteredItemsArr = sliderItems.value.filter((sliderItem) => {
        return sliderItem._id !== item._id
    })

    sliderItems.value = filteredItemsArr
  }

  const handle = () => {
    console.log(modalData.value)
  }
  
  
  const handleAddProduct = () => {
    const sliderObj = {
        name: sliderName.value,
        title: sliderTitle.value,
        link: sliderLink.value,
        items: [],
        status: sliderStatus.value,
    }

    sliderItems.value.map(item => {
        sliderObj.items.push(item._id)
    })
  
    updateBlogSlider(sliderObj)
  }

  onBeforeMount(() => {
    fetchBlogPosts()
    console.log(modalData.value)
  })
  
</script>
  
<style>
  
</style>