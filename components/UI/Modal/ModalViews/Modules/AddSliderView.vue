<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col relative">
      <header>Add Slider</header>
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
              <div class="pt-1">
                <div class="text-[14px] text-[#666] pb-2">Check slider type</div>
                <form class="w-full h-auto flex flex-wrap items-center justify-center gap-4">
                  <div v-for="sliderItemType in sliderTypes" :key="sliderItemType" class="w-[150px]">
                    <input type="radio" :value="sliderItemType" class="hidden input-item" :id="sliderItemType" v-model="sliderType">
                    <label :for="sliderItemType" class="label w-full h-[50px] rounded-md text-[#16bcdc] border-[1px] border-[#16bcdc] flex items-center justify-center">
                      {{ sliderItemType }}
                    </label>
                  </div>
                  <!-- <div class="w-full">
                    <input type="radio" value="simple" class="hidden input-item" id="simple" v-model="picked">
                    <label for="simple" class="label w-full h-[50px] rounded-md text-[#16bcdc] border-[1px] border-[#16bcdc] flex items-center justify-center">
                      simple
                    </label>
                  </div> -->
                </form>
              </div>
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button :label="'Add Slider'" :color="'primary'" @click="handleAddProduct" />
          <Button :label="'dddd'" :color="'danger'" @click="handle" />
      </footer>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { ProductStore } from '~~/store/productStore';
  import { ModulesStore } from '~~/store/modulesStore';
  import { storeToRefs } from 'pinia';
  import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
  import Input from '@/components/UI/Input/Input.vue';
  import Button from '@/components/UI/Button/Button.vue'
  import Label from '@/components/UI/Label/Label.vue'
  import SelectInput from '~~/components/UI/SelectInput/SelectInput.vue'
  import {sliderTypes} from '@/types/modulesTypes'
  
  // Icons
  import IconMinus from '~icons/mdi/minus'
  import IconClose from '~icons/mdi/close'
  import IconDelete from '~icons/mdi/delete'

  const handle = () => {
    console.log(sliderType.value)
  }
  
  //   Product Store
  const { fetchProducts } = ProductStore()
  const { products } = storeToRefs(ProductStore())

  // Modules Store
  const { addSlider } = ModulesStore()

  const sliderName = ref('')
  const sliderLink = ref('')    
  const sliderType = ref()    
  const sliderItems = ref([])

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
        type: sliderType.value,
        items: [],
        status: true,
    }

    sliderItems.value.map(item => {
        // sliderObj.items.push(item._id)
        sliderObj.items.push(item)
    })
  
    addSlider(sliderObj)
    // console.log(formData)
  }

  onBeforeMount(() => {
    fetchProducts()
  })
  
  </script>
  
  <style scoped>
  .input-item:checked + label{
    background: #16bcdc;
    color: white
  }
  </style>