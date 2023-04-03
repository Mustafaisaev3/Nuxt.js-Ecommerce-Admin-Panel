<template>
  <div class="w-full flex items-center justify-center">
    <div class="px-2 py-1 rounded-3xl text-sm leading-tight" :class="props.status">{{ props.status }}</div>
  </div>
</template>

<script setup>

const props = defineProps({
    status: {
        type: String,
        required: true
    }
})

</script>

<style scoped>
.pending {
    color: #ffc281;
    background-color: #9f580a;
}
.delivered {
    color: #17ffb2;
    background-color: #03543f;
}
.processing {
    color: #6fd1ff;
    background-color: #1e429f;
}
.cancel {
    color: #ffb7aa;
    background-color: #bc1919;
}
</style>