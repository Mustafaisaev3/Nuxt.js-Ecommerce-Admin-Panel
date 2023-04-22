<template>
    <!-- Add Options View -->
    <div class="absolute top-0 left-0 w-full h-[700px] flex flex-col p-[20px] z-10 bg-white overflow-hidden">
      <header class="text-[25px] font-bold">Add Options</header>
      <div class="grow gap-4 py-2 overflow-auto">
        <div class="w-full h-[75px] flex gap-2 pt-2">

          <SelectInput :data="options" :input-styles="{height: '50px'}" @get-select-item="onSelectOption" />

          <div class="h-full w-full flex gap-2 overflow-x-auto">
            <div v-for="(option, index ) in selectedOptions" :key="option.value" @click="handleSelectActiveOption(option)" :class="{'active': activeOption && activeOption.id == option.id}" class="selected-option w-auto h-[50px] p-2 flex items-center justify-between gap-5 rounded-md border-[1px] border-[#66B5F8] bg-white text-[#66B5F8]">
              <span>{{ option.option.title }}</span>
              <span  @click="() => onDeleteOption(option, index)" class="w-[20px] h-[20px] flex items-center justify-center text-[20px] p-1 rounded-full  bg-white text-[#66B5F8] cursor-pointer">
                <IconMinus class="text-[25px] font-bold text-[#66B5F8]" />
              </span>
            </div>
          </div>

        </div>
        <div>
            <Table v-if="activeOption" :head="tableHeads" :column-templates="tableSizeColumns">
                <TableRow 
                    v-for="option in activeOption.values"
                    :key="option"
                    :column-templates="tableSizeColumns"
                >
                    <TableColumn :vertical-align="center" :overflow_X_hidden="false">
                        <!-- <SelectInput :data="activeOption.option.values" :input-styles="{height: '50px'}" /> -->
                        <!-- <div class="w-full mt-[5px]">
                            <select class="w-full h-full rounded-md border border-[#e5e5e5] p-2 bg-white" @change="(e) => onSelectSelectOptionValue(e)">
                                <option :selected="option.value == selectOption.value ? 'selected' : false" class="" v-for="selectOption in activeOption.option.values" :key="selectOption.id" :value="selectOption">{{ selectOption.value }}</option>
                            </select>
                        </div> -->
                        <Dropdown 
                            :data="activeOption.option.values"
                            :bordered="true"
                            @get-selected-value="({value}) => {option.value = value.value; option._id = value._id }"
                            class="w-full mt-[5px]"
                            :value="option"
                        >
                            <!-- <div class="flex gap-2">
                                <div class="w-[25px]">
                                    <IconProduct class="text-[20px]" />
                                </div>
                                <div class="text-[15px]">Product</div>
                            </div> -->
                        </Dropdown>
                    </TableColumn>
                    <TableColumn>
                        <!-- <Input class="w-full" :value="option.quantity" @get-value="(value) => option.quantity = value" /> -->
                        <Input class="w-full" :value="option.quantity" @get-value="(value) => option.quantity = value" />
                    </TableColumn>
                    <TableColumn>
                        <Input class="w-full" :value="option.price" @get-value="(value) => option.price = value"/>
                        <!-- {{ option.price }} -->
                    </TableColumn>
                    <!-- <TableColumn :src-img="option.images[0]" :image="true" /> -->
                    <TableColumn :align="'center'">
                        <div class="w-full flex items-center justify-center  gap-2">
                            <IconDelete @click="() => handleDeleteOptionRow(option)" class="text-[red] cursor-pointer" />
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
      </div>
      <footer class="flex items-center justify-end gap-2">
          <Button :label="'Save'" :color="'success'" class="w-[150px]" @click="handleSaveDataBtn" />
          <Button :label="'Add Product'" :color="'primary'" class="w-[150px]" @click="handle" />
          <Button :color="'danger'" :label="'Close'" class="w-[150px]" @click="handleCloseOptionModal" />
      </footer>
    </div>
    <!-- Add Options View -->
</template>

<script setup>
import { ref } from 'vue'
import { OptionStore } from '~~/store/optionStore';
import { storeToRefs } from 'pinia';
import SelectInput from '~~/components/UI/SelectInput/SelectInput.vue'
import Button from '@/components/UI/Button/Button.vue'
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Dropdown from '~~/components/UI/Dropdown/Dropdown.vue';
import Input from '~~/components/UI/Input/Input.vue';
import OptionValueConstructor from '@/types/optionValueTypes'

// Icons
import IconMinus from '~icons/mdi/minus'
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'

// Option Store 
const { fetchOptions } = OptionStore()
const { options } = storeToRefs(OptionStore())

// Table grid settings
const tableHeads = ['option value', 'quantity', 'price', 'actions']
const tableSizeColumns = '1fr 1fr 1fr 200px'
const addRowColumnSize = '1fr 200px'

// Props
const emits = defineEmits(['get-selected-options'])

// Props
const props = defineProps(['closeOptionModal', 'options'])

let selectedOptions = ref(props.options ? props.options : [])
let activeOption = ref()

// Handle Select active option
const handleSelectActiveOption = (option) => {
    activeOption.value = option
    console.log(activeOption.value)
}

// Handle Delete active option Row
const handleDeleteOptionRow = (option) => {
    const filterdOptionsArr = activeOption.value.values.filter(value => {
        // console.log(value.valueId, option.valueId)
        return value.id != option.id
    })

    activeOption.value.values = filterdOptionsArr
}

// On Option Select
const onSelectOption = (option) => {
  selectedOptions.value.push({option, values: [], id: Math.random() * 100})
}

// On Option Delete
const onDeleteOption = (option, index) => {
  const filterdOptionsArr = selectedOptions.value.filter(optionItem => {
    return optionItem.id != option.id
  })

  selectedOptions.value = filterdOptionsArr

  console.log(filterdOptionsArr.length)

//   if(option.id == activeOption.value.id) {
//     console.log(selectedOptions.value[index-1])
//     activeOption.value = selectedOptions.value[index-1]
//   } 
//   activeOption = selectedOptions[0]

}

// Handle Add New Option Row
const handleAddNewOptionRow = () => {
    const optionRow = new OptionValueConstructor(undefined,'', 0, 0)
    activeOption.value.values.push(optionRow)
}

const handle = () => {
    console.log(selectedOptions.value)
    console.log(activeOption.value)
}

const onSelectSelectOptionValue = (value) => {
    console.log(value.value._id)
}

// Handle Close option modal
const handleSaveDataBtn = () => {
    emits('get-selected-options', selectedOptions.value)
}

// Handle Close option modal
const handleCloseOptionModal = () => {
    props.closeOptionModal()
}

onMounted(() => {
    console.log(props.options)
})

onBeforeMount(() => {
    fetchOptions()
})


</script>

<style scoped>
.active.selected-option {
    /* background: #66B5F8;
    box-shadow: inset 20px 20px 60px #579ad3,
                inset -20px -20px 60px #75d0ff; */
    color: white;
    background: #66B5F8;
} 
</style>