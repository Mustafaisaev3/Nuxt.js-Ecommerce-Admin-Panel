import axios from '~/core/axios'

export const OptionApi = {
    async fetchOptions () {
        const { data } = await axios.get('/options');
        return data.data;
    },    
    async addOption (payload){
        const { data } = await axios.post('/option', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(data)
        
        return data;
    }
}