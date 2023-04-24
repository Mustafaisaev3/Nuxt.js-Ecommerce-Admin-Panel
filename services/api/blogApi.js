import axios from '~/core/axios'

export const BlogApi = {
    // Blog Posts
    async fetchBlogPosts () {
        const { data } = await axios.get('/posts');
        return data.data;
    }, 

    async fetchBlogPostById (id) {
        const { data } = await axios.get(`/product/${id}`);
        return data.data;
    }, 

    async addBlogPost (payload){
        const { data } = await axios.post('/post', payload, {
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

    // Blog Categories
    async fetchBlogCategories () {
        const { data } = await axios.get('/blog-categories');
        return data.data;
    },  

    async addBlogCategory (payload){
        const { data } = await axios.post('/blog-categories', payload)
        console.log(data)
        
        return data;
    }, 

    async updateBlogCategory (id, payload){
        console.log(payload)
        const { data } = await axios.put(`/blog-categories/${id}`, payload);

        return data;
    },  

    async deleteBlogCategory (id){
        const { data } = await axios.delete(`/blog-categories/${id}`)
        return data;
    }
}