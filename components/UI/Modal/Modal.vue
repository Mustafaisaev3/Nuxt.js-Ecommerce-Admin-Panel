<template>
  <div>
      <div v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-[#131313c9] flex items-center justify-center z-10">
          <div ref="modalRoot" class="w-auto h-auto bg-white rounded-md relative overflow-hidden">
              <component :is="activeView"></component>
              <div class="w-[40px] h-[40px] flex items-center justify-center bg-[#00b7ff] rounded-sm text-white cursor-pointer absolute top-0 right-0" @click="closingModal">
                  <IconClose style="font-size: 20px" />
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUi } from '~~/store/uiStore';
import { storeToRefs } from 'pinia';
import { ModalViewsType } from '~~/types/modalViewTypes';
import { useClickOutside } from '~~/composables/useClickOutside';

// Modal Views
import AddProductView from './ModalViews/AddProductView.vue';
import UpdateProduct from './ModalViews/UpdateProduct.vue';
import AddCategoryView from './ModalViews/AddCategoryView.vue';
import UpdateCategory from './ModalViews/UpdateCategory.vue';

// Icons
import IconClose from '~icons/mdi/close'

const views = [
    {
        name: ModalViewsType.PRODUCT_ADD_VIEW,
        view: AddProductView
    },
    {
        name: ModalViewsType.PRODUCT_UPDATE_VIEW,
        view: UpdateProduct
    },
    {
        name: ModalViewsType.CATEGORY_ADD_VIEW,
        view: AddCategoryView
    },
    {
        name: ModalViewsType.CATEGORY_UPDATE_VIEW,
        view: UpdateCategory
    },
]

const { closeModal } = useUi()
const { showModal, modalView } = storeToRefs(useUi())

// Closing Modal function
const closingModal = () => {
    closeModal()
}

const activeView = computed(() => {
    const filteredView = views.filter((view) => {
        return view.name === modalView.value
    })
    return filteredView[0].view
})


// Close Modal on click outside
// const modalRoot = ref(null)
// useClickOutside(modalRoot, closingModal)


</script>

<style>

</style>