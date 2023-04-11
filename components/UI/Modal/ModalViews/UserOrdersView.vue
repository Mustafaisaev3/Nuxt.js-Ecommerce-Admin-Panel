<template>
  <div class="min-w-[900px] h-[700px] p-[20px] flex flex-col">
    <header>User Orders</header>
    <div class="h-full flex-1 flex gap-4 py-2 relative">
        <div class="w-[900px] h-full flex flex-col border rounded-md p-4 overflow-hidden overflow-x-scroll">
            <Table :column-templates="tableSizeColumns" :head="tableHead" class="w-[1500px] ">
                <TableRow v-for="order in custumerOrders" :key="order._id" :column-templates="tableSizeColumns" :height="'50px'">
                    <TableColumn>
                    {{ order._id }}
                    </TableColumn>
                    <TableColumn >
                    April, 36
                    </TableColumn>
                    <TableColumn >
                    {{ order.address }}
                    </TableColumn>
                    <TableColumn >
                    {{ order.phone }}
                    </TableColumn>
                    <TableColumn >
                    COD
                    </TableColumn>
                    <TableColumn >
                    $67.00
                    </TableColumn>
                    <TableColumn :align="'center'">
                    <StatusBage :status="order.orderStatus" />
                    </TableColumn>
                    <TableColumn :overflow="'visible'">
                    <!-- <Select :placeholder="'status'" :options="[{title: 'pending', key: 1}, {title: 'cancel', key: 2}]" /> -->
                    <select name="hello" id="" class="w-full border-[1px] border-[#e5e5e5] rounded-md px-1" @change="(e) => handleChangeOrderStatus(e, order._id)">
                        <option class="hidden" :value="order.orderStatus">{{ order.orderStatus }}</option>
                        <option v-for="status in orderStatusTypes" :key="status" :value="status">{{ status }}</option>
                    </select>
                    </TableColumn>
                    <TableColumn :align="'center'" >
                    <IconPlus class="text-[18px] hover:text-[#00b7ff] cursor-pointer" />
                    </TableColumn>
                </TableRow>
            </Table>
        </div>
        <!-- <div v-show="showList" class="w-full h-full absolute left-0 top-0 bg-yellow-700">
            <Button @click="showList = false" :label="'Close List'" :color="'danger'" />
        </div> -->
    </div>
    <footer class=" flex items-center justify-end gap-2">
        <Button @click="closeModal" :label="'Close'" :color="'danger'" />
    </footer> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUi } from '~~/store/uiStore';
import { CustumerStore } from '~~/store/custumerStore';
import Button from '../../Button/Button.vue'
import Table from '../../Table/Table.vue';
import TableRow from '../../Table/TableRow.vue';
import TableColumn from '../../Table/TableColumn.vue';
import StatusBage from '../../StatusBage.vue';
import orderStatusTypes from '~~/types/orderStatusTypes';

const tableSizeColumns = '70px 1fr 2fr 1fr 1fr 1fr 1fr 150px 1fr'
const tableHead = ['ID', 'Time', 'Shipping Address', 'Phone', 'Method', 'Amount', 'Status', 'Action', 'Invoice']

const showList = ref(false)

// UI Store
const { closeModal } = useUi()
const { modalData } = storeToRefs(useUi()) 

// Custumer Store
const { fetchCustumerOrders } = CustumerStore()
const { custumerOrders } = storeToRefs(CustumerStore()) 

onBeforeMount(() => {
    fetchCustumerOrders(modalData.value)
    console.log(modalData.value)
})

</script>

<style>

</style>