<template>
  <div class="p-[20px]">
    <Box>
        <div class="w-full h-full grid grid-cols-5 items-center gap-2">
            <Select class="col-span-2" :placeholder="'Select Category'" :options="options"/>
            <Input class="col-span-2" placeholder="Search by category type" />
            <Button class="col-span-1 w-full" :color="'primary'" :label="'Add Category'" />
        </div>
    </Box>
    <Table :column-templates="tableSizeColumns" :head="tableHead">
        <TableRow :column-templates="tableSizeColumns">
            <TableColumn>
                ID
            </TableColumn>
            <TableColumn>
                icon
            </TableColumn>
            <TableColumn>
                name
            </TableColumn>
            <TableColumn>
                published
            </TableColumn>
            <TableColumn>
                actions
            </TableColumn>
        </TableRow>
    </Table>
  </div>
</template>

<script setup>
import Box from '~~/components/Box.vue';
import Select from '~~/components/UI/Select/Select.vue'
import Input from '~~/components/UI/Input/Input.vue';
import Button from '~~/components/UI/Button/Button.vue';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';

const tableSizeColumns = '70px 100px 1fr 2fr 70px 70px'
const tableHead = ['ID', 'icon', 'name', 'published', 'actions']

const options = [
    {title: 'Fruits', key: 1},
    {title: 'Aggs', key: 2},
    {title: 'Vegetables', key: 3},
]
</script>

<style>

</style>