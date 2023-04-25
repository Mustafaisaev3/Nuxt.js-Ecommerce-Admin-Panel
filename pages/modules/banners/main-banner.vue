<template>
    <div class="h-full p-[20px] overflow-y-scroll">
        <div class="product-page-header flex items-center justify-between">
            <div class="product-page-title text-[30px]">
                Banners
            </div>
            <div class="flex gap-4">
                <button @click="openingModal" class="w-auto h-[40px] bg-[#16bcdc] rounded-md p-2 text-white flex items-center gap-1"><IconPlus />Add Product</button>
            </div>
        </div>
        <Table :head="tableHeads" :column-templates="tableSizeColumns">
            <TableRow 
                :column-templates="tableSizeColumns"
            >
                <TableColumn>
                    <span class="text-[#16bcdc] pl-2">Main Slider</span>
                </TableColumn>
                <TableColumn :align="'center'">
                    <div class="w-full flex items-center justify-center">
                        Active
                    </div>
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="handleAddMainSlider" class="text-[#16bcdc] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
            <TableRow 
                :column-templates="tableSizeColumns"
            >
                <TableColumn>
                    <span class="text-[#16bcdc] pl-2">Banner Grid</span>
                </TableColumn>
                <TableColumn :align="'center'">
                    <div class="w-full flex items-center justify-center">
                        Active
                    </div>
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="handleAddMainBannerGrid" class="text-[#16bcdc] cursor-pointer" />
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
const { fetchMainBanner } = ModulesStore()

// Table grid settings
const tableHeads = ['banner name', 'status', 'actions']
const tableSizeColumns = '1.5fr 1fr 100px'

// Handle Add Main Slider
const handleAddMainSlider = () => {
    setModalView(ModalViewsType.HOME_MAIN_SLIDER_VIEW)
    openModal()
}

// Handle Add Main Banner Grid
const handleAddMainBannerGrid = () => {
    setModalView(ModalViewsType.HOME_MAIN_BANNER_GRID_VIEW)
    openModal()
}

onBeforeMount(() => {
    fetchMainBanner()
})
</script>

<style>

</style>