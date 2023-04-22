<template>
    <div class="w-auto h-auto">
      <label :style="labelStyles">{{ label }}</label>
      <div class="content">
          <slot></slot>
      </div>
    </div>
</template>

<script setup>

const props = defineProps(['label', 'labelStyles'])

</script>

<style scoped>
    label {
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 1;
        display: inline-block;
    }

    .content {
        outline: 0;
        font-weight: 400;
        font-size: 14px;
        /* border: 2px solid #ddd; */
        width: 100%;
        margin-top: 5px;
        line-height: 50px;
        height: auto;
    }
</style>