import axios from '~/core/axios'

export const ProductApi = {
    async fetchProducts () {
        const { data } = await axios.get('/products');
        console.log(data.data)
        return data.data;
    },
    async addProduct (payload) {
        const { data } = await axios.post('/product/new', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(data)
        
        return data;
    },
    async updateProduct (id, payload){
        console.log(payload)
        const { data } = await axios.put(`/product/${id}`, payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(data)

        return data;
    },  
    async deleteProduct (id) {
        const { data } = await axios.delete(`/product/${id}`, id, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(data)
        
        return data;
    }
}