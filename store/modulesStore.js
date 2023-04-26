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
            main_banner: undefined,
            sliders: undefined,
            loading: false
        }
    },

    actions: {
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
        }
    }
})