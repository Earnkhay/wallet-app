<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-center align-items-center" style="min-height: 70vh;">
        <div class="col-md-12 table-responsive">
          <div class="text-center mb-4">
              <h1 class="page-title">All users</h1>
          </div>
          <table class="table">
            <thead>
              <tr>
                <!-- <th scope="col">#</th> -->
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created at</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="spinnerShow">
                  <td colspan="4"> <spinner :spinnerSize="spinnerSize"></spinner></td>  
              </tr>
              <tr v-for="(user, id) in users" :key="id">
                <!-- <th scope="row">{{ index + 1 }}</th> -->
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{new Date(user.createdAt).toLocaleString()}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios'
import spinner from '../components/spinner.vue'

@Options({
  components: {
    spinner
  },
})
export default class HomeView extends Vue {
  API_URL = "http://localhost:5000/api/users";
  users: any = []
  spinnerShow = false
  spinnerSize = "spinner-border-lg"

  mounted(){
    this.spinnerShow = true
    axios.get(`${this.API_URL}/users`, {
        timeout: 5000
    })
      .then((res) => {
        // console.log(res.data, 'data from mongodb')
        this.spinnerShow = false
        this.users = res.data
      })
      .catch(err => console.error(err));
  }
}
</script>
