<template>
  <div class="p-[20px]">
    <Table :head="tableHeads" :column-templates="tableSizeColumns">
        <TableRow 
            v-for="product in data"
            :key="product.id"
            :column-templates="tableSizeColumns"
        >
            <TableColumn>
                {{ product.id }}
            </TableColumn>
            <TableColumn>
                {{ product.title }}
            </TableColumn>
            <TableColumn>
                {{ product.description }}
            </TableColumn>
            <TableColumn :src-img="product.image" :image="true" />
            <TableColumn class="flex items-center justify-center">
                <button class="w-[100px] h-[40px] bg-cyan-600 rounded-md p-2">Click</button>
            </TableColumn>
        </TableRow>
    </Table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
const tableHeads = ['id', 'title', 'description', 'image', '']
const tableSizeColumns = '70px 1fr 2fr 150px 140px'

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