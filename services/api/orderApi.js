import axios from '~/core/axios'

export const OrderApi = {
    async fetchOrders () {
        const { data } = await axios.get('/orders');
        return data.data;
    },    
    async addOrder (payload){
        const { data } = await axios.post('/order', payload);
        console.log(data)
        
        return data;
    },  
    async updateOrder (id, payload){
        console.log(payload)
        const { data } = await axios.post(`/order/${id}`, payload);
        console.log(data)

        return data;
    },  
    async changeOrderStatus (id, payload){
        console.log(payload)
        const { data } = await axios.post(`/order/${id}/status`, {orderStatus: payload});
        console.log(data)

        return data;
    },  
    async deleteOrder (id){
        const { data } = await axios.delete(`/order/${id}`)
        return data;
    }
}