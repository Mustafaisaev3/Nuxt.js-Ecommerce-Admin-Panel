import { defineStore } from 'pinia'

export const useUi = defineStore({
    id: 'ui-store',

    state: () => {
        return {
            // Modal
            showModal: false,
            modalView: '',
            modalData: null, 

            // Notification
            notifications: [],
            notificationsData: null,
        }
    },

    getters: {
        isNotifications () {
            return !!this.notifications.length
        },
    },

    actions: {
        // Modal
        openModal () {
            this.showModal = true
            console.log('openModal')
        },
        closeModal () {
            console.log('closeModal')
            this.showModal = false
        },
        setModalView (view) {
            console.log(view)
            this.modalView = view
        },
        setModalData (data) {
            this.modalData = data
        },

        // Notifications
        addNotification(payload) {
            this.notifications.push({id: Math.random() + 1000, ...payload})
            this.deleteNotification()
        },
        deleteNotification() {
            setTimeout(() => {
                this.notifications.shift()
            }, 5000)
        },
        deleteNotificationById(id) {
            console.log(id)
            const foundNotificationIndex = this.notifications.findIndex(notification => {
                return notification.id === id
            })
            this.notifications.splice(foundNotificationIndex, 1)
            // this.notifications.filter(notification => {
            //     return notification.id != id
            // })
        },
    }
})