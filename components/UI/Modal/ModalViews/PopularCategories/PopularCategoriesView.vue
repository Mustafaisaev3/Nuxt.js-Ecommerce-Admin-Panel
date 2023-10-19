<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
      <header>Popular Categories</header>
      <div class="h-full flex-1 flex flex-col border rounded-md gap-2 p-4 overflow-hidden">
          <div class="w-full h-[80px] flex gap-2">
              <Input class="w-full" v-model="popularCategoriesLink" :label="'Link'" placeholder="Link" />
          </div>
            <Table :head="tableHeads" :column-templates="tableSizeColumns" class="overflow-y-scroll">
                <TableRow 
                    v-for="item in popularCategoriesItemsArray"
                    :key="item.id"
                    :column-templates="tableSizeColumns"
                    :id="item.id"
                >
                    <TableColumn>
                        <Input class="w-full" v-model="item.title" placeholder="title" />
                    </TableColumn>
                    <TableColumn>
                        <Input class="w-full" v-model="item.subtitle" placeholder="subtitle" />
                    </TableColumn>
                    <TableColumn>
                        <Input class="w-full" v-model="item.link" placeholder="link" />
                    </TableColumn>
                    <TableColumn :align="'center'" :vertical-align="'center'">
                        <!-- <SimpleUploadImage :inputKey="product.id" @get-image="(image) => product.image = image" :image="product.image != undefined && product.image.imageUrl" /> -->
                        <SimpleUploadImage :inputKey="item.id" @get-image="(image) => item.image = image" />
                    </TableColumn>
                    <TableColumn>
                        <div class="w-full flex items-center justify-center  gap-2">
                            <IconPencil @click="handle" class="text-[#16bcdc] cursor-pointer" />
                            <IconDelete @click="() => handleDeleteItemRow(item.id)" class="text-[#ff0e0e] cursor-pointer" />
                        </div>
                    </TableColumn>
                </TableRow>
                <!-- <TableRow 
                    :column-templates="addRowColumnSize"
                >
                    <TableColumn>
                    </TableColumn>
                    <TableColumn>
                        <div class="w-full flex items-center justify-center  gap-2">
                            <IconPlus @click="handleAddNewItemRow" class="text-[white] bg-[#16bcdc] rounded-sm cursor-pointer w-[30px] h-[30px]" />
                        </div>
                    </TableColumn>
                </TableRow> -->
            </Table>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleUpdatePopularCategories" :label="'Update'" :color="'primary'" />
      </footer>
    </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { OptionStore } from '~~/store/optionStore';
  import { ModulesStore } from '~~/store/modulesStore';
  import modulesTypes from '~~/types/modulesTypes';
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
  const tableHeads = ['title', 'subtitle', 'link', 'image', 'actions']
  const tableSizeColumns = '1fr 1fr 1fr 1fr 200px'
  const addRowColumnSize = '1fr 200px'

  // Modules Store
  const { updatePopularCategories } = ModulesStore()
  //   const { main_banner, loading } = storeToRefs(ModulesStore())
  
  const popularCategoriesName = ref('Popular Categories')
  const popularCategoriesType = ref(modulesTypes.POPULAR_CATEGORIES)
  const popularCategoriesLink = ref('')
  let popularCategoriesItemsArray = ref([
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
  ])

  const handleAddNewItemRow = () => {
    popularCategoriesItemsArray.push({id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true})
  }

  const handleDeleteItemRow = (id) => {
    const removeElemntId = popularCategoriesItemsArray.findIndex((item) => {
        return item.id === id
    })

    popularCategoriesItemsArray.splice(removeElemntId, 1)
  }

  const handle = () => {
    console.log(popularCategoriesItemsArray)
  }
  
  const handleUpdatePopularCategories = async () => {
    const formData = new FormData()
    const popularCategoriesObj = {
        name: popularCategoriesName.value,
        type: popularCategoriesType.value,
        link: popularCategoriesLink.value,
        items: popularCategoriesItemsArray.value
    }

    formData.append('banner', JSON.stringify(popularCategoriesObj))

    popularCategoriesObj.items.map(item => {
        if (item.image){
            formData.append('img', item.image.file)
        }
    })

    updatePopularCategories(formData)
    console.log(formData)
  }
  
  </script>
  
  <style>
  
  </style>