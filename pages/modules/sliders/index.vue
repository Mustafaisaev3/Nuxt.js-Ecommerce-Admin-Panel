<template>
    <div class="h-full p-[20px] overflow-y-scroll">
        <div class="product-page-header flex items-center justify-between">
            <div class="product-page-title text-[30px]">
                Sliders
            </div>
            <div class="flex gap-4">
                <button @click="handleAddSlider" class="w-auto h-[40px] bg-[#16bcdc] rounded-md p-2 text-white flex items-center gap-1"><IconPlus />Add Slider</button>
            </div>
        </div>
        <Table :head="tableHeads" :column-templates="tableSizeColumns">
            <TableRow 
                :column-templates="tableSizeColumns"
            >
                <TableColumn>
                    <span class="pl-2">Blog Slider</span>
                </TableColumn>
                <TableColumn :align="'center'">
                    <div class="w-full flex items-center justify-center">
                        active
                    </div>
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="handleUpdateBlogSlider" class="text-[#16bcdc] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
            <TableRow 
                :column-templates="tableSizeColumns"
                v-for="slider in sliders"
                :key="slider._id"
            >
                <TableColumn>
                    <span class="text-[#16bcdc] pl-2">{{ slider.name }}</span>
                </TableColumn>
                <TableColumn :align="'center'">
                    <div class="w-full flex items-center justify-center">
                        {{ slider.status }}
                    </div>
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="() => handleUpdateSlider(slider)" class="text-[#16bcdc] cursor-pointer" />
                        <IconDelete @click="() => handleDeleteSlider(slider._id)" class="text-[red] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
        </Table>
    </div>
</template>

<script setup>
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Dropdown from '~~/components/UI/Dropdown/Dropdown.vue';
import { ModalViewsType } from '~~/types/modalViewTypes';
import { storeToRefs } from 'pinia';
import { useUi } from '~~/store/uiStore';
import { ModulesStore } from '~~/store/modulesStore';

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'

// UI Store
const { openModal, setModalView, setModalData, addNotification } = useUi()
const { modalView } = storeToRefs(useUi())

// Modules Store
const { fetchMainBanner, fetchSliders, deleteSlider, fetchBlogSlider } = ModulesStore()
const { sliders, blog_slider } = storeToRefs(ModulesStore())

// Table grid settings
const tableHeads = ['slider name', 'status', 'actions']
const tableSizeColumns = '1.5fr 1fr 100px'

// Handle Add Slider
const handleAddSlider = () => {
    setModalView(ModalViewsType.SLIDER_ADD_VIEW)
    openModal()
}

// Handle Update Slider
const handleUpdateSlider = (item) => {
    setModalData(item)
    setModalView(ModalViewsType.SLIDER_UPDATE_VIEW)
    openModal()
}

// Handle Update Blog Slider
const handleUpdateBlogSlider = () => {
    setModalData(blog_slider)
    setModalView(ModalViewsType.BLOG_SLIDER_UPDATE_VIEW)
    openModal()
}

// Handle Delete Slider
const handleDeleteSlider = (id) => {
    deleteSlider(id)
}


onBeforeMount(() => {
    fetchMainBanner()
    fetchSliders()
    fetchBlogSlider()
})
</script>

<style>

</style>