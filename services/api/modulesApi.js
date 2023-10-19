import axios from '~/core/axios'

export const ModulesApi = {
    // Fetch All Modules
    async fetchAllModules () {
        const { data } = await axios.get('/all-modules');
        return data.data;
    },  

    // Pages Layout
    async fetchPageLayout (page) {
        const { data } = await axios.get(`/get-page-layout/${page}`);
        return data.data;
    },  

    async createPageLayout (payload) {
        const { data } = await axios.post('/create-page-layout', payload);
        return data;
    },  

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


    // Popular Categories
    async fetchPopularCategories (){
        const { data } = await axios.get('/popular-categories');
        
        return data;
    }, 

    async updatePopularCategories (payload){
        console.log('popular', payload)
        const { data } = await axios.post('/popular-categories', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        
        return data;
    }, 

    // Triple Banner
    async fetchTripleBanner (){
        const { data } = await axios.get('/triple-banner');
        
        return data;
    }, 

    async updateTripleBanner (payload){
        console.log('popular', payload)
        const { data } = await axios.post('/triple-banner', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        
        return data;
    }, 

    // Brands Banner
    async fetchBrands (){
        const { data } = await axios.get('/brands-banner');
        console.log(data, 'baaaaaaaaaaaaa')
        return data.data;
    }, 

    async updateBrandsBanner (payload){
        console.log('brands', payload)
        const { data } = await axios.post('/brands-banner', payload, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        
        return data;
    }, 

    // Blog Slider
    async fetchBlogSlider (){
        const { data } = await axios.get('/blog-slider');
        console.log(data, 'baaaaaaaaaaaaa')
        return data.data;
    }, 

    async updateBlogSlider (payload){
        console.log('Blog Slider', payload)
        const { data } = await axios.post('/blog-slider', payload);
        
        return data;
    }, 

}