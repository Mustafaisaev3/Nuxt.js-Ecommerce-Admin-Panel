<template>
  <div class="w-[250px] h-full  border-r flex flex-col">
        <div class="logo w-full h-[70px] flex items-center text-[30px] text-[#16bcdc] border-b border-r rounded-br-[20px]">LOGO</div>
        <div class="menu flex-grow border border-l-0 rounded-r-[20px]">
            <ul class="w-full h-full flex flex-col gap-6 py-[30px]">
                <li>
                    <NuxtLink :to="'/'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconChartHistogram class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Overview</div>
                    </NuxtLink>
                </li>
                <SidebarDropdown :data="[
                        {title: 'Produtcs', link: '/product'}, 
                        {title: 'Options', link: '/product/options'}, 
                        // {title: 'Vendor Profile', link: '/'}
                    ]"
                >
                    <div class="flex gap-2">
                        <div class="w-[25px]">
                            <IconProduct class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Product</div>
                    </div>
                </SidebarDropdown>
                <SidebarDropdown :data="[
                        {title: 'Blog Posts', link: '/blog'}, 
                        {title: 'Blog Categories', link: '/blog/categories'},  
                        // {title: 'Vendor Profile', link: '/'}
                    ]"
                >
                    <div class="flex gap-2">
                        <div class="w-[25px]">
                            <IconBlog class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Blog</div>
                    </div>
                </SidebarDropdown>
                <SidebarDropdown :data="[
                        {title: 'Banners', link: '/modules/banners'}, 
                        {title: 'Sliders', link: '/modules/sliders'},  
                        {title: 'Modules Layout', link: '/modules/layout'}, 
                        // {title: 'Vendor Profile', link: '/'}
                    ]"
                >
                    <div class="flex gap-2">
                        <div class="w-[25px]">
                            <IconModules class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Modules</div>
                    </div>
                </SidebarDropdown>
                <!-- <li>
                    <NuxtLink :to="'/modules'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconModules class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Modules</div>
                    </NuxtLink>
                </li> -->
                <li>
                    <NuxtLink :to="'/category'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconCategory class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Categories</div>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="'/custumer'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconUser class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Custumers</div>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="'/orders'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconOrder class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Orders</div>
                    </NuxtLink>
                </li>
                <!-- <li>
                    <NuxtLink :to="'/checkout'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconCart class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Checkout</div>
                    </NuxtLink>
                </li> -->
                <li>
                    <NuxtLink :to="'/settings'" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconSetting class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Settings</div>
                    </NuxtLink>
                </li>

            </ul>
        </div>
        <div class="sidebar-bottom w-full h-auto border-r border-t rounded-tr-[20px]">
            <!-- <ul class="flex flex-col gap-4 py-[20px]">
                <li>
                    <a href="#" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="text-[15px]">Help</div>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="text-[15px]">Contact As</div>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center gap-2 hover:text-[#16bcdc] ">
                        <div class="w-[25px]">
                            <IconLogout class="text-[20px]" />
                        </div>
                        <div class="text-[15px]">Settings</div>
                    </a>
                </li>
            </ul> -->
            <div class="py-[20px] pr-[20px]">
                <Button :color="'primary'" :label="'Log Out'" class="w-full" />
            </div>
        </div>
    </div>
</template>

<script setup>
import IconChartHistogram from '~icons/mdi/chart-histogram'
import IconCart from '~icons/mdi/cart'
import IconProduct from '~icons/mdi/purse'
import IconCategory from '~icons/mdi/format-list-bulleted'
import IconUser from '~icons/mdi/account'
import IconBlog from '~icons/mdi/blogger'
import IconOrder from '~icons/mdi/clipboard-edit'
import IconModules from '~icons/mdi/monitor-dashboard'
import IconSetting from '~icons/mdi/cog'
import IconLogout from '~icons/mdi/logout'
import SidebarDropdown from '../UI/SidebarDropdown/SidebarDropdown.vue'
import Button from '../UI/Button/Button.vue'

</script>

<style>

</style>