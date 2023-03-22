<template>
    <div class="w-full h-auto mb-[20px]">
      <label v-if="label">{{ label }}</label>
      <textarea 
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          v-bind="$attrs"
          :class="{'error': error}"
      />
      <span v-if="error" class="text-[red] text-[13px]">{{ error }}</span>
    </div>
</template>

<script setup>

const props = defineProps(['label', 'modelValue', 'error'])

</script>

<style scoped>
    label {
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 1;
        display: inline-block;
    }

    textarea {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        padding: 5px 15px;
        outline: 0;
        font-weight: 400;
        font-size: 14px;
        width: 100%;
        margin-top: 5px;
        line-height: 20px;
        border-radius: 2px;
        color: #999;
    }

    textarea.error {
        border-color: red;
    }
</style>