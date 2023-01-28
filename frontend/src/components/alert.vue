<template>
    <div :class="[alertType == 'Success' ? 'bg-success' : 'bg-danger']" class="alertComp">
        <p class="mt-1 mb-1"><span class="pe-2"><i class="fa-solid" :class="[alertType == 'Success' ? 'fa-circle-check' : 'fa-circle-exclamation']"></i></span>{{alertText}}</p>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
@Options({
    props: {
        alertText: String,
        alertType: String
    }
})

export default class alert extends Vue {
    alertType: string | undefined;
    alertText: string | undefined;
}
</script>

<style scoped>
.alertComp{
    padding: 5px;
    border-radius: 10px;
    color: white;
}
</style>