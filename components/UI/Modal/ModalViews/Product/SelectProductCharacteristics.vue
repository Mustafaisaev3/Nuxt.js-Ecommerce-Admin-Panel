<template>
    <!-- Add Options View -->
    <div class="absolute top-0 left-0 w-full h-[700px] flex flex-col p-[20px] z-10 bg-white overflow-hidden">
      <header class="text-[25px] font-bold">Add Characteristics</header>
      <div class="grow gap-4 py-2 overflow-auto">
        <div>
            <Table :head="tableHeads" :column-templates="tableSizeColumns">
                <TableRow 
                    v-for="item in selectedCharacteristics"
                    :key="item.id"
                    :column-templates="tableSizeColumns"
                >
                    <TableColumn>
                        <Input class="w-full" :value="item.characteristic" @get-value="(value) => item.characteristic = value"  />
                    </TableColumn>
                    <TableColumn>
                        <Input class="w-full" :value="item.text" @get-value="(value) => item.text = value" />
                    </TableColumn>
                    <!-- <TableColumn :src-img="option.images[0]" :image="true" /> -->
                    <TableColumn :align="'center'">
                        <div class="w-full flex items-center justify-center  gap-2">
                            <IconDelete @click="() => handleDeleteCharacteristicRow(item)" class="text-[red] cursor-pointer" />
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
          <Button :label="'Save'" :color="'success'" class="w-[150px]" @click="handleSaveCharacteristicsDataBtn" />
          <Button :label="'Add Product'" :color="'primary'" class="w-[150px]" @click="handle" />
          <Button :color="'danger'" :label="'Close'" class="w-[150px]" @click="handleCloseCharacteristicsModal" />
      </footer>
    </div>
    <!-- Add Options View -->
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/UI/Button/Button.vue'
import Table from '~~/components/UI/Table/Table.vue';
import TableRow from '~~/components/UI/Table/TableRow.vue';
import TableColumn from '~~/components/UI/Table/TableColumn.vue';
import Input from '~~/components/UI/Input/Input.vue';
import CharacteristicValueConstructor from '@/types/characteristicValueTypes'

// Icons
import IconPlus from '~icons/mdi/plus'
import IconDelete from '~icons/mdi/delete'

// Table grid settings
const tableHeads = ['Characteristics', 'Text', 'actions']
const tableSizeColumns = '1fr 1fr 200px'
const addRowColumnSize = '1fr 200px'

// Props
const emits = defineEmits(['get-selected-characteristics'])

// Props
const props = defineProps(['closeCharacteristicsModal', 'options', 'characteristics'])

let selectedCharacteristics = ref(props.characteristics ? props.characteristics : [])


// Handle Delete active option Row
const handleDeleteCharacteristicRow = (item) => {
    const filterdCharacteristicsArr = selectedCharacteristics.value.filter(value => {
        return value.id != item.id
    })

    selectedCharacteristics.value = filterdCharacteristicsArr
}


// Handle Add New Option Row
const handleAddNewOptionRow = () => {
    const characteristicRow = new CharacteristicValueConstructor(undefined, '', '')
    selectedCharacteristics.value.push(characteristicRow)
}

const handle = () => {
    console.log(selectedCharacteristics.value)
}


// Handle Close option modal
const handleSaveCharacteristicsDataBtn = () => {
    emits('get-selected-characteristics', selectedCharacteristics.value)
}

// Handle Close option modal
const handleCloseCharacteristicsModal = () => {
    props.closeCharacteristicsModal()
}


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