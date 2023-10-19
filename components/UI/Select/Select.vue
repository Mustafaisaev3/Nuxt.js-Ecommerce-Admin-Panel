<template>
    <div class="select-container w-full h-[50px]">
        <label v-if="label">{{ label }}</label>
        <div class="select w-full flex items-center justify-between relative" @click="showSelectBody = !showSelectBody">
          {{ activeValue ? activeValue.title : placeholder }}
          <IconDown />
          <div v-show="options && showSelectBody" class="absolute top-[100%] left-0 w-full h-auto max-h-[150px] flex flex-col rounded-md gap-2 px-[10px] py-[10px] mt-2 bg-[#e8e8e8] overflow-auto z-[1000]"> 
              <ul class="flex flex-col gap-2">
                  <li v-for="option in options" :key="option.key" @click="() => selectOption(option)" class="cursor-pointer">
                      <div class="flex items-center gap-2 hover:text-[#16bcdc] ">
                          <div class="text-[15px]">{{ option.title || option.name }}</div>
                      </div>
                  </li>
              </ul>
          </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import IconDown from '~icons/mdi/chevron-down'

const emits = defineEmits(['get-active-item'])

const props = defineProps({
    value: {
        required: false
    },
    label : {
        type: String,
        required: false,
    },
    placeholder: {
        type: String,
        default: 'Select',
        required: false,
    },
    options: {
        type: Array,
        required: true
    }
})

let showSelectBody = ref(false)
let activeValue = ref(props.value ? props.value : null)


console.log(activeValue.value)

const selectOption = (option) => {
    activeValue = option
    emits('get-active-item', option)
    showSelectBody.value = false
}

</script>

<style scoped>
.select {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 15px 15px;
    outline: 0;
    font-weight: 400;
    font-size: 14px;
    /* border: 2px solid #ddd; */
    width: 100%;
    /* margin-top: 5px; */
    line-height: 20px;
    height: 100%;
    border-radius: 5px;
    color: #999;
}

label {
    font-size: 14px;
    color: #666;
    font-weight: 400;
    line-height: 1;
    display: inline-block;
}
</style>