<template>
  <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
    <header>Add Product</header>
    <div class="h-full flex-1 flex gap-4 py-2">
        <div class="w-full h-full flex flex-col border rounded-md p-4 overflow-hidden">
            <UploadImage />
        </div>
        <div class="w-full h-full border rounded-md p-4">
            <Input :label="'Product Name'" placeholder="hello" />
            <Input :label="'Category'" placeholder="Category" />
            <Input :label="'Price'" placeholder="Price" />
            <Textarea rows="5" :label="'Description'" placeholder="Description" />
        </div>
    </div>
    <footer class=" flex items-center justify-end gap-2">
        <!-- <div class="p-2 bg-cyan-500 rounded-md">hello</div> -->
        <Button :label="'Save Product'" :color="'primary'" />
    </footer>
  </div>
</template>

<script setup>
import UploadImage from '../../UploadImage/UploadImage.vue';
import Input from '../../Input/Input.vue';
import Textarea from '../../Textarea/Textarea.vue';
import Button from '../../Button/Button.vue'


</script>

<style>

</style>