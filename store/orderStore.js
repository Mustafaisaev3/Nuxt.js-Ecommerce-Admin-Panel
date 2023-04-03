import { defineStore } from "pinia";
import { OrderApi } from "~~/services/api/orderApi";
import responseStatus from "~~/types/responseStatus";

export const OrderStore = defineStore({
    id: 'order-store',

    state: () => {
        return {
            orders: [],
            loading: false
        }
    },

    actions: {
        async fetchOrders () {
            this.loading = true
            this.orders = await OrderApi.fetchOrders()
            this.loading = false
        },

        async addOrder (payload) {
            this.loading = true
            const { status, data } = await OrderApi.addOrder(payload)
            console.log(status, data, 'payload')
            if (status == responseStatus.SUCCESS){
                this.orders.push(data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Order Created!'})
            } else {
                console.log(status)
                addNotification({type: notificationTypes.ERROR, text: 'Error'})
            }
            this.loading = false
        },

        async updateOrder (id, payload) {
            this.loading = true
            const { status, data } = await OrderApi.updateOrder(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetOrder = this.orders.findIndex(category => {
                    return category._id == id
                })
                console.log(targetOrder)
                this.orders.splice(targetOrder, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Order Updated!'})
            } else {
                console.log(status)
                addNotification({type: notificationTypes.ERROR, text: 'Error'})
            }
            this.loading = false
        },

        async changeOrderStatus (id, payload) {
            this.loading = true
            const { status, data } = await OrderApi.changeOrderStatus(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetOrder = this.orders.findIndex(order => {
                    return order._id == id
                })
                console.log(targetOrder)
                console.log(data)
                this.orders.splice(targetOrder, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Order Status Updated!'})
            } else {
                console.log(status)
                addNotification({type: notificationTypes.ERROR, text: 'Error'})
            }
            this.loading = false
        },

        async deleteOrder (id) {
            this.loading = true
            const { status, message } = await OrderApi.deleteOrder(id)
            if (status == responseStatus.SUCCESS){
                const targetOrder = this.orders.findIndex(order => {
                    return order._id == id
                })
                console.log(targetOrder)
                this.orders.splice(targetOrder, 1)
                addNotification({type: notificationTypes.SUCCESS, text: 'Order Delited!'})
            } else {
                console.log(status)
                addNotification({type: notificationTypes.ERROR, text: 'Error'})
            }
            this.loading = false
        }
    }
})