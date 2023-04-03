<template>
  <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
    <header>Add Product</header>
    <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
        <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-hidden">
            <UploadImage @get-images="(images) => productImages = images" />
        </div>
        <div class="w-full h-full border rounded-md p-4">
            <Input v-model="productName" :label="'Product Name/Title'" placeholder="Name" />
            <Textarea v-model="productDescription" rows="5" :label="'Description'" placeholder="Description" />
            <Input v-model="productCategory" :label="'Category'" placeholder="Category" />
            <Input v-model="productPrice" :label="'Price'" placeholder="Price" />
            <Input v-model="productSalePrice" :label="'Sale Price'" placeholder="Sale Price" />
            <Input v-model="productQuantity" :label="'Product Quantity'" placeholder="Quantity" />
        </div>
    </div>
    <footer class=" flex items-center justify-end gap-2">
        <Button :label="'Add Product'" :color="'primary'" @click="handleAddProduct" />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UploadImage from '../../UploadImage/UploadImage.vue';
import Input from '../../Input/Input.vue';
import Textarea from '../../Textarea/Textarea.vue';
import Button from '../../Button/Button.vue'
import { ProductStore } from '~~/store/productStore';

// Products Store
const { addProduct } = ProductStore()

const productName = ref('')
const productDescription = ref('')
const productCategory = ref('')
const productPrice = ref('')
const productSalePrice = ref('')
const productQuantity = ref('')
const productImages = ref([])

const handleAddProduct = () => {
  const formData = new FormData()

  formData.append('title', productName.value)
  formData.append('description', productDescription.value)
  formData.append('category', productCategory.value)
  formData.append('price', parseInt(productPrice.value))
  formData.append('salePrice', parseInt(productSalePrice.value))
  formData.append('stock', parseInt(productQuantity.value))
  productImages.value.forEach(image => {
    formData.append('img', image.file)
  })

  addProduct(formData)
}
</script>

<style>

</style>