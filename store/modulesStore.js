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
            loading: false
        }
    },

    actions: {
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
        async updateCategory (id, payload) {
            this.loading = true
            const { status, data } = await CategoryApi.updateCategory(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetCategory = this.categories.findIndex(category => {
                    return category._id == id
                })
                console.log(targetCategory)
                this.categories.splice(targetCategory, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Category Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },
        async deleteCategory (id) {
            this.loading = true
            const { status, message } = await CategoryApi.deleteCategory(id)
            if (status == responseStatus.SUCCESS){
                const targetCategory = this.categories.findIndex(category => {
                    return category._id == id
                })
                console.log(targetCategory)
                this.categories.splice(targetCategory, 1)
                addNotification({type: notificationTypes.SUCCESS, text: 'Category Delited!'})
            } else {
                console.log(status)
            }
            this.loading = false
        }
    }
})