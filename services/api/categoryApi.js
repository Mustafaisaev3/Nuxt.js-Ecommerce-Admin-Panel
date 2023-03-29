import axios from '~/core/axios'

export const CategoryApi = {
    async fetchCategories () {
        const { data } = await axios.get('/category');
        return data.data;
    },  
    async addCategory (payload){
        const { data } = await axios.post('/category', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(data)
        
        return data;
    },  
    async updateCategory (id, payload){
        console.log(payload)
        const { data } = await axios.put(`/category/${id}`, payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(data)

        return data;
    },  
    async deleteCategory (id){
        const { data } = await axios.delete(`/category/${id}`)
        return data;
    }
}