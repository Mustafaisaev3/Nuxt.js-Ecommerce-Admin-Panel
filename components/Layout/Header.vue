<template>
  <header class="w-full h-[70px] flex items-center justify-between px-[20px]">
    <div class="search">
        <SearchInput />
    </div>
    <div class="user-bar w-auto h-full flex items-center gap-6">
        <IconChat class="text-[20px] cursor-pointer hover:text-[#16bcdc]" />
        <IconBell class="text-[20px] cursor-pointer hover:text-[#16bcdc]"/>
        <Dropdown 
            :data="[
                {title: 'Vendor List', link: '/product'}, 
                {title: 'Vendor Grid', link: '/product/grid'}, 
                {title: 'Vendor Profile', link: '/'}
            ]"
        >
            <div class="flex items-center gap-2">
                <div class="w-[40px] h-[40px] rounded-full  overflow-hidden">
                    <img class="w-full h-full" src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png" alt="">
                </div>
                <div>Test Testovic</div>
            </div>
        </Dropdown>
    </div>
  </header>
</template>

<script setup>
import IconChat from '~icons/mdi/message-text'
import IconBell from '~icons/mdi/bell'
import Dropdown from '../UI/Dropdown/Dropdown.vue'

</script>

<style>

</style>