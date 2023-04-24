<template>
  <div class="h-full p-[20px] overflow-y-scroll">
    <div class="product-page-header flex items-center justify-between">
        <div class="product-page-title text-[30px]">
            Blog Categories
        </div>
        <div class="flex gap-4">
            <div class="flex items-center gap-2">
                <div>Show:</div>
                <Dropdown
                    :bordered="true"
                    :data="[{title:'10'},{title:'20'},{title:'30'},{title:'40'}]"
                >
                    <div class="leading-3"></div>
                </Dropdown>
            </div>
            <button @click="openingModal" class="w-auto h-[40px] bg-[#16bcdc] rounded-md p-2 text-white flex items-center gap-1"><IconPlus />Add Category</button>
        </div>
    </div>
    <Table :head="tableHeads" :column-templates="tableSizeColumns">
        <TableRow 
            v-for="category in blogCategories"
            :key="category._id"
            :column-templates="tableSizeColumns"
        >
            <TableColumn>
                {{ category._id }}
            </TableColumn>
            <TableColumn>
                {{ category.name }}
            </TableColumn>
            <TableColumn :align="'center'">
                <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                <div class="w-full flex items-center justify-center  gap-2">
                    <IconPencil @click="() => handleUpdateBlogCategory(category)" class="text-[#16bcdc] cursor-pointer" />
                    <IconDelete @click="() => handleDeleteBlogCategory(category._id)" class="text-[red] cursor-pointer" />
                </div>
            </TableColumn>
        </TableRow>
    </Table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Dropdown from '~~/components/UI/Dropdown/Dropdown.vue';
import { ModalViewsType } from '~~/types/modalViewTypes';
import { BlogStore } from '~~/store/blogStore';

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'

// UI Store
import { useUi } from '~~/store/uiStore';
const { openModal, setModalView, setModalData, addNotification } = useUi()
const { modalView } = storeToRefs(useUi())

// Table grid settings
const tableHeads = ['id', 'name', 'actions']
const tableSizeColumns = '100px 1fr 300px'

// Blog Categories Store
const { fetchBlogCategories, deleteBlogCategory } = BlogStore()
const { blogCategories } = storeToRefs(BlogStore())


const openingModal = () => {
  setModalView(ModalViewsType.BLOG_CATEGORY_ADD_VIEW)
  openModal()
}

// Update Blog Category
const handleUpdateBlogCategory = (category) => {
  setModalView(ModalViewsType.BLOG_CATEGORY_UPDATE_VIEW)
  setModalData(category)
  openModal()
}

// Delete Blog Category
const handleDeleteBlogCategory = (id) => {
  deleteBlogCategory(id)
}

onBeforeMount(() => {
  fetchBlogCategories()
})

</script>

<style>

</style>