import { defineStore } from 'pinia'

export const useUi = defineStore({
    id: 'ui-store',

    state: () => {
        return {
            showModal: true,
            modalView: '',
            modalData: null, 
        }
    },

    getters: {
        // showModal () {
        //     return this.state.showModal
        // }
    },

    actions: {
        openModal () {
            this.showModal = true
            console.log('openModal')
        },
        closeModal () {
            console.log('closeModal')
            this.showModal = false
        },
        setModalView (view) {
            this.modalView = view
        },
        setModalData (data) {
            this.modalData = data
        },
    }
})