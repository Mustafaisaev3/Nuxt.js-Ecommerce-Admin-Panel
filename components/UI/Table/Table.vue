<template>
    <div class="table-wrapper">
        <div class="table">
            <div class="table-head" :style="{'grid-template-columns': columnTemplates}">
                <div 
                    class="table-head__name"
                    v-for="(element, i) in head"
                    :key="i"
                >
                    {{ element }}
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    head: {
        type: Array,
        required: false
    },
    columnTemplates: {
        type: String,
        required: false
    },
})
</script>

<style scoped>
.table {
    background-color: #fff;
    width: 100%;
    margin-bottom: 40px;
    margin-top: 15px;
    border: 2px solid #EEEFF4;
}

.table-wrapper {
    display: flex;
    justify-content: center;
}
.table-head {
    /* padding: 5px 16px; */
    padding: 5px 0px;
    display: grid;
    column-gap: 10px;
    align-items: center;
    border-bottom: 2px solid #EEEFF4;

}
.table-head__name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;
    color: #999;
    cursor: pointer;
    border-right: 2px solid #EEEFF4;
}

.table-head__name:last-child{
    border-right: 0;
}
</style>