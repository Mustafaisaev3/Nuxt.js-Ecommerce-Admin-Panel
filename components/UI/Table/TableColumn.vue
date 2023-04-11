<template>
  <div class="table-column" :style="{'justify-content': align, 'align-items': verticalAlign}">
    <div v-if="!image" class="w-full flex overflow-hidden">
        <slot></slot>
    </div>
    <img v-else class="table-column-image" :src="srcImg" alt="image">
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
    },
    align: {
        type: String,
        required: false
    },
    verticalAlign: {
        type: String,
        required: false
    }
})
</script>

<style scoped>
.table-column {
    height: 100%;
    width: 100%;
    padding: 10px 10px;
    display: flex;
    position: relative;
    border-right: 2px solid #EEEFF4;
    overflow: hidden;
}

.table-column:last-child{
    border-right: none;
}

.table-column-image {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
}

.table-column__title {
    margin-right: 5px;
    display: none;
}
</style>