<template>
  <button :class="['btn', `btn_${color}`]">{{ label }}</button>
</template>

<script setup>

const props = defineProps({
    label: {
        type: String,
        default: 'Button'
    },
    color: {
        type: String,
        default: 'primary'
    },
})
</script>

<style scoped>
.btn {
    margin-right: 10px;
    /* margin-bottom: 10px; */
    padding: 0 20px;
    height: 40px;
    color: #fff;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    transition: .2s;
}

/* Primary Button */
.btn_primary {
    background: #00b7ff;
}
.btn_primary:hover {
    background: #00a6e8;
}

/* Secondary Button */
.btn_secondary {
    background: #fff;
    color: #00b7ff;
    border: 1px solid #00b7ff;
}
.btn_secondary:hover {
    background: #00a6e8;
    color: #fff;
}

/* Success Button */
.btn_success {
    background: #00C48C;
}
.btn_success:hover {
    background: #7DDFC3;
}

/* Info Button */
.btn_info {
    background: #0084F4;
}
.btn_info:hover {
    background: #66B5F8;
}

/* Warning Button */
.btn_warning {
    background: #FFA26B;
}
.btn_warning:hover {
    background: #FFC7A6;
}

/* Danger Button */
.btn_danger {
    background: #FF647C;
}
.btn_danger:hover {
    background: #FDAFBB;
}
</style>