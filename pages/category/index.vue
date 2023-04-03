<template>
  <div class="p-[20px]">
    <Box>
        <div class="w-full h-full grid grid-cols-5 items-center gap-2">
            <Input class="col-span-2" placeholder="Search by category type" />
            <Select class="col-span-2" :placeholder="'Select Category'" :options="options"/>
            <Button @click="handleAddCategory" class="col-span-1 w-full" :color="'primary'" :label="'Add Category'" />
        </div>
    </Box>
    <Table :column-templates="tableSizeColumns" :head="tableHead">
        <TableRow v-for="(category, id) in categories" :key="id" :column-templates="tableSizeColumns" :max-height="'50px'" :height="'70px'">
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
                <div class="w-full flex items-center justify-center  gap-2">
                    <IconPencil @click="handleUpdateCategory(category)" class="text-[#16bcdc] cursor-pointer" />
                    <IconDelete @click="() => handleDeleteCategory(category._id, category.name)" class="text-[red] cursor-pointer" />
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
import { onBeforeMount } from 'vue';
import { useUi } from '~~/store/uiStore';
import { storeToRefs } from 'pinia';
import { CategoryStore } from '~~/store/categoryStore'
import { ModalViewsType } from '~~/types/modalViewTypes';
import Box from '~~/components/Box.vue';
import Select from '~~/components/UI/Select/Select.vue'
import Input from '~~/components/UI/Input/Input.vue';
import Button from '~~/components/UI/Button/Button.vue';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Pagination from '~~/components/Pagination/Pagination.vue'


// icons
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'
import IconPlus from '~icons/mdi/plus'

const tableSizeColumns = '70px 100px 2fr 1fr 1fr 100px'
const tableHead = ['ID', 'icon', 'name', 'parent', 'published', 'actions']

// Modal
const {setModalView, openModal, setModalData, openConfirmationModal, setConfirmationModalData} = useUi()
const handleAddCategory = () => {
    setModalView(ModalViewsType.CATEGORY_ADD_VIEW)
    openModal()
}

// Categories
const { fetchCategories, deleteCategory } = CategoryStore()
const { categories, loading } = storeToRefs(CategoryStore())

const categoryid = (id) => {
    return id.slice(id.length - 4,id.length)
}

const formatDate = (dateStr) => {
    const date =  new Date(dateStr)
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}

// Delete Category
const handleDeleteCategory = (id, name) => {
    openConfirmationModal({question: `Delete ${name} category?`, callback: () => deleteCategory(id)})
}

// Update Category
const handleUpdateCategory = (category) => {
    setModalView(ModalViewsType.CATEGORY_UPDATE_VIEW)
    setModalData(category)
    openModal()
}

onBeforeMount(() => {
    fetchCategories()
})

const options = [
    {title: 'Fruits', key: 1},
    {title: 'Aggs', key: 2},
    {title: 'Vegetables', key: 3},
]
</script>

<style>

</style>