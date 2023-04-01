<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
      <header>Update Product</header>
      <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
          <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-hidden">
              <UploadImage @get-images="(images) => productImages = images" :images="productExistingImages" />
          </div>
          <div class="w-full h-full border rounded-md p-4">
              <Input v-model="productName" :label="'Product Name/Title'" placeholder="Name" />
              <Textarea v-model="productDescription" rows="5" :label="'Description'" placeholder="Description" />
              <!-- <Input v-model="productCategory" :label="'Category'" placeholder="Category" /> -->
              <Select class="w-full" :label="'Category'" placeholder="parent" :options="categories" @get-active-item="value => productCategory = value._id" />
              <Input v-model="productPrice" :label="'Price'" placeholder="Price" />
              <Input v-model="productSalePrice" :label="'Sale Price'" placeholder="Sale Price" />
              <Input v-model="productQuantity" :label="'Product Quantity'" placeholder="Quantity" />
          </div>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button :label="'Update Product'" :color="'primary'" @click="handleAddProduct" />
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ProductStore } from '~~/store/productStore';
  import { CategoryStore } from '~~/store/categoryStore';
  import { useUi } from '~~/store/uiStore';
  import UploadImage from '../../UploadImage/UploadImage.vue';
  import Input from '../../Input/Input.vue';
  import Textarea from '../../Textarea/Textarea.vue';
  import Button from '../../Button/Button.vue'
  import Select from '../../Select/Select.vue';

  
  // Products Store
  const { updateProduct } = ProductStore()
  const { modalData } = storeToRefs(useUi())
  
  // Categories Store
  const { fetchCategories } = CategoryStore()
  const { categories } = storeToRefs(CategoryStore())
  console.log(modalData.images)
  
  const productName = ref(modalData.value.title)
  const productDescription = ref(modalData.value.description)
  const productCategory = ref(modalData.value.category)
  const productPrice = ref(modalData.value.price)
  const productSalePrice = ref(modalData.value.salePrice)
  const productQuantity = ref(modalData.value.quantity)
  const productExistingImages = ref(modalData.value.images)
  const productImages = ref([])
  
  const handleAddProduct = () => {
    const formData = new FormData()
  
    formData.append('title', productName.value)
    formData.append('description', productDescription.value)
    formData.append('category', productCategory.value)
    formData.append('price', productPrice.value)
    formData.append('salePrice', productSalePrice.value | 0)
    formData.append('stock', productQuantity.value | 0)

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