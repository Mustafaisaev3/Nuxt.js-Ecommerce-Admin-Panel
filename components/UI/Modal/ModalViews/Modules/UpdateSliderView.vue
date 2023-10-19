<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col relative">
      <header>Update Slider</header>
      <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
          <div class="w-full min-h-full flex flex-col border rounded-md p-4 overflow-hidden">
              
            <SelectInput :data="products" :placeholder="'Search products...'" @get-select-item="(item) => handleAddItemToSlider(item)"/>
            <!-- <Input v-model="sliderName" :label="'Select Slider Item'" placeholder="Name" /> -->

            <div class="flex-1 overflow-auto py-2">
                <div class="w-full h-[70px] flex p-2 border rounded mt-2 gap-2" v-for="product in sliderItems" :key="product._id">
                    <img :src="product.images[0]" alt="" class="w-[50px] h-[50px] object-cover">
                    <div class="flex-1 flex flex-col gap-1">
                        <span>{{ product.title }}</span>
                        <span>{{ product.price }} $</span>
                    </div>
                    <div class="h-full w-[40px] flex items-center justify-center cursor-pointer">
                        <IconClose @click="() => handleDeleteItemFromSlider(product)" class="text-[gray] text-[20px]" />
                    </div>
                </div>
            </div>
          </div>
          <div class="w-full min-h-full border rounded-md p-4 flex flex-col gap-2 overflow-y-auto">
              <Input v-model="sliderName" :label="'Slider Name/Title'" placeholder="Name" />
              <Input v-model="sliderLink" :label="'Link'" placeholder="link" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button :label="'Update Slider'" :color="'primary'" @click="handleAddProduct" />
      </footer>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { ProductStore } from '~~/store/productStore';
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
  const { fetchProducts } = ProductStore()
  const { products } = storeToRefs(ProductStore())

  // Modules Store
  const { updateSlider } = ModulesStore()

  const sliderName = ref(modalData.value.name)
  const sliderLink = ref(modalData.value.link)    
  const sliderStatus = ref(modalData.value.status)    
  const sliderItems = ref(modalData.value.items)

  // Handle add item to Slider Items
  const handleAddItemToSlider = (item) => {
    sliderItems.value.push(item)
  }

  // Handle delete item from Slider Items
  const handleDeleteItemFromSlider = (item) => {
    const filteredItemsArr = sliderItems.value.filter((sliderItem) => {
        return sliderItem._id !== item._id
    })

    sliderItems.value = filteredItemsArr
  }
  
  
  const handleAddProduct = () => {
    const sliderObj = {
        name: sliderName.value,
        link: sliderLink.value,
        items: [],
        status: sliderStatus.value,
    }

    sliderItems.value.map(item => {
        // sliderObj.items.push(item._id)
        sliderObj.items.push(item)
    })
  
    updateSlider(modalData.value._id, sliderObj)
    // console.log(formData)
  }

  onBeforeMount(() => {
    fetchProducts()
  })
  
  </script>
  
  <style>
  
  </style>