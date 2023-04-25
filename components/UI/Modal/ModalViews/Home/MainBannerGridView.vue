<template>
    <div class="min-w-[1000px] h-[750px] p-[20px] flex flex-col">
      <header>Add Banner Grid Items</header>
      <div class="h-full flex-1 flex flex-col border rounded-md gap-2 p-4 overflow-hidden">
        <Table :head="tableHeads" :column-templates="tableSizeColumns" class="overflow-y-auto">
            <TableRow 
                v-for="banner in bannersArray"
                :key="banner.id"
                :column-templates="tableSizeColumns"
                :id="banner.id"
            >
                <TableColumn>
                    <Input class="w-full" v-model="banner.title" placeholder="Slide Title" />
                </TableColumn>
                <TableColumn>
                    <Input class="w-full" v-model="banner.subtitle" placeholder="Slide Subtitle" />
                </TableColumn>
                <TableColumn>
                    <Input class="w-full" v-model="banner.link" placeholder="Slide Link" />
                </TableColumn>
                <TableColumn :align="'center'" :vertical-align="'center'">
                    <!-- <SimpleUploadImage :inputKey="product.id" @get-image="(image) => product.image = image" :image="product.image != undefined && product.image.imageUrl" /> -->
                    <SimpleUploadImage :url="banner.image" :inputKey="banner.id || banner._id" @get-image="(image) => {banner.image = image; banner.changeImage = true}" />
                </TableColumn>
            </TableRow>
        </Table>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleAddSlide" :label="'Close'" :color="'danger'" class="w-[100px]" />
          <Button @click="handleAddSlide" :label="'Save'" :color="'primary'" class="w-[100px]" />
      </footer>
    </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { ModulesStore } from '~~/store/modulesStore';
  import { storeToRefs } from 'pinia';
  import SimpleUploadImage from '@/components/UI/UploadImage/SimpleUploadImage.vue';
//   import Input from '../../../Input/Input.vue';
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
  const tableHeads = ['title', 'subtitle', 'link', 'image']
  const tableSizeColumns = '1fr 1fr 1fr 200px'

  // Modules Store
  const { addMainBanner, fetchMainBanner } = ModulesStore()
  const { main_banner, loading } = storeToRefs(ModulesStore())
  
  let bannersArray = reactive(main_banner.value.banners ? main_banner.value.banners : [
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, changeImage: false},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, changeImage: false},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, changeImage: false},
    {id: Math.random() * 100, title: '', subtitle: '', link: '', image: undefined, changeImage: false},
  ])


  const handle = () => {
    console.log(bannersArray)
  }
  
  const handleAddSlide = async () => {
    const formData = new FormData()

    formData.append('banners', JSON.stringify(bannersArray))

    bannersArray.map(banner => {
        if (banner.image){
            formData.append('img', banner.image.file)
        }
    })

    console.log(formData)
    addMainBanner(formData)
  }
  
  onBeforeMount(() => {
    fetchMainBanner()
  })
  </script>
  
  <style>
  
  </style>