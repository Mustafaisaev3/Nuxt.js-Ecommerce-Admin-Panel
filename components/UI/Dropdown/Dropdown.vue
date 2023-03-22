<template>
    <div ref="dropdownContainer" class="relative cursor-pointer" @click="toggleDropdown">
        <div class="dropdown-header w-auto h-[100%] flex items-center gap-4 p-[10px]" :class="{'border': bordered}">
            <slot></slot>
            <IconRight v-if="data" :class="{active: active}"/>
        </div>
        <ul v-show="active" class="absolute top-[100%] left-0 w-full h-auto flex flex-col rounded-md gap-2 px-[10px] py-[10px] mt-2 bg-[#e8e8e8] z-10">
            <li v-for="item in data" :key="item" class="cursor-pointer">
                <NuxtLink :to="item.link">
                    <div class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="text-[15px]">{{ item.title }}</div>
                    </div>
                </NuxtLink>
            </li>
            <slot name="dropdown-content"></slot>
        </ul>
    </div>
</template>

<script setup>
    import IconRight from '~icons/mdi/chevron-right'
    import { ref } from 'vue'

    let active = ref(false)

    const dropdownContainer = ref(null)
    useClickOutside(dropdownContainer, () => {
        active.value = false
    })

    const props = defineProps({
        data: Array,
        bordered: {
            type: Boolean,
            required: false
        }
    })

    const toggleDropdown = () => {
        active.value = !active.value
    }
</script>

<style scoped>
.active {
    transform: rotate(90deg);
}

.dropdown-header.border{
    border: 2px solid #EEEFF4;
    border-radius: 10px;
}
</style>