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


    // Sliders

    async fetchSliders (){
        const { data } = await axios.get('/sliders');
        
        return data;
    }, 

    async addSlider (payload){
        const { data } = await axios.post('/slider', payload);
        
        return data;
    }, 

    async updateSlider (id, payload){
        const { data } = await axios.put(`/slider/${id}`, payload);
        
        return data;
    }, 

    async deleteSlider (id){
        const { data } = await axios.delete(`/slider/${id}`);
        
        return data;
    }, 

}