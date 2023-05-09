<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
      <header>Add Brand Items</header>
      <div class="h-full flex-1 flex flex-col border rounded-md gap-2 p-4 overflow-hidden">
        <Table v-if="!loading" :head="tableHeads" :column-templates="tableSizeColumns" class="overflow-y-auto">
            <TableRow 
                v-for="brand in brands.items"
                :key="brand.id"
                :column-templates="tableSizeColumns"
                :id="brand.id"
            >
                <TableColumn>
                    <Input class="w-full" v-model="brand.title" placeholder="Brand Title" />
                </TableColumn>
                <TableColumn>
                    <Input class="w-full" v-model="brand.link" placeholder="Brand Link" />
                </TableColumn>
                <TableColumn :align="'center'" :vertical-align="'center'">
                    <!-- <SimpleUploadImage :inputKey="product.id" @get-image="(image) => product.image = image" :image="product.image != undefined && product.image.imageUrl" /> -->
                    <SimpleUploadImage :url="brand.image" :inputKey="brand.id || brand._id" @get-image="(image) => {brand.image = image; brand.changeImage = true}" />
                </TableColumn>
                <TableColumn>
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconDelete @click="() => handleDeleteSlideRow(brand.id, brand._id)" class="text-[#ff0e0e] cursor-pointer" />
                    </div>
                </TableColumn>
            </TableRow>
            <TableRow 
                :column-templates="addRowColumnSize"
            >
                <TableColumn>
                </TableColumn>
                <TableColumn>
                    <div class="w-full flex items-center justify-center  gap-2">
                        <IconPlus @click="handleAddNewSlideRow" class="text-[white] bg-[#16bcdc] rounded-sm cursor-pointer w-[30px] h-[30px]" />
                    </div>
                </TableColumn>
            </TableRow>
        </Table>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handle" :label="'sss'" :color="'danger'" class="w-[100px]" />
          <Button @click="handleAddSlide" :label="'Close'" :color="'danger'" class="w-[100px]" />
          <Button @click="handleAddSlide" :label="'Save'" :color="'primary'" class="w-[100px]" />
      </footer>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useUi } from '~~/store/uiStore';
import { ModulesStore } from '~~/store/modulesStore';
import SimpleUploadImage from '@/components/UI/UploadImage/SimpleUploadImage.vue';
import Input from '@/components/UI/Input/Input.vue';
import Button from '@/components/UI/Button/Button.vue'
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'
import IconPencil from '~icons/mdi/pencil'

// Table grid settings
const tableHeads = ['title', 'link', 'image', 'actions']
const tableSizeColumns = ' 1fr 1fr 200px 100px'
const addRowColumnSize = '1fr 100px'

// UI Store
const { modalData } = storeToRefs(useUi())

// Modules Store
const { updateBrandsBanner, fetchBrandsBanner } = ModulesStore()
const { brands_banner, loading } = storeToRefs(ModulesStore())


// let brandsArray = reactive(modalData.value.slides)
const brandsName = ref('Brands')
const brandsLink = ref('')
let brands = reactive(brands_banner)

const handleAddNewSlideRow = () => {
    brands.value.items.push({id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, changeImage: false})
}

const handleDeleteSlideRow = (id, _id) => {

    const removeElemntId = brands.value.items.findIndex((brand) => {
        if (brand.id){
            return brand.id == id 
        } else {
            return brand._id == _id
        }
    })
    console.log(removeElemntId)

    brands.value.items.splice(removeElemntId, 1)
}

const handle = () => {
    console.log(brandsArray)
}

const handleAddSlide = async () => {
    const formData = new FormData()
    // const optionObj = {
    //     name: optionName.value,
    //     options: brandsArray
    // }

    const brandsObj = {
        name: brandsName.value,
        link: brandsLink.value,
        items: brands.value.items
    }

    formData.append('brands_banner', JSON.stringify(brandsObj))

    brands.value.items.map(slide => {
        if (slide.image){
            formData.append('img', slide.image.file)
        }
    })

    // console.log(formData)
    updateBrandsBanner(formData)
}

onBeforeMount(() => {
    fetchBrandsBanner()
})


</script>

<style>

</style>