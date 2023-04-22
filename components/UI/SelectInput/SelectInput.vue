<template>
  <div class="w-auto h-auto relative">
    <label v-if="label" :style="labelStyles">{{ label }}</label>
    <div class="h-full">
        <input v-model="inputValue" :style="inputStyles" @focus="showContentBody = true" />
    
        <div v-show="showContentBody" class="content-body absolute left-0 top-[100%] w-full min-h-[150px] h-full flex flex-col gap-2 shadow bg-[#e8e8e8] rounded-md p-2 z-[1]">
            <div v-for="item in filteredData" :key="item.key" >
                <div @click="() => onItemSelect(item)" class="hover:text-[#16bcdc] cursor-pointer">{{ item.title }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps(['data', 'label', 'modelValue', 'labelStyles', 'inputStyles'])
const emits = defineEmits(['get-select-item'])

const inputValue = ref('') 
const showContentBody = ref(false) 
let filteredData = reactive([]) 

// On Input Change
const onInputChange = (searchValue) => {   
    const filterResult = props.data.filter(item => {
        return item.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    filteredData = filterResult
}

// On Item Select
const onItemSelect = (item) => {
    showContentBody.value = false
    emits('get-select-item', item)
}

watch(inputValue, (newValue, oldValue) => {
    onInputChange(newValue)
})

</script>

<style scoped>
    label {
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 1;
        display: inline-block;
        margin-bottom: 5px;
    }

    input {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        padding: 0 15px;
        outline: 0;
        font-weight: 400;
        font-size: 14px;
        /* border: 2px solid #ddd; */
        width: 100%;
        line-height: 50px;
        height: 50px;
        color: #999;
    }

    input.error {
        border-color: red;
    }
</style>