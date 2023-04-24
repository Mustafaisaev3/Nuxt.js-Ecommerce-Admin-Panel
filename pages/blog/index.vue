<template>
    <div class="p-[20px]">
        <Box>
            <div class="w-full h-full grid grid-cols-5 items-center gap-2">
                <Input class="col-span-2" placeholder="Search by category type" />
                <Button @click="handleAddPostModal" class="col-span-1 col-start-5 w-full" :color="'primary'" :label="'Add Post'" />
            </div>
        </Box>
        <Table :column-templates="tableSizeColumns" :head="tableHead">
            <TableRow v-for="post in posts" :key="post._id" :column-templates="tableSizeColumns" :max-height="'50px'" :height="'70px'">
                <TableColumn :align="'center'">
                    {{ post._id }}
                </TableColumn>
                <TableColumn :image="true" :src-img="post.image" :align="'center'" class="max-h-[50px]" />
                <TableColumn>
                    {{ post.title }}
                </TableColumn>
                <TableColumn>
                    {{ post.description}}
                </TableColumn>
                <TableColumn>
                    {{ post.createdAt }}
                </TableColumn>
                <TableColumn :align="'center'">
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPencil @click="handleUpdateBlogPost(post)" class="text-[#16bcdc] cursor-pointer" />
                        <IconDelete @click="() => handleDeleteBlogPost(post._id)" class="text-[red] cursor-pointer" />
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
import { storeToRefs } from 'pinia';
import Box from '~~/components/Box.vue';
import Input from '~~/components/UI/Input/Input.vue';
import Select from '~~/components/UI/Select/Select.vue';
import Button from '~~/components/UI/Button/Button.vue';
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Pagination from '~~/components/Pagination/Pagination.vue'
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

const tableSizeColumns = '70px 100px 1fr 2fr 1fr 100px'
const tableHead = ['ID', 'image', 'title', 'description', 'published', 'actions']

// Blog Store
const { fetchBlogPosts, deleteBlogPost } = BlogStore()
const { posts } = storeToRefs(BlogStore())

const handleAddPostModal = () => {
  setModalView(ModalViewsType.BLOG_POST_ADD_VIEW)
  openModal()
}

// Update Blog Post
const handleUpdateBlogPost = (post) => {
  setModalView(ModalViewsType.BLOG_POST_UPDATE_VIEW)
  setModalData(post)
  openModal()
}

// Delete Blog Post
const handleDeleteBlogPost = (id) => {
    deleteBlogPost(id)
}

onBeforeMount(() => {
    fetchBlogPosts()
})

</script>

<style>

</style>