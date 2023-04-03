<template>
  <div class="w-full h-screen overflow-hidden flex px-[40px] py-[20px] relative">
    <Sidebar />
    <div class="main-content w-full">
        <Header />
        <slot />
    </div>
    <Modal />
    <Notification />
    <ConfirmationModal />
  </div>
</template>

<script setup>
import Sidebar from '~~/components/Layout/Sidebar.vue';
import Header from '~~/components/Layout/Header.vue';
import Modal from '~~/components/UI/Modal/Modal.vue';
import Notification from '~~/components/UI/Notification/Notification.vue';
import ConfirmationModal from '~~/components/UI/ConfirmationModal/ConfirmationModal.vue';

</script>

<style>

</style>