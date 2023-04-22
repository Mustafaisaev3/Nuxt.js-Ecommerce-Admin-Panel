import { defineStore } from "pinia";
import { OptionApi } from "~~/services/api/optionApi";
import responseStatus from "~~/types/responseStatus";
import { useUi } from './uiStore'
import notificationTypes from '~~/types/notification-types'

const { addNotification } = useUi()

export const OptionStore = defineStore({
    id: 'option-store',

    state: () => {
        return {
            options: [],
            loading: false
        }
    },

    actions: {
        async fetchOptions () {
            this.loading = true
            this.options = await OptionApi.fetchOptions()
            this.loading = false
        },

        async addOption (payload) {
            this.loading = true
            const { status, data } = await OptionApi.addOption(payload)
            console.log(status, data, 'payload')
            if (status == responseStatus.SUCCESS){
                this.options.push(data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Option Created!'})
            } else {
                console.log(status)
                addNotification({type: notificationTypes.ERROR, text: 'Error'})
            }
            this.loading = false
        },

        // async updateOrder (id, payload) {
        //     this.loading = true
        //     const { status, data } = await OrderApi.updateOrder(id, payload)
        //     if (status == responseStatus.SUCCESS){
        //         const targetOrder = this.orders.findIndex(category => {
        //             return category._id == id
        //         })
        //         console.log(targetOrder)
        //         this.orders.splice(targetOrder, 1, data)
        //         addNotification({type: notificationTypes.SUCCESS, text: 'Order Updated!'})
        //     } else {
        //         console.log(status)
        //         addNotification({type: notificationTypes.ERROR, text: 'Error'})
        //     }
        //     this.loading = false
        // },

        // async changeOrderStatus (id, payload) {
        //     this.loading = true
        //     const { status, data } = await OrderApi.changeOrderStatus(id, payload)
        //     if (status == responseStatus.SUCCESS){
        //         const targetOrder = this.orders.findIndex(order => {
        //             return order._id == id
        //         })
        //         console.log(targetOrder)
        //         console.log(data)
        //         this.orders.splice(targetOrder, 1, data)
        //         addNotification({type: notificationTypes.SUCCESS, text: 'Order Status Updated!'})
        //     } else {
        //         console.log(status)
        //         addNotification({type: notificationTypes.ERROR, text: 'Error'})
        //     }
        //     this.loading = false
        // },

        // async deleteOrder (id) {
        //     this.loading = true
        //     const { status, message } = await OrderApi.deleteOrder(id)
        //     if (status == responseStatus.SUCCESS){
        //         const targetOrder = this.orders.findIndex(order => {
        //             return order._id == id
        //         })
        //         console.log(targetOrder)
        //         this.orders.splice(targetOrder, 1)
        //         addNotification({type: notificationTypes.SUCCESS, text: 'Order Delited!'})
        //     } else {
        //         console.log(status)
        //         addNotification({type: notificationTypes.ERROR, text: 'Error'})
        //     }
        //     this.loading = false
        // }
    }
})