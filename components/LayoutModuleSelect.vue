<template>
    <div class="w-full h-auto flex items-center gap-0">
        <Select :options="modules" class="!h-[40px]" @get-active-item="handleSelectItem"/>
        <div @click="handleAddItem" class="w-[40px] h-[40px] flex items-center justify-center rounded-md bg-cyan-400 text-white text-[20px] cursor-pointer">
            <IconPlus />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectInput from './UI/SelectInput/SelectInput.vue';
import Select from './UI/Select/Select.vue'
import IconPlus from '~icons/mdi/plus'

const activeValue = ref(undefined)

const props = defineProps(['modules'])
const emits = defineEmits(['get-value'])

const handleSelectItem = (value) => {
    activeValue.value = value
}

const handleAddItem = () => {
    if(activeValue.value) {
        emits('get-value', activeValue.value)
    }
}
</script>

<style>

</style>