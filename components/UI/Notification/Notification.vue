<template>
    <teleport to="body" >
      <div v-if="uiStore.isNotifications" class="w-[300px] h-auto fixed top-5 right-5 z-[1000]">
          <component v-for="notification in notifications" :key="notification" :is="NotificationViews[notification.type]" :data="notification"></component>
      </div>
    </teleport>
  </template>
  
<script setup>
  import { useUi } from '~~/store/uiStore'
  import Success from './NotificationViews/Success.vue'
  import Error from './NotificationViews/Error.vue'
  import Warning from './NotificationViews/Warning.vue'
  import notificationTypes from '~~/types/notification-types'

  const uiStore = useUi()
  const { notifications } = useUi()
  
  const NotificationViews = {
      [notificationTypes.SUCCESS] : Success,
      [notificationTypes.ERROR] : Error,
      [notificationTypes.WARNING] : Warning,
  }
  
</script>

<style>

</style>