<template>
  <div class="table-column">
    <slot v-if="!image"></slot>
    <img v-else class="table-coumn-image" :src="srcImg" alt="image">
  </div>
</template>

<script setup>
const props = defineProps({
    image: {
        type: Boolean,
        required: false
    },
    srcImg: {
        type: String,
        required: false
    }
})
</script>

<style scoped>
.table-column {
    height: 100%;
    width: 100%;
    padding: 15px 10px;
    position: relative;
    border-right: 2px solid #EEEFF4;
}

.table-column:last-child{
    border-right: none;
}

.table-coumn-image {
    max-width: 100%;
}

.table-coumn__title {
    margin-right: 5px;
    display: none;
}
</style>