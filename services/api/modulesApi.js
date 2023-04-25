import axios from '~/core/axios'

export const ModulesApi = {
    // Home Main Banners
    async fetchMainBanner () {
        const { data } = await axios.get('/main-banner');
        return data.data;
    },  

    async addMainBannerSlides (payload){
        const { data } = await axios.post('/main-banner', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        
        return data;;
    }, 

    async updateBlogPost (id, payload){
        console.log(payload)
        const { data } = await axios.put(`/post/${id}`, payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });

        return data;
    },  

    async deleteBlogPost (id){
        const { data } = await axios.delete(`/post/${id}`)
        return data;
    },


}