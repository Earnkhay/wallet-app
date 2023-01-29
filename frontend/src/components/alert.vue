<template>
    <div :class="[alertType == 'Success' ? 'alert-success' : 'alert-danger']" class="alert" role="alert">
        <span class="me-2"><i class="fa-solid" :class="[alertType == 'Success' ? 'fa-circle-check' : 'fa-circle-exclamation']"></i></span>{{alertText}}
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
