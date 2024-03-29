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
import AddProductView from './ModalViews/Product/AddProductView.vue';
import UpdateProduct from './ModalViews/Product/UpdateProduct.vue';
import AddCategoryView from './ModalViews/Category/AddCategoryView.vue';
import UpdateCategory from './ModalViews/Category/UpdateCategory.vue';
import UserOrders from './ModalViews/Order/UserOrdersView.vue'
import AddOptionView from './ModalViews/Option/AddOptionView.vue';
import UpdateOptionView from './ModalViews/Option/UpdateOption.vue';
import AddBlogCategoryView from './ModalViews/Blog/AddBlogCategoryView.vue';
import UpdateBlogCategoryView from './ModalViews/Blog/UpdateBlogCategory.vue';
import AddBlogPostView from './ModalViews/Blog/AddBlogPostView.vue';
import UpdateBlogPostView from './ModalViews/Blog/UpdateBlogPost.vue';
import UpdateBlogSlider from './ModalViews/Blog/UpdateBlogSlider.vue';
import MainSliderViewView from './ModalViews/Home/MainSliderView.vue';
import MainBannerGridView from './ModalViews/Home/MainBannerGridView.vue';
import AddSliderView from './ModalViews/Modules/AddSliderView.vue';
import UpdateSliderView from './ModalViews/Modules/UpdateSliderView.vue';
import PopularCategoriesView from './ModalViews/PopularCategories/PopularCategoriesView.vue';
import TripleBannerView from './ModalViews/TripleBanner/TripleBannerView.vue';
import BrandsView from './ModalViews/Brands/BrandsView.vue';

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
    {
        name: ModalViewsType.USER_ORDERS_VIEW,
        view: UserOrders
    },
    {
        name: ModalViewsType.OPTION_ADD_VIEW,
        view: AddOptionView
    },
    {
        name: ModalViewsType.OPTION_UPDATE_VIEW,
        view: UpdateOptionView
    },
    {
        name: ModalViewsType.BLOG_CATEGORY_ADD_VIEW,
        view: AddBlogCategoryView
    },
    {
        name: ModalViewsType.BLOG_CATEGORY_UPDATE_VIEW,
        view: UpdateBlogCategoryView
    },
    {
        name: ModalViewsType.BLOG_POST_ADD_VIEW,
        view: AddBlogPostView
    },
    {
        name: ModalViewsType.BLOG_POST_UPDATE_VIEW,
        view: UpdateBlogPostView
    },
    {
        name: ModalViewsType.BLOG_SLIDER_UPDATE_VIEW,
        view: UpdateBlogSlider
    },
    {
        name: ModalViewsType.HOME_MAIN_SLIDER_VIEW,
        view: MainSliderViewView
    },
    {
        name: ModalViewsType.HOME_MAIN_BANNER_GRID_VIEW,
        view: MainBannerGridView
    },
    {
        name: ModalViewsType.SLIDER_ADD_VIEW,
        view: AddSliderView
    },
    {
        name: ModalViewsType.SLIDER_UPDATE_VIEW,
        view: UpdateSliderView
    },
    {
        name: ModalViewsType.POPULAR_CATEGORIES_UPDATE_VIEW,
        view: PopularCategoriesView
    },
    {
        name: ModalViewsType.TRIPLE_BANNER_UPDATE_VIEW,
        view: TripleBannerView
    },
    {
        name: ModalViewsType.BRANDS_UPDATE_VIEW,
        view: BrandsView
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