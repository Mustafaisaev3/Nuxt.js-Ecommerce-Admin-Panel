import { defineStore } from 'pinia'
import responseStatus from '~~/types/responseStatus'
import { CustumerApi } from '~~/services/api/custumerApi'
import { useUi } from './uiStore'
import notificationTypes from '~~/types/notification-types'

const { addNotification } = useUi()

export const CustumerStore = defineStore({
    id: 'custumer-store',

    state: () => {
        return {
            custumers: [],
            custumerOrders: [],
            loading: false
        }
    },

    actions: {
        async fetchCustumers () {
            this.loading = true
            this.custumers = await CustumerApi.fetchCustumers()
            this.loading = false
        },
        async fetchCustumerOrders (id) {
            this.loading = true
            this.custumerOrders = await CustumerApi.fetchCustumerOrders(id)
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