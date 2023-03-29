<template>
    <div class="w-full h-[50px] border border-[#f06548] rounded bg-white mb-2 overflow-hidden">
      <div class="w-full h-full p-2 border-b-[3px] border-[#f06548] flex items-center justify-between">
          <div>{{ data.text }}</div>
          <div class="cursor-pointer">
            <IconClose @click="() => deleteNotificationById(data.id)" />
          </div>
      </div>  
    </div>
  </template>
  
  <script setup>
  import IconClose from '~icons/mdi/close'
  import { useUi } from '~~/store/uiStore';
  const props = defineProps(['data'])

  const { deleteNotificationById } = useUi()
  // export default {
  //   props: ['data'],
  //   components: {
  //       IconClose
  //   },
    
  //   methods: {
  //       deleteNotification () {
  //           this.$store.commit(UIActionsType.DELETE_NOTIFICATION_BY_ID, this.data.id)
  //       }
  //   }
  // }
  </script>
  
  <style>
  
  </style>