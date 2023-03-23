<template>
    <div class="select-container max-w-[400px] relative">
        <div class="select w-full flex items-center justify-between" @click="showSelectBody = !showSelectBody">
          {{ activeValue ? activeValue.title : placeholder }}
          <IconDown />
        </div>
        <div v-show="showSelectBody && options" class="absolute top-[100%] left-0 w-full h-auto flex flex-col rounded-md gap-2 px-[10px] py-[10px] mt-2 bg-[#e8e8e8] z-10"> 
            <ul>
                <li v-for="option in options" :key="option.key" @click="() => selectOption(option)" class="cursor-pointer">
                    <div class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="text-[15px]">{{ option.title }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import IconDown from '~icons/mdi/chevron-down'

let showSelectBody = ref(false)
let activeValue = ref(null)

const props = defineProps({
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

const selectOption = (option) => {
    activeValue = option
    showSelectBody.value = !showSelectBody
}

</script>

<style scoped>
.select {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 0 15px;
    outline: 0;
    font-weight: 400;
    font-size: 14px;
    /* border: 2px solid #ddd; */
    width: 100%;
    margin-top: 5px;
    line-height: 50px;
    height: 50px;
    border-radius: 5px;
    color: #999;
}
</style>