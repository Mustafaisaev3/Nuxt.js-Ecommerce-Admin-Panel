<template>
  <div class="h-full p-[20px] overflow-y-scroll">
    <div class="product-page-header flex items-center justify-between">
        <div class="product-page-title text-[30px]">
            Options
        </div>
        <div class="flex gap-4">
            <button @click="openingModal" class="w-auto h-[40px] bg-[#16bcdc] rounded-md p-2 text-white flex items-center gap-1"><IconPlus />Add Option</button>
        </div>
    </div>
    <Table :head="tableHeads" :column-templates="tableSizeColumns">
        <TableRow 
            v-for="option in options"
            :key="option._id"
            :column-templates="tableSizeColumns"
        >
            <TableColumn>
                {{ option._id }}
            </TableColumn>
            <TableColumn>
                {{ option.title }}
            </TableColumn>
            <!-- <TableColumn :src-img="option.images[0]" :image="true" /> -->
            <TableColumn>
                <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                <div class="flex items-center justify-center  gap-2">
                    <IconPencil @click="() => handleUpdateOptions(option)" class="text-[#16bcdc] cursor-pointer" />
                    <IconDelete @click="() => handleDeleteProduct(option._id)" class="text-[red] cursor-pointer" />
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
import { OptionStore } from '~~/store/optionStore'
import { useUi } from '~~/store/uiStore';
import { storeToRefs } from 'pinia';

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'

// Table grid settings
const tableHeads = ['id', 'title', 'actions']
const tableSizeColumns = '100px 1fr 200px'

// UI Store
const { openModal, setModalView, setModalData, addNotification } = useUi()
const { modalView } = storeToRefs(useUi())

// Options Store
const { fetchOptions } = OptionStore()
const { options } = storeToRefs(OptionStore())

const openingModal = () => {
    setModalView(ModalViewsType.OPTION_ADD_VIEW)
    openModal()
    // addNotification({type: notificationTypes.SUCCESS, text: 'Success notification'})
}

// Update Product
const handleUpdateOptions = (options) => {
    setModalView(ModalViewsType.OPTION_UPDATE_VIEW)
    setModalData(options)
    openModal()
}

// Delete Product
const handleDeleteProduct = (id) => {
    deleteProduct(id)
}

onBeforeMount(() => {
    fetchOptions()
    // console.log(products)
})

</script>

<style>

</style>