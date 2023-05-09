<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
      <header>Triple Banner</header>
      <div v-if="!loading" class="h-full flex-1 flex flex-col border rounded-md gap-2 p-4 overflow-hidden">
          <div class="w-full h-[80px] flex gap-2">
              <Input class="w-full" v-model="tripleBanner.link" :label="'Link'" placeholder="Link" />
          </div>
            <Table :head="tableHeads" :column-templates="tableSizeColumns" class="overflow-y-scroll">
                <TableRow 
                    v-for="item in TripleBannerItemsArray"
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
            </Table>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleUpdateTripleBanner" :label="'Update'" :color="'primary'" />
      </footer>
    </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { OptionStore } from '~~/store/optionStore';
  import { ModulesStore } from '~~/store/modulesStore';
  import SimpleUploadImage from '@/components/UI/UploadImage/SimpleUploadImage.vue';
//   import Input from '@/components/UI/Input/Input.vue';
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
  const { updateTripleBanner, fetchTrippleBanner } = ModulesStore()
  const { triple_banner, loading } = storeToRefs(ModulesStore())
  
  const tripleBannerName = ref('Popular Categories')
  const tripleBanner = ref(triple_banner)
//   const tripleBannerLink = ref(triple_banner.value.link)
  let TripleBannerItemsArray = ref([
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true},
  ])

  const handleAddNewItemRow = () => {
    // TripleBannerItemsArray.push({id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, status: true})
    console.log(tripleBanner.value)
  }

  const handleDeleteItemRow = (id) => {
    const removeElemntId = TripleBannerItemsArray.findIndex((item) => {
        return item.id === id
    })

    TripleBannerItemsArray.splice(removeElemntId, 1)

  }

  const handle = () => {
    console.log(TripleBannerItemsArray)
    console.log(triple_banner.value)
  }
  
  const handleUpdateTripleBanner = async () => {
    const formData = new FormData()
    const tripleBannerObj = {
        name: tripleBannerName.value,
        link: tripleBanner.value.link,
        items: TripleBannerItemsArray.value
    }

    formData.append('banner', JSON.stringify(tripleBannerObj))

    tripleBannerObj.items.map(item => {
        if (item.image){
            formData.append('img', item.image.file)
        }
    })

    updateTripleBanner(formData)
    // console.log(formData)
  }

  onBeforeMount(() => {
    fetchTrippleBanner()
  })
  
  </script>
  
  <style>
  
  </style>