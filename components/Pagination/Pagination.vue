<template>
  <div class="w-auto h-auto flex items-center">
    <div class="pagination-item"><IconLeft /></div>
    <div class="pagination-item">1</div>
    <div class="pagination-item active">2</div>
    <div class="pagination-item">...</div>
    <div class="pagination-item">5</div>
    <div class="pagination-item"><IconRight /></div>
  </div>
</template>

<script setup>
import IconLeft from '~icons/mdi/chevron-left'
import IconRight from '~icons/mdi/chevron-right'

</script>

<style scoped>
.pagination-item {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* color: white; */
    border-radius: 3px;
    cursor: pointer;
}

.pagination-item:hover {
    background: #e8e8e8;
}

.pagination-item.active {
    background: #00b7ff;
    color: white;
}
</style>