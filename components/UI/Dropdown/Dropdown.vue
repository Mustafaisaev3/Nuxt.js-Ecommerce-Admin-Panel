<template>
    <div ref="dropdownContainer" class="relative cursor-pointer" @click="toggleDropdown">
        <div class="dropdown-header w-auto h-[100%] flex items-center justify-between gap-4 p-[10px]" :class="{'border': bordered}">
            <!-- <slot></slot> -->
            {{ activeValue.value }}
            <IconRight v-if="data" :class="{active: active}"/>
        </div>
        <ul v-show="active" class="absolute top-[100%] left-0 w-full h-auto flex flex-col rounded-md gap-2 px-[10px] py-[10px] mt-2 bg-[#e8e8e8] z-10">
            <li v-for="item in data" :key="item" class="cursor-pointer" @click="getSelectedValue(item)">
                <div class="flex items-center gap-2 hover:text-[#16bcdc]">
                    <div class="text-[15px]">{{ item.title }}</div>
                </div>
            </li>
            <slot name="dropdown-content"></slot>
        </ul>
    </div>
</template>

<script setup>
    import IconRight from '~icons/mdi/chevron-right'
    import { ref } from 'vue'

    const emits = defineEmits(['get-selected-value'])
    
    const props = defineProps({
        data: Array,
        bordered: {
            type: Boolean,
            required: false
        },
        value: {
            type: String,
            required: false
        }
    })


    let active = ref(false)
    let activeValue = ref(props.value ? props.value : props.data[0])

    const dropdownContainer = ref(null)
    useClickOutside(dropdownContainer, () => {
        active.value = false
    })

    const toggleDropdown = () => {
        console.log(props.data)
        active.value = !active.value
    }

    const getSelectedValue = (value) => {
        activeValue.value = value
        emits('get-selected-value', activeValue)
    }
</script>

<style scoped>
.active {
    transform: rotate(90deg);
}

.dropdown-header.border{
    border: 1px solid #e5e5e5;
    border-radius: 5px;
}
</style>