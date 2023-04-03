<template>
  <div class="h-full p-[20px]">
    <div class="product-page-title text-[30px] pb-[20px]">
      Edit Profile
    </div>
    <Box :padding="'30px'">
      <div class="w-full h-auto grid grid-cols-2 gap-5">

        <h2 class="field-title">Profile Picture</h2>
        <UploadImage :only-one="true" @get-images="image => userObj.userImage = image" />

        <h2 class="field-title">Name</h2>
        <Input v-model="userObj.userName" :placeholder="'Your Name'" />

        <h2 class="field-title">Email</h2>
        <Input v-model="userObj.userEmail" :placeholder="'Your Email'" />

        <h2 class="field-title">Contact Number</h2>
        <Input v-model="userObj.userContactNumber" :placeholder="'Your Contact Number'" />

      </div>
      <div class="w-full h-auto flex justify-end pt-[20px]">
        <Button :color="'primary'" :label="'Update Profile'" @click="handleUpdateUserProfile" />
      </div>
    </Box>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Box from '~~/components/Box.vue';
import Input from '~~/components/UI/Input/Input.vue';
import Button from '~~/components/UI/Button/Button.vue';
import UploadImage from '~~/components/UI/UploadImage/UploadImage.vue';

const userObj = reactive({
  userName: '',
  userEmail: '',
  userContactNumber: '',
  userImage: null
})

const handleUpdateUserProfile = () => {
  console.log(userObj)
}

</script>

<style scoped>
.field-title {
  font-weight: 600;
}
</style>