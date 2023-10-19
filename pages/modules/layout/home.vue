<template>
    <div class="h-full p-[20px] overflow-y-scroll">
        <div class="product-page-header flex items-center justify-between">
            <div class="product-page-title text-[30px]">
                Home Layout
            </div>
            <div class="flex gap-4">
                <!-- <button @click="handleSavePageLayout" class="w-[100px] h-[40px] bg-[#16bcdc] rounded-md p-2 text-white flex items-center justify-center">Save</button> -->
                <Button @click="handleSavePageLayout" :color="'primary'" :label="'Save'" />
                <Button @click="hello" :color="'primary'" :label="'hello'" />
            </div>
        </div>
        <div class="w-full h-auto grid grid-cols-8 gap-3 pt-5">
            <div class="col-span-2 flex flex-col gap-1">
                <div class="text-[20px] text-[#16bcdc] w-full text-center">Left column</div>
                <div class="w-full h-full rounded-md border-[2px] p-2 overflow-hidden flex flex-col">
                    <div class="w-full h-auto rounded-sm flex items-center justify-end pb-2">
                        <LayoutModuleSelect :modules="all_modules" @get-value="handleAddToLeftColumn" />
                        <!-- <div class="bg-[#16bcdc] p-2 text-center" @click="() => handleAddToLeftColumn('hello')">Add</div> -->
                    </div>
                    <ul class="w-full h-full flex flex-col gap-2 flex-1 overflow-y-scroll">
                        <li v-for="(item, id) in pageLayout.left" :key="id" class="w-full h-[40px] p-[10px] border-[1px] rounded-sm flex items-center justify-between">
                            <div>{{ item.title || item.name }}</div>
                            <IconClose @click="() => handleRemoveItemFromPageLayout('left', item._id)" class="text-[red] cursor-pointer"/>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-span-4 flex flex-col gap-1 h-full">
                <div>
                    <div class="text-[20px] text-[#16bcdc] w-full text-center">Top page</div>
                    <div class="w-full h-[300px] rounded-md border-[2px] p-2 overflow-hidden flex flex-col">
                        <div class="w-full h-auto rounded-sm flex items-center justify-end pb-2">
                            <LayoutModuleSelect :modules="all_modules" @get-value="handleAddToTop" />
                            <!-- <div class="bg-[#16bcdc] p-2 text-center" @click="() => handleAddToLeftColumn('hello')">Add</div> -->
                        </div>
                        <ul class="w-full h-full flex flex-col gap-2 flex-1 overflow-y-scroll">
                            <li v-for="(item, id) in pageLayout.top" :key="id" class="w-full h-[40px] p-[10px] border-[1px] rounded-sm flex items-center justify-between">
                                <div>{{ item.title || item.name }}</div>
                                <IconClose @click="() => handleRemoveItemFromPageLayout('top', item._id)" class="text-[red] cursor-pointer"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="text-[20px] text-[#16bcdc] w-full text-center">Bottom Page</div>
                    <div class="w-full h-[300px] rounded-md border-[2px] p-2 overflow-hidden flex flex-col">
                        <div class="w-full h-auto rounded-sm flex items-center justify-end pb-2">
                            <LayoutModuleSelect :modules="all_modules" @get-value="handleAddToBottom" />
                            <!-- <div class="bg-[#16bcdc] p-2 text-center" @click="() => handleAddToLeftColumn('hello')">Add</div> -->
                        </div>
                        <ul class="w-full h-full flex flex-col gap-2 flex-1 overflow-y-scroll">
                            <li v-for="(item, id) in pageLayout.bottom" :key="id" class="w-full h-[40px] p-[10px] border-[1px] rounded-sm flex items-center justify-between">
                                <div>{{ item.title || item.name }}</div>
                                <IconClose @click="() => handleRemoveItemFromPageLayout('bottom', item._id)" class="text-[red] cursor-pointer"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-span-2 flex flex-col gap-1">
                <div class="text-[20px] text-[#16bcdc] w-full text-center">Right column</div>
                <div class="w-full h-full rounded-md border-[2px] p-2 overflow-hidden flex flex-col">
                    <div class="w-full h-auto rounded-sm flex items-center justify-end pb-2">
                        <LayoutModuleSelect :modules="all_modules" @get-value="handleAddToRightColumn" />
                        <!-- <div class="bg-[#16bcdc] p-2 text-center" @click="() => handleAddToLeftColumn('hello')">Add</div> -->
                    </div>
                    <ul class="w-full h-full flex flex-col gap-2 flex-1 overflow-y-scroll">
                        <li v-for="(item, id) in pageLayout.right" :key="id" class="w-full h-[40px] p-[10px] border-[1px] rounded-sm flex items-center justify-between">
                            <div>{{ item.title || item.name }}</div>
                            <IconClose @click="() => handleRemoveItemFromPageLayout('right', item._id)" class="text-[red] cursor-pointer"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { ModulesStore } from '~~/store/modulesStore';
import PagesTypes from '@/types/pagesTypes'
import LayoutModuleSelectVue from '~~/components/LayoutModuleSelect.vue';
import Button from '~~/components/UI/Button/Button.vue';
import IconClose from '~icons/mdi/close'

// Modules Store
const { createPageLayout, fetchPageLayout } = ModulesStore()
const { all_modules, page_layout, loading } = storeToRefs(ModulesStore())

let pageLayout = ref({
        name: PagesTypes.HOME,
        left: [],
        right: [],
        top: [],
        bottom: [],
    })

// Add to Left Column
const handleAddToLeftColumn = (module) => {
    pageLayout.value.left.push(module)
}

// Add to Right Column
const handleAddToRightColumn = (module) => {
    pageLayout.value.right.push(module)
}

// Add to Top
const handleAddToTop = (module) => {
    pageLayout.value.top.push(module)
}

// Add to Bottom
const handleAddToBottom = (module) => {
    pageLayout.value.bottom.push(module)
}

// Remove Item from page Layout
const handleRemoveItemFromPageLayout = (side, id) => {
    const filterdModulesArr = pageLayout.value[side].filter(item => {
        return item._id != id
    })

    pageLayout.value[side] = filterdModulesArr
}

// Save Page layout
const handleSavePageLayout = () => {
    createPageLayout(pageLayout.value)
}

const hello = () => {
    console.log(page_layout.value)
    console.log(pageLayout.value)
}

onBeforeMount(async () => {
    await fetchPageLayout(PagesTypes.HOME)
    if(page_layout.value.name){
        pageLayout.value = page_layout.value
    }
})

</script>

<style>

</style>