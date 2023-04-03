<template>
  <div class="p-[20px]">
    <Box>
        <div class="w-full h-full grid grid-cols-3 items-center gap-2">
            <Input class="col-span-1" placeholder="Search by category type" />
            <Input class="col-span-1" placeholder="Search by category type" />
            <Input class="col-span-1" placeholder="Search by category type" />
            <!-- <Select class="col-span-2" :placeholder="'Select Category'" :options="options"/>
            <Button @click="handleAddCategory" class="col-span-1 w-full" :color="'primary'" :label="'Add Category'" /> -->
        </div>
    </Box>
    <Table :column-templates="tableSizeColumns" :head="tableHead">
      <TableRow v-for="order in orders" :key="order._id" :column-templates="tableSizeColumns" :height="'50px'">
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
        <!-- <TableRow v-for="(category, id) in categories" :key="id" :column-templates="tableSizeColumns" :max-height="'50px'" :height="'70px'">
            <TableColumn :align="'center'">
                {{ categoryid(category._id) }}
            </TableColumn>
            <TableColumn :image="true" :src-img="category.image" :align="'center'" />
            <TableColumn>
                {{ category.name }}
            </TableColumn>
            <TableColumn :align="'center'">
                {{ category.parent ? category.parent.name : '-' }}
            </TableColumn>
            <TableColumn>
                {{ formatDate(category.createdAt) }}
            </TableColumn>
            <TableColumn :align="'center'">
                <div class="flex items-center justify-center  gap-2">
                    <IconPencil @click="handleUpdateCategory(category)" class="text-[#16bcdc] cursor-pointer" />
                    <IconDelete @click="() => handleDeleteCategory(category._id)" class="text-[red] cursor-pointer" />
                </div>
            </TableColumn>
        </TableRow> -->
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
import { reactive } from 'vue';
import { OrderStore } from '~~/store/orderStore';
import { storeToRefs } from 'pinia';
import IconPlus from '~icons/mdi/magnify-plus'
import Box from '~~/components/Box.vue';
import Select from '~~/components/UI/Select/Select.vue'
import Input from '~~/components/UI/Input/Input.vue';
import Button from '~~/components/UI/Button/Button.vue';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Pagination from '~~/components/Pagination/Pagination.vue'
import StatusBage from '~~/components/UI/StatusBage.vue';
import orderStatusTypes from '~~/types/orderStatusTypes';


const tableSizeColumns = '70px 1fr 2fr 1fr 1fr 1fr 1fr 150px 1fr'
const tableHead = ['ID', 'Time',	'Shipping Address',	'Phone',	'Method',	'Amount',	'Status',	'Action',	'Invoice']

// Orders Store
const { fetchOrders, changeOrderStatus } = OrderStore()
const { orders } = storeToRefs(OrderStore())

// Change Order Status
const handleChangeOrderStatus = (e, id) => {
  changeOrderStatus(id, e.target.value)
}

onBeforeMount(() => {
  fetchOrders()
  console.log(orders.value)
})
</script>

<style>

</style>