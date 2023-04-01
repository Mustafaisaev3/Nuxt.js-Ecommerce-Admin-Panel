import { defineStore } from 'pinia'
import responseStatus from '~~/types/responseStatus'
import { CategoryApi } from '~~/services/api/categoryApi'
import { useUi } from './uiStore'
import notificationTypes from '~~/types/notification-types'

const { addNotification } = useUi()

export const CategoryStore = defineStore({
    id: 'category-store',

    state: () => {
        return {
            categories: [],
            loading: false
        }
    },

    actions: {
        async fetchCategories () {
            this.loading = true
            this.categories = await CategoryApi.fetchCategories()
            this.loading = false
        },
        async addCategory (payload) {
            this.loading = true
            const { status, data } = await CategoryApi.addCategory(payload)
            if (status == responseStatus.SUCCESS){
                this.categories.push(data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Category Created!'})
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