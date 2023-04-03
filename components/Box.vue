<template>
  <div class="py-[10px] px-[20px] border-[2px] border-[#EEEFF4] rounded-[5px]" :style="{'padding': padding}">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  padding: {
    type: String,
    required: false
  }
})
</script>

<style>

</style>