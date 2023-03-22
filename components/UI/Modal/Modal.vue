<template>
  <div>
      <div v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-[#131313c9] flex items-center justify-center z-10">
          <div ref="modalRoot" class="w-auto h-auto bg-white rounded-md relative overflow-hidden">
              <component :is="AddProductView"></component>
              <div class="w-[40px] h-[40px] flex items-center justify-center bg-[#00b7ff] rounded-sm text-white cursor-pointer absolute top-0 right-0" @click="closingModal">
                  <IconClose style="font-size: 20px" />
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUi } from '~~/store/uiStore';
import { storeToRefs } from 'pinia';
import IconClose from '~icons/mdi/close'
import { useClickOutside } from '~~/composables/useClickOutside';

// Modal Views
import AddProductView from './ModalViews/AddProductView.vue';

const { closeModal } = useUi()
const { showModal } = storeToRefs(useUi())

// Closing Modal function
const closingModal = () => {
    closeModal()
}

// Close Modal on click outside
// const modalRoot = ref(null)
// useClickOutside(modalRoot, closingModal)


</script>

<style>

</style>