<template>
  <div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import Swal from 'sweetalert2'

@Options({
    props: {
      icon: String,
      title: String,
      // showToast: Boolean
    }
})

export default class toast extends Vue {
  $swal: any
  icon: any
  title: any
  displayToast() {
    this.$swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon: this.icon,
      title: this.title,
    })
  }    
  mounted(){
    // this.showToast()
    this.$swal = Swal;
    this.displayToast()
    // if (this.showToast) {
    //   this.displayToast();
    //   console.log(this.showToast, 'toast comp', this.displayToast());
    // }
  }
}
</script>

<style scoped>
</style>