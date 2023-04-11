<template>
  <div class="p-[20px]">
    <Box>
        <Input placeholder="Search by name/email/phone" />
    </Box>
    <Table :column-templates="tableSizeColumns" :head="tableHead">
        <TableRow v-for="(custumer, id) in custumers" :key="id" :column-templates="tableSizeColumns" :max-height="'50px'" :height="'70px'">
            <TableColumn :align="'center'">
                {{ custumer._id }}
            </TableColumn>
            <TableColumn>
                {{ custumer.createdAt }}
            </TableColumn>
            <TableColumn :align="'center'">
                {{ custumer.name }}
            </TableColumn>
            <TableColumn :align="'center'">
                {{ custumer.email }}
            </TableColumn>
            <TableColumn :align="'center'">
                {{ custumer.phone ? custumer.phone : '-' }}
            </TableColumn>
            <TableColumn :align="'center'">
                <div class="w-full flex items-center justify-center  gap-2">
                    <IconOrders @click="() => handleUserOrdersList(custumer._id)" class="text-[17px] hover:text-[#00b7ff] cursor-pointer" />
                    <!-- <IconDelete @click="() => handleDeleteCategory(category._id, category.name)" class="text-[red] cursor-pointer" /> -->
                </div>
            </TableColumn>
        </TableRow>
        <TableRow :column-templates="'1fr'">
            <div class="w-full flex justify-between p-2">
                <div>SHOWING 1-2 OF 2</div>
                <Pagination></Pagination>
            </div>
        </TableRow>
    </Table>
  </div>
</template>

<script setup>
import { CustumerStore } from '~~/store/custumerStore';
import { useUi } from '~~/store/uiStore';
import { storeToRefs } from 'pinia';
import { ModalViewsType } from '~~/types/modalViewTypes';
import Box from '~~/components/Box.vue';
import Input from '~~/components/UI/Input/Input.vue';
import Button from '~~/components/UI/Button/Button.vue';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Pagination from '~~/components/Pagination/Pagination.vue'

// Icons
import IconDelete from '~icons/mdi/delete'
import IconPlus from '~icons/mdi/magnify-plus'
import IconOrders from '~icons/mdi/order-bool-descending-variant'


const tableSizeColumns = '70px 250px 2fr 2fr 1fr 200px'
const tableHead = ['ID', 'joining date', 'name', 'email', 'phone', 'actions']

// Custumer Store
const { fetchCustumers } = CustumerStore()
const { custumers } = storeToRefs(CustumerStore())

// UI Store
const { openModal, setModalView, setModalData } = useUi()

const handleUserOrdersList = (userId) => {
    setModalData(userId)
    setModalView(ModalViewsType.USER_ORDERS_VIEW)
    openModal()
}

onBeforeMount(() => {
    fetchCustumers()
})

</script>

<style>

</style>