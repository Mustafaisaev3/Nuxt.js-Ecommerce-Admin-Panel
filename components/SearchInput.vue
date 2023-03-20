<template>
  <div class="w-[400px] h-[50px] rounded-lg bg-[#f0f0f0] px-3">
    <label for="search-input" class="w-full h-full flex items-center gap-3">
        <IconSearch class="text-[20px]" />
        <input type="text" placeholder="Search..." class="w-full h-full bg-transparent outline-none">
    </label>
  </div>
</template>

<script setup> 
import IconSearch from '~icons/mdi/magnify'

</script>

<style>

</style>