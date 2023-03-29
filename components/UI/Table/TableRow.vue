<template>
  <div class="table-row" :style="{'grid-template-columns': columnTemplates, maxHeight, height }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
    columnTemplates: {
        type: String,
        required: false
    },
    maxHeight: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
})
</script>

<style scoped>
.table-row {
    border-bottom: 2px solid #EEEFF4;
    position: relative;
    display: grid;
    overflow: hidden;
    /* column-gap: 10px; */
    align-items: center;
    /* padding: 0 16px; */

}

.table-row:last-child{
    border-bottom: none;
}

</style>