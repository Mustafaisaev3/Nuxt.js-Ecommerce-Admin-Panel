<template>
    <div class="relative" @click="toggleDropdown">
        <li>
            <a href="#" class="flex items-center justify-between hover:text-[#16bcdc]">
                <slot></slot>
                <IconRight v-if="data" :class="{active: active}" class="mr-4"/>
            </a>
        </li>
        <ul v-show="active" class="w-full h-auto flex flex-col gap-2 pl-[30px] py-[10px]  mt-2 bg-[#e8e8e8]">
            <li v-for="item in data" :key="item" class="cursor-pointer">
                <NuxtLink :to="item.link">
                    <div class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="text-[15px]">{{ item.title }}</div>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import IconRight from '~icons/mdi/chevron-right'
    import { ref } from 'vue'

    let active = ref(false)

    const props = defineProps({
        data: Array,
    })

    const toggleDropdown = () => {
        active.value = !active.value
    }
</script>

<style scoped>
.active {
    transform: rotate(90deg);
}
</style>