<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
      <header>Update Option</header>
      <div class="h-full flex-1 flex flex-col border rounded-md gap-2 p-4 overflow-hidden">
          <div class="w-full h-[80px] flex gap-2">
              <Input class="w-full" v-model="optionName" :label="'Option Name'" placeholder="Option Name" />
              <!-- <Select class="w-full" :label="'Type'" placeholder="parent"  :options="categories" @get-active-item="value => optionType = value._id" /> -->
          </div>
            <Table :head="tableHeads" :column-templates="tableSizeColumns" class="overflow-y-scroll">
                <TableRow 
                    v-for="option in optionsArray"
                    :key="option.id"
                    :column-templates="tableSizeColumns"
                    :id="option.id"
                >
                    <TableColumn>
                        <Input class="w-full" v-model="option.value" placeholder="Option Value" />
                    </TableColumn>
                    <TableColumn :align="'center'" :vertical-align="'center'">
                        <!-- <SimpleUploadImage :inputKey="product.id" @get-image="(image) => product.image = image" :image="product.image != undefined && product.image.imageUrl" /> -->
                        <SimpleUploadImage :inputKey="option.id" @get-image="(image) => option.image = image" />
                    </TableColumn>
                    <TableColumn>
                        <div class="w-full flex items-center justify-center  gap-2">
                            <IconPencil @click="handle" class="text-[#16bcdc] cursor-pointer" />
                            <IconDelete @click="() => handleDeleteOptionRow(option.id)" class="text-[#ff0e0e] cursor-pointer" />
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
                            <IconPlus @click="handleAddNewOptionRow" class="text-[white] bg-[#16bcdc] rounded-sm cursor-pointer w-[30px] h-[30px]" />
                        </div>
                    </TableColumn>
                </TableRow>
            </Table>
      </div>
      <footer class=" flex items-center justify-end gap-2">
          <Button @click="handleUpdateOption" :label="'Update Option'" :color="'primary'" />
      </footer>
    </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { OptionStore } from '~~/store/optionStore';
  import { useUi } from '~~/store/uiStore';
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

  // UI Store
  const { modalData } = storeToRefs(useUi())

  // Table grid settings
  const tableHeads = ['title', 'image', 'actions']
  const tableSizeColumns = '1fr 1fr 200px'
  const addRowColumnSize = '1fr 200px'

  // Option Store 
  const { updateOption } = OptionStore()  
  
  const optionName = ref(modalData.value.title)
  let optionsArray = reactive(modalData.value.values)

  const handleAddNewOptionRow = () => {
    optionsArray.push({id: Math.random() * 100, value: '', image: undefined})
  }

  const handleDeleteOptionRow = (id) => {
    const removeElemntId = optionsArray.findIndex((option) => {
        return option.id === id
    })

    optionsArray.splice(removeElemntId, 1)
  }

  const handle = () => {
    console.log(optionsArray)
  }
  
  const handleUpdateOption = async () => {
    const formData = new FormData()
    const optionObj = {
        id: modalData.value._id,
        name: optionName.value,
        options: optionsArray
    }

    formData.append('option', JSON.stringify(optionObj))

    optionsArray.map(option => {
        if (option.image){
            formData.append('img', option.image.file)
        }
    })

    updateOption(modalData.value._id, formData)
  }
  
  </script>
  
  <style>
  
  </style>