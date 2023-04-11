import axios from '~/core/axios'

export const CustumerApi = {
    async fetchCustumers () {
        const { data } = await axios.get('/custumers');
        return data.data;
    },  
    async fetchCustumerOrders (id) {
        const { data } = await axios.get(`/orders/user/${id}`);
        return data.data;
    },
    // async addCategory (payload){
    //     const { data } = await axios.post('/category', payload, {
    //         header : {
    //             'Content-Type' : 'multipart/form-data'
    //         }
    //     });
    //     console.log(data)
        
    //     return data;
    // },  
    // async updateCategory (id, payload){
    //     console.log(payload)
    //     const { data } = await axios.put(`/category/${id}`, payload, {
    //         header : {
    //             'Content-Type' : 'multipart/form-data'
    //         }
    //     });
    //     console.log(data)

    //     return data;
    // },  
    // async deleteCategory (id){
    //     const { data } = await axios.delete(`/category/${id}`)
    //     return data;
    // }
}