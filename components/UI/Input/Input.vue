<template>
    <div class="w-auto h-auto">
      <label v-if="label" :style="labelStyles">{{ label }}</label>
      <input 
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          v-bind="$attrs"
          :class="{'error': error}"
      />
      <span v-if="error" class="text-[red] text-[13px]">{{ error }}</span>
    </div>
</template>

<script setup>

const props = defineProps(['label', 'modelValue', 'error', 'labelStyles'])

</script>

<style scoped>
    label {
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 1;
        display: inline-block;
    }

    input {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        padding: 0 15px;
        outline: 0;
        font-weight: 400;
        font-size: 14px;
        /* border: 2px solid #ddd; */
        width: 100%;
        margin-top: 5px;
        line-height: 50px;
        height: 50px;
        color: #999;
    }

    input.error {
        border-color: red;
    }
</style>