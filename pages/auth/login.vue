<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-[500px] h-auto rounded-md bg-[#00b7ff] p-[30px]">
      <h1 class="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
      <form>
        <div class="flex flex-col gap-4">
          <Input placeholder="email" :label="'Email'" :label-styles="'color: white'"/>
          <Input placeholder="password" :label="'Password'" :label-styles="'color: white'"/>
        </div>
        <Button :color="'secondary'" :label="'Login'" class="w-full hover:bg-slate-400" :style="{marginTop: '20px'}" />
      </form>
    </div>
  </div>
</template>

<script setup>
import Input from '@/components/UI/Input/Input.vue'
import Button from '@/components/UI/Button/Button.vue'

definePageMeta({
    layout: 'auth'
})
</script>

<style>

</style>