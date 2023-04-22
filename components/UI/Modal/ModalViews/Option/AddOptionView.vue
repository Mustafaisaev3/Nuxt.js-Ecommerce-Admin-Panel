<template>
    <div class="min-w-[1000px] h-[700px] p-[20px] flex flex-col">
      <header>Add Option</header>
      <div class="h-full flex-1 flex flex-col border rounded-md gap-2 p-4 overflow-hidden">
          <div class="w-full h-[80px] flex gap-2">
              <Input class="w-full" v-model="optionName" :label="'Option Name'" placeholder="Option Name" />
              <!-- <Select class="w-full" :label="'Type'" placeholder="parent"  :options="categories" @get-active-item="value => optionType = value._id" /> -->
          </div>
            <Table :head="tableHeads" :column-templates="tableSizeColumns" class="overflow-y-scroll">
                <TableRow 
                    v-for="product in optionsArray"
                    :key="product.id"
                    :column-templates="tableSizeColumns"
                    :id="product.id"
                >
                    <TableColumn>
                        <Input class="w-full" v-model="product.value" placeholder="Option Value" />
                    </TableColumn>
                    <TableColumn :align="'center'" :vertical-align="'center'">
                        <!-- <SimpleUploadImage :inputKey="product.id" @get-image="(image) => product.image = image" :image="product.image != undefined && product.image.imageUrl" /> -->
                        <SimpleUploadImage :inputKey="product.id" @get-image="(image) => product.image = image" />
                    </TableColumn>
                    <TableColumn>
                        <div class="w-full flex items-center justify-center  gap-2">
                            <IconPencil @click="handle" class="text-[#16bcdc] cursor-pointer" />
                            <IconDelete @click="() => handleDeleteOptionRow(product.id)" class="text-[#ff0e0e] cursor-pointer" />
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
          <Button @click="handleAddOption" :label="'Add Option'" :color="'primary'" />
      </footer>
    </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { OptionStore } from '~~/store/optionStore';
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
  const tableHeads = ['title', 'image', 'actions']
  const tableSizeColumns = '1fr 1fr 200px'
  const addRowColumnSize = '1fr 200px'

  // Option Store 
  const { addOption } = OptionStore()  
  
  const optionName = ref('')
  let optionsArray = reactive([])

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
  
  const handleAddOption = async () => {
    const formData = new FormData()
    const optionObj = {
        name: optionName.value,
        options: optionsArray
    }

    formData.append('option', JSON.stringify(optionObj))

    optionsArray.map(option => {
        if (option.image){
            formData.append('img', option.image.file)
        }
    })

    addOption(formData)
  }
  
  </script>
  
  <style>
  
  </style>