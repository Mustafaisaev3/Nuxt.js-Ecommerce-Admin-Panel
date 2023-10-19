import { defineStore } from 'pinia'
import responseStatus from '~~/types/responseStatus'
import { ModulesApi } from '~~/services/api/modulesApi'
import { useUi } from './uiStore'
import notificationTypes from '~~/types/notification-types'

const { addNotification } = useUi()

export const ModulesStore = defineStore({
    id: 'modules-store',

    state: () => {
        return {
            page_layout: undefined,
            all_modules: undefined,
            main_banner: undefined,
            sliders: undefined,
            popular_categories: undefined,
            triple_banner: undefined,
            brands_banner: undefined,
            blog_slider: undefined,
            loading: false
        }
    },

    actions: {
        // All Modules
        async fetchAllModules () {
            this.loading = true
            this.all_modules = await ModulesApi.fetchAllModules()
            console.log(this.all_modules)
            this.loading = false
        },

        // Pages Layouts
        async fetchPageLayout (page) {
            this.loading = true
            this.page_layout = await ModulesApi.fetchPageLayout(page)
            console.log(this.page_layout)
            this.loading = false
        },
        async createPageLayout (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.createPageLayout(payload)
            if (status == responseStatus.SUCCESS){
                this.page_layout = data
                addNotification({type: notificationTypes.SUCCESS, text: 'Page Layout updaited!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        // Home Main Banner
        async fetchMainBanner () {
            this.loading = true
            this.main_banner = await ModulesApi.fetchMainBanner()
            this.loading = false
        },
        async addMainBanner (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.addMainBannerSlides(payload)
            if (status == responseStatus.SUCCESS){
                this.main_banner = data
                addNotification({type: notificationTypes.SUCCESS, text: 'Main Banner Slides Created!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },


        // Slider
        async fetchSliders () {
            this.loading = true
            const { data } = await ModulesApi.fetchSliders()
            console.log(data)
            this.sliders = data
            this.loading = false
        },

        async addSlider (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.addSlider(payload)
            if (status == responseStatus.SUCCESS){
                this.sliders.push(data) 
                addNotification({type: notificationTypes.SUCCESS, text: 'New Slider Created!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        async updateSlider (id, payload) {
            this.loading = true
            const { status, data } = await ModulesApi.updateSlider(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetSlider = this.sliders.findIndex(slider => {
                    return slider._id == id
                })
                console.log(targetSlider)
                this.sliders.splice(targetSlider, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Slider Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },
        
        async deleteSlider (id) {
            this.loading = true
            const { status, message } = await ModulesApi.deleteSlider(id)
            if (status == responseStatus.SUCCESS){
                const targetSlider = this.sliders.findIndex(slider => {
                    return slider._id == id
                })
                console.log(targetSlider)
                this.sliders.splice(targetSlider, 1)
                addNotification({type: notificationTypes.SUCCESS, text: 'Slider Delited!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        // Popular Categories
        async fetchPopularCategories () {
            this.loading = true
            const { data } = await ModulesApi.fetchPopularCategories()
            console.log(data)
            this.popular_categories = data
            this.loading = false
        },

        async updatePopularCategories (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.updatePopularCategories(payload)
            if (status == responseStatus.SUCCESS){
                this.popular_categories = data
                addNotification({type: notificationTypes.SUCCESS, text: 'Popular Categories Created!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        // Triple Banner
        async fetchTrippleBanner () {
            this.loading = true
            const { data } = await ModulesApi.fetchTripleBanner()
            console.log(data)
            this.triple_banner = data
            this.loading = false
        },

        async updateTripleBanner (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.updateTripleBanner(payload)
            if (status == responseStatus.SUCCESS){
                this.triple_banner = data
                addNotification({type: notificationTypes.SUCCESS, text: 'Triple Banner Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        // Brand Banner
        async fetchBrandsBanner () {
            this.loading = true
            this.brands_banner = await ModulesApi.fetchBrands()
            console.log(this)
            this.loading = false
        },

        async updateBrandsBanner (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.updateBrandsBanner(payload)
            if (status == responseStatus.SUCCESS){
                this.brands_banner = data
                addNotification({type: notificationTypes.SUCCESS, text: 'Brands Banner Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        // Blog Slider
        async fetchBlogSlider () {
            this.loading = true
            this.blog_slider = await ModulesApi.fetchBlogSlider()
            console.log(this)
            this.loading = false
        },

        async updateBlogSlider (payload) {
            this.loading = true
            const { status, data } = await ModulesApi.updateBlogSlider(payload)
            if (status == responseStatus.SUCCESS){
                this.blog_slider = data
                addNotification({type: notificationTypes.SUCCESS, text: 'Blog Slider Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        }
    }
})