<template>
  <div class="h-full p-[20px] overflow-y-scroll">
    <div class="product-page-header flex items-center justify-between">
        <div class="product-page-title text-[30px]">
            Products
        </div>
        <div class="flex gap-4">
            <div class="flex items-center gap-2">
                <div>Show:</div>
                <!-- <Select placeholder="sort" :options="[{title:'10'},{title:'20'},{title:'30'},{title:'40'}]" /> -->
                <Dropdown
                    :bordered="true"
                    :data="[{title:'10'},{title:'20'},{title:'30'},{title:'40'}]"
                >
                    <div class="leading-3"></div>
                </Dropdown>
            </div>
            <!-- <Dropdown
                :bordered="true"
            >
                <div class="leading-3">Show</div>
            </Dropdown> -->
            <button @click="openingModal" class="w-auto h-[40px] bg-[#16bcdc] rounded-md p-2 text-white flex items-center gap-1"><IconPlus />Add Product</button>
        </div>
    </div>
    <Table :head="tableHeads" :column-templates="tableSizeColumns">
        <TableRow 
            v-for="product in products"
            :key="product._id"
            :column-templates="tableSizeColumns"
        >
            <TableColumn>
                {{ product._id }}
            </TableColumn>
            <!-- <TableColumn :src-img="product.images[0].url" :image="true" /> -->
            <TableColumn :src-img="product.images[0]" :image="true" />
            <TableColumn>
                {{ product.name }}
            </TableColumn>
            <TableColumn>
                {{ product.description }}
            </TableColumn>
            <TableColumn class="flex items-center justify-center">
                <!-- {{ $store.state.count }} -->
                {{ product.stock }}
            </TableColumn>
            <TableColumn class="flex items-center justify-center">
                <!-- {{ $store.state.count }} -->
                {{ product.price }}
            </TableColumn>
            <TableColumn>
                <!-- <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button> -->
                <div class="flex items-center justify-center  gap-2">
                    <IconPencil @click="() => handleUpdateProduct(product)" class="text-[#16bcdc] cursor-pointer" />
                    <IconDelete @click="() => handleDeleteProduct(product._id)" class="text-[red] cursor-pointer" />
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
import Select from '~~/components/UI/Select/Select.vue';
import { ModalViewsType } from '~~/types/modalViewTypes';
import { ProductStore } from '~~/store/productStore';

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'

// UI Store
import { useUi } from '~~/store/uiStore';
const { openModal, setModalView, setModalData, addNotification } = useUi()
const { modalView } = storeToRefs(useUi())

// Products Store
const { fetchProducts, deleteProduct } = ProductStore()
const { products } = storeToRefs(ProductStore())


const openingModal = () => {
    setModalView(ModalViewsType.PRODUCT_ADD_VIEW)
    openModal()
    // addNotification({type: notificationTypes.SUCCESS, text: 'Success notification'})
}

// Update Product
const handleUpdateProduct = (product) => {
    setModalView(ModalViewsType.PRODUCT_UPDATE_VIEW)
    setModalData(product)
    openModal()
}

// Delete Product
const handleDeleteProduct = (id) => {
    deleteProduct(id)
}

onBeforeMount(() => {
    fetchProducts()
})


const tableHeads = ['id', 'image', 'title', 'description', 'quantity', 'price', 'actions']
const tableSizeColumns = '70px 100px 1fr 2fr 70px 70px 70px'
const data = ref([
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'Game Console Controller + USB 3.0 Cable',
        description: 'Designed by Hans J. Wegner in 1949 as one of the first models created especially for Carl Hansen & Son, and produced since 1950. The last of a series of chairs wegner designed based on inspiration from antique Chinese armchairs....',
        price: 99.00,
        image: 'https://cdn.shopify.com/s/files/1/0606/6867/4281/products/19_360x.jpg?v=1636009245'
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'Vivo IQOO 7 Legend - 4000 MAh Lithium-Polymer',
        description: 'Designed by Hans J. Wegner in 1949 as one of the first models created especially for Carl Hansen & Son, and produced since 1950. The last of a series of chairs wegner designed based on inspiration from antique Chinese armchairs....',
        price: 210.00,
        image: 'https://cdn.shopify.com/s/files/1/0606/6867/4281/products/5_22af3df9-9b30-433b-894f-cc0c078966b9_360x.jpg?v=1636008932'
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'Stainless Steel Dual Basket ProFry',
        description: 'Designed by Hans J. Wegner in 1949 as one of the first models created especially for Carl Hansen & Son, and produced since 1950. The last of a series of chairs wegner designed based on inspiration from antique Chinese armchairs....',
        price: 520.00,
        image: 'https://cdn.shopify.com/s/files/1/0606/6867/4281/products/3_99a0f0b5-de1e-4292-aeb5-656d714391bc_360x.jpg?v=1636000296'
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'Modern Sony Smart Speaker LFS50G',
        description: 'Designed by Hans J. Wegner in 1949 as one of the first models created especially for Carl Hansen & Son, and produced since 1950. The last of a series of chairs wegner designed based on inspiration from antique Chinese armchairs....',
        price: 220.00,
        image: 'https://cdn.shopify.com/s/files/1/0606/6867/4281/products/1_9cfbee8e-97ab-4503-a253-a88092e7c684_360x.jpg?v=1635999889'
    },
])
</script>

<style>

</style>