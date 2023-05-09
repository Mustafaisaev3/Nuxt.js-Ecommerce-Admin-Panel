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
                    Home page Main Banner
                </TableColumn>
                <TableColumn>
                    Active
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <NuxtLink :to="'/modules/banners/main-banner'">
                            <IconPencil @click="() => handleUpdateProduct(product)" class="text-[#16bcdc] cursor-pointer" />
                        </NuxtLink>
                    </div>
                </TableColumn>
            </TableRow>
            <TableRow 
                :column-templates="tableSizeColumns"
            >
                <TableColumn>
                    Popular Categories Banner
                </TableColumn>
                <TableColumn>
                    Active
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="() => handleUpdatePopularCategoriesBanner()" class="text-[#16bcdc] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
            <TableRow 
                :column-templates="tableSizeColumns"
            >
                <TableColumn>
                    Triple Banner
                </TableColumn>
                <TableColumn>
                    Active
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="() => handleUpdateTripleBanner()" class="text-[#16bcdc] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
            <TableRow 
                :column-templates="tableSizeColumns"
            >
                <TableColumn>
                    Brands Banner
                </TableColumn>
                <TableColumn>
                    Active
                </TableColumn>
                <TableColumn>
                    <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="() => handleUpdateBrands()" class="text-[#16bcdc] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
        </Table>
    </div>
</template>

<script setup>
import { useUi } from '~~/store/uiStore';
import { ModalViewsType } from '~~/types/modalViewTypes';
import { storeToRefs } from 'pinia';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Dropdown from '~~/components/UI/Dropdown/Dropdown.vue';

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'

// Table grid settings
const tableHeads = ['banner name', 'status', 'actions']
const tableSizeColumns = '1.5fr 1fr 100px'

// UI Store
const { openModal, setModalView, setModalData, addNotification } = useUi()
const { modalView } = storeToRefs(useUi())

// Popular Categories Banner
const handleUpdatePopularCategoriesBanner = () => {
    setModalView(ModalViewsType.POPULAR_CATEGORIES_UPDATE_VIEW)
    openModal()
}

// Popular Categories Banner
const handleUpdateTripleBanner = () => {
    setModalView(ModalViewsType.TRIPLE_BANNER_UPDATE_VIEW)
    openModal()
}

// Brands Banner
const handleUpdateBrands = () => {
    setModalView(ModalViewsType.BRANDS_UPDATE_VIEW)
    openModal()
}

</script>

<style>

</style>