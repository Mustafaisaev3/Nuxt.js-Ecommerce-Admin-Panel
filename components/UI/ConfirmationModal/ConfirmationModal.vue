<template>
    <div v-if="showConfirmationModal" class="fixed top-0 left-0 w-full h-full bg-[#131313c9] flex items-center justify-center z-[1000]">
        <div v-show="confirmationModalData" class="modal-root w-auto h-auto bg-white rounded-md relative overflow-hidden">
            <div class='w-[500px] h-auto p-[40px] rounded-md bg-white flex flex-col justify-center items-center '>
                <div class='font-bold text-2xl text-[#131313c9] text-center'>{{ confirmationModalData.question }}</div>
                <div class='flex gap-4 pt-8'>
                    <Button :color="'success'" :label="'Confirm'" @click="handleConfirmBtn"/>
                    <Button :color="'danger'" :label="'Cancel'" @click="handleCancelBtn"/>
                </div>
            </div>
            <div class="w-[40px] h-[40px] flex items-center justify-center bg-[#00b7ff] rounded-sm text-white cursor-pointer absolute top-0 right-0" @click="closingModal">
                <IconClose style="font-size: 20px" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../Button/Button.vue';
import { storeToRefs } from 'pinia';
import { useUi } from '~~/store/uiStore';

import IconClose from '~icons/mdi/close'

const { closeConfirmationModal } = useUi()
const { showConfirmationModal, confirmationModalData } = storeToRefs(useUi())

const closingModal = () => {
    closeConfirmationModal()
}

const handleConfirmBtn = () => {
    confirmationModalData.value.callback()
    closeConfirmationModal()
}

const handleCancelBtn = () => {
    closeConfirmationModal()
}

</script>

<style>

</style>