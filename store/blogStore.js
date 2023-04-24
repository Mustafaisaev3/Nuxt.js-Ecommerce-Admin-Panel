import { defineStore } from 'pinia'
import responseStatus from '~~/types/responseStatus'
import { BlogApi } from '~~/services/api/blogApi'
import { useUi } from './uiStore'
import notificationTypes from '~~/types/notification-types'

const { addNotification } = useUi()

export const BlogStore = defineStore({
    id: 'blog-store',

    state: () => {
        return {
            posts: [],
            blogCategories: [],
            loading: false
        }
    },

    actions: {
        // Blog Posts
        async fetchBlogPosts () {
            this.loading = true
            this.posts = await BlogApi.fetchBlogPosts()
            this.loading = false
        },
        async addBlogPost (payload) {
            this.loading = true
            const { status, data } = await BlogApi.addBlogPost(payload)
            if (status == responseStatus.SUCCESS){
                this.posts.push(data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Post Created!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },
        async updateBlogPost (id, payload) {
            console.log(id, payload)
            this.loading = true
            const { status, data } = await BlogApi.updateBlogPost(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetCategory = this.posts.findIndex(category => {
                    return category._id == id
                })
                this.posts.splice(targetCategory, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Post Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },
        async deleteBlogPost (id) {
            this.loading = true
            const { status, message } = await BlogApi.deleteBlogPost(id)
            if (status == responseStatus.SUCCESS){
                const targetCategory = this.posts.findIndex(category => {
                    return category._id == id
                })
                console.log(targetCategory)
                this.posts.splice(targetCategory, 1)
                addNotification({type: notificationTypes.SUCCESS, text: 'Post Delited!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },

        // Blog Categories
        async fetchBlogCategories () {
            this.loading = true
            this.blogCategories = await BlogApi.fetchBlogCategories()
            this.loading = false
        },
        async addBlogCategory (payload) {
            this.loading = true
            const { status, data } = await BlogApi.addBlogCategory(payload)
            if (status == responseStatus.SUCCESS){
                this.blogCategories.push(data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Blog Category Created!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },
        async updateBlogCategory (id, payload) {
            this.loading = true
            const { status, data } = await BlogApi.updateBlogCategory(id, payload)
            if (status == responseStatus.SUCCESS){
                const targetCategory = this.blogCategories.findIndex(category => {
                    return category._id == id
                })
                console.log(targetCategory)
                this.blogCategories.splice(targetCategory, 1, data)
                addNotification({type: notificationTypes.SUCCESS, text: 'Blog Category Updated!'})
            } else {
                console.log(status)
            }
            this.loading = false
        },
        async deleteBlogCategory (id) {
            this.loading = true
            const { status, message } = await BlogApi.deleteBlogCategory(id)
            if (status == responseStatus.SUCCESS){
                const targetCategory = this.blogCategories.findIndex(category => {
                    return category._id == id
                })
                console.log(targetCategory)
                this.blogCategories.splice(targetCategory, 1)
                addNotification({type: notificationTypes.SUCCESS, text: 'Blog Category Delited!'})
            } else {
                console.log(status)
            }
            this.loading = false
        }
    }
})