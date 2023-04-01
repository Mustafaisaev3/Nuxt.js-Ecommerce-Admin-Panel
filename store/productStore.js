import { defineStore } from "pinia"
import responseStatus from "~~/types/responseStatus"
import { ProductApi } from "~~/services/api/productApi"
import { useUi } from './uiStore'
import notificationTypes from '~~/types/notification-types'

const { addNotification } = useUi()

export const ProductStore = defineStore({
    id: 'product-store',

    state: () => {
        return {
            products: [],
            loading: false
        }
    },

    actions: {
        async fetchProducts () {
            this.loading = true
            this.products = await ProductApi.fetchProducts()
            this.loading = false
        },

        async addProduct (payload) {
            this.loading = true
            const { status, data } = await ProductApi.addProduct(payload)
            console.log(status, data, 'payload')
            if (status == responseStatus.SUCCESS){
                this.products.push(data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Product Created!'})
            } else {
                console.log(status)
                addNotification({type: notificationTypes.ERROR, text: 'Error'})
            }
            this.loading = false
        },

        async updateProduct (id, payload) {
            this.loading = true
            const { status, data } = await ProductApi.updateProduct(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetProduct = this.products.findIndex(category => {
                    return category._id == id
                })
                console.log(targetProduct)
                this.products.splice(targetProduct, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Product Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        async deleteProduct (id) {
            this.loading = true
            const { status, message } = await ProductApi.deleteProduct(id)
            if (status == responseStatus.SUCCESS){
                const targetProduct = this.products.findIndex(product => {
                    return product._id == id
                })
                console.log(targetProduct)
                this.products.splice(targetProduct, 1)
                addNotification({type: notificationTypes.SUCCESS, text: 'Product Delited!'})
            } else {
                console.log(status)
            }
            this.loading = false
        }
    }
})