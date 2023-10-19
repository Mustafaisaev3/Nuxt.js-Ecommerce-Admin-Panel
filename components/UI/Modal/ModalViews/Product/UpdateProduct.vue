<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col relative">
      <header>Update Product</header>
      <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
          <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-hidden">
              <UploadImage @get-images="(images) => productImages = images" :images="productExistingImages" />
          </div>
          <div class="w-full min-h-full border rounded-md p-4 flex flex-col gap-2 overflow-y-auto">
              <Input v-model="productName" :label="'Product Name/Title'" placeholder="Name" />
              <Textarea v-model="productDescription" rows="5" :label="'Description'" placeholder="Description" />
              <!-- <Input v-model="productCategory" :label="'Category'" placeholder="Category" /> -->
              <Select class="w-full" :value="productCategory" :label="'Category'" placeholder="parent" :options="categories" @get-active-item="value => productCategory = value" />
              <Input v-model="productPrice" :label="'Price'" placeholder="Price" />
              <Input v-model="productSalePrice" :label="'Sale Price'" placeholder="Sale Price" />
              <Input v-model="productQuantity" :label="'Product Quantity'" placeholder="Quantity" />
              <Label :label="'Options'">
                <Button :color="'secondary'" :label="'Add Options'" class="w-full"  @click="showAddOptionView = true"/>
              </Label>
              <Label :label="'Characteristics'">
                <Button :color="'secondary'" :label="'Add Characteristics'" class="w-full" @click="showAddCharacteristicView = true" />
              </Label>
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button :label="'Update Product'" :color="'primary'" @click="handleAddProduct" />
      </footer>

      <!-- Add Options View -->
      <SelectProductOptions :options="productOptions" v-show="showAddOptionView" :closeOptionModal="closeOptionModal" @get-selected-options="(options) => productOptions = options"/>
      <!-- Add Options View -->

      <!-- Add Characteristics View -->
      <SelectProductCharacteristics :characteristics="productCharacteristics" v-show="showAddCharacteristicView" :closeCharacteristicsModal="closeCharacteristicsModal" @get-selected-characteristics="(characteristics) => productCharacteristics = characteristics"/>
      <!-- Add Characteristics View -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ProductStore } from '~~/store/productStore';
  import { CategoryStore } from '~~/store/categoryStore';
  import { useUi } from '~~/store/uiStore';
  import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
  import Input from '@/components/UI/Input/Input.vue';
  import Textarea from '@/components/UI/Textarea/Textarea.vue';
  import Button from '@/components/UI/Button/Button.vue'
  import Select from '@/components/UI/Select/Select.vue';
  import Label from '@/components/UI/Label/Label.vue'
  import SelectProductOptions from './SelectProductOptions.vue';
  import SelectProductCharacteristics from './SelectProductCharacteristics.vue';

  // UI Store
  const { modalData } = storeToRefs(useUi())
  
  // Products Store
  const { updateProduct } = ProductStore()
  
  // Categories Store
  const { fetchCategories } = CategoryStore()
  const { categories } = storeToRefs(CategoryStore())
  console.log(modalData)

  // Option Modal close
  let showAddOptionView = ref(false)
  const closeOptionModal = () => {
    showAddOptionView.value = false
  }

  // Characteristics Modal close
  let showAddCharacteristicView = ref(false)
  const closeCharacteristicsModal = () => {
    showAddCharacteristicView.value = false
  }
  
  const productName = ref(modalData.value.title)
  const productDescription = ref(modalData.value.description)
  const productCategory = ref(modalData.value.category)
  const productPrice = ref(modalData.value.price)
  const productSalePrice = ref(modalData.value.salePrice)
  const productQuantity = ref(modalData.value.stock)
  const productOptions = ref(modalData.value.options)
  const productCharacteristics = ref(modalData.value.characteristics)
  const productExistingImages = ref(modalData.value.images)
  const productImages = ref([])
  
  const handleAddProduct = () => {
    const formData = new FormData()
  
    formData.append('title', productName.value)
    formData.append('description', productDescription.value)
    formData.append('category', productCategory.value._id)
    formData.append('price', productPrice.value)
    formData.append('salePrice', productSalePrice.value | 0)
    formData.append('stock', productQuantity.value | 0)
    formData.append('options', JSON.stringify(productOptions.value))
    formData.append('characteristics', JSON.stringify(productCharacteristics.value))

    if (productExistingImages){
      productExistingImages.value.forEach(image => {
        formData.append('urls', image)
      })
    }
    
    if (productImages.value[0]) {
      productImages.value.forEach(image => {
          formData.append('img', image.file)
      })
    }



    // if (productImages.value[0]) {
    //   productImages.value.forEach(image => {
    //       formData.append('img', image.file)
    //   })
    // } else {
    //   formData.append('urls', modalData.value.images)
    // }
    
  
    updateProduct(modalData.value._id, formData)
  }

  onBeforeMount(() => {
    fetchCategories()
  })
  </script>
  
  <style>
  
  </style>