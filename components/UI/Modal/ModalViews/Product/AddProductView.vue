<template>
  <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col relative">
    <header>Add Product</header>
    <div class="h-full flex-1 flex gap-4 py-2 overflow-auto">
        <div class="w-full min-h-full flex flex-col border rounded-md p-4 overflow-hidden">
            <UploadImage @get-images="(images) => productImages = images" />
        </div>
        <div class="w-full min-h-full border rounded-md p-4 flex flex-col gap-2 overflow-y-auto">
            <Input v-model="productName" :label="'Product Name/Title'" placeholder="Name" />
            <Textarea v-model="productDescription" rows="5" :label="'Description'" placeholder="Description" />
            <Input v-model="productCategory" :label="'Category'" placeholder="Category" />
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
        <Button :label="'Add Product'" :color="'primary'" @click="handleAddProduct" />
    </footer>

    <!-- Add Options View -->
    <SelectProductOptions v-show="showAddOptionView" :closeOptionModal="closeOptionModal" @get-selected-options="(options) => productOptions = options"/>
    <!-- Add Options View -->

    <!-- Add Characteristics View -->
    <SelectProductCharacteristics v-show="showAddCharacteristicView" :closeCharacteristicsModal="closeCharacteristicsModal" @get-selected-characteristics="(characteristics) => productCharacteristics = characteristics"/>
    <!-- Add Characteristics View -->

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import UploadImage from '@/components/UI/UploadImage/UploadImage.vue';
import Input from '@/components/UI/Input/Input.vue';
import Textarea from '@/components/UI/Textarea/Textarea.vue';
import Dropdown from '@/components/UI/Dropdown/Dropdown.vue';
import Button from '@/components/UI/Button/Button.vue'
import Label from '@/components/UI/Label/Label.vue'
import SelectInput from '~~/components/UI/SelectInput/SelectInput.vue'
import SelectProductOptions from './SelectProductOptions.vue';
import SelectProductCharacteristics from './SelectProductCharacteristics.vue';
import { ProductStore } from '~~/store/productStore';

// Icons
import IconMinus from '~icons/mdi/minus'

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

// Products Store
const { addProduct } = ProductStore()

const productName = ref('')
const productDescription = ref('')
const productCategory = ref('')
const productPrice = ref('')
const productSalePrice = ref('')
const productQuantity = ref('')
const productOptions = ref([])
const productCharacteristics = ref([])
const productImages = ref([])


const handleAddProduct = () => {
  const formData = new FormData()

  formData.append('title', productName.value)
  formData.append('description', productDescription.value)
  formData.append('category', productCategory.value)
  formData.append('price', parseInt(productPrice.value))
  formData.append('salePrice', parseInt(productSalePrice.value))
  formData.append('options', JSON.stringify(productOptions.value))
  formData.append('characteristics', JSON.stringify(productCharacteristics.value))
  formData.append('stock', parseInt(productQuantity.value))
  productImages.value.forEach(image => {
    formData.append('img', image.file)
  })

  addProduct(formData)
  // console.log(formData)
}

</script>

<style>

</style>