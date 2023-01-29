<template>
<div id="app" class="bg-light">
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <div class="container">
        <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
            <div class="col-md-6">
                <div class="text-center">
                    <h1 class="page-title">{{pageType == "signUp" ? 'Create Account' : 'Log In'}} </h1>
                    <alert v-if="alertShow" :alertText="alertTitle" :alertType="alertType"></alert>
                </div>
                <form action="" id="login-form">   
                    <div class="mb-3" v-if="pageType == 'signUp'">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="username" placeholder="Your name" v-model="name">
                    </div>
                    
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Input Email" v-model="email" @blur="validateEmail">
                    </div>

                    <div class="mb-4">
                        <label for="inputPassword" class=" form-label">Password</label>
                        <div class="d-flex">
                        <input :type="passwordType" class="form-control password" id="inputPassword" placeholder="Input Password" v-model="password" @input="checkpageTypePassword">
                        <i class="fa-solid icon" :class="{'fa-eye': showEye, 'fa-eye-slash': !showEye}" id="togglePassword" @click="toggleVisibility"></i>
                        </div>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="mb-2 btn bg-dark text-light w-100"  data-bs-dismiss="page" aria-label="Close" id="signup" @click.prevent="checkpageTypeAuth(pageType)">
                            <spinner v-if="spinnerShow" :spinnerSize="spinnerSize"/>
                            <div v-else>
                                {{ pageType == "signUp" ? "Sign Up" : "Sign In"}}
                            </div>
                        </button>
                    </div>
                    <p id="account" class="text-center"> {{pageType == "signUp" ? "Already have an account?" : "Don't have an account?"}} 
                    <a href="" id="link" @click.prevent="setLoginPage" class="text-decoration-none">{{ pageType == "signUp" ? "Log in here" : "Sign up here" }}</a></p>
                </form>  
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import alert from '../components/alert.vue'
import toast from '../components/toast.vue'
import spinner from '../components/spinner.vue'

@Options({
    components: {
        alert, 
        toast,
        spinner
    },
})
export default class login extends Vue {
    passwordType = 'password'
    pageType ="signUp"
    name = ""
    email = ""
    password = ""
    alertTitle = ""
    alertType = ""
    alertShow = false
    toastIcon = ''
    toastTitle = ''
    toastShow = false
    spinnerShow = false
    spinnerSize = "spinner-border-sm"
    mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    API_URL = "http://localhost:5000/api/users";
    $router: any

    setLoginPage(){     
        if(this.pageType == "signUp"){
            this.pageType = "login"
            this.email = ""
            this.password = ""
        }else if(this.pageType == "login"){
            this.pageType = "signUp"
            this.email = ""
            this.password = ""
        }
    }
    toggleVisibility() {
        if (this.showEye) this.passwordType = "text";
        else this.passwordType = "password";
    }
    get showEye() {
        return this.passwordType == "password";
    }

    validateEmail() {
        if (this.mailformat.test(this.email)) {
            // console.log('valid email address');
        } else if(this.email == ""){
            this.alertTitle = "Please input Email address"
            this.alertType = "Danger"
            this.alertShow = true
            setTimeout(
                () => {
                    this.alertShow = false
            },3000)
        }else{
            this.alertTitle = "Please input valid Email address"
            this.alertType = "Danger"
            this.alertShow = true
            setTimeout(
                () => {
                    this.alertShow = false
                    this.email = ""
            },3000)
        }
    }
    validatePassword() {
        if (this.regPassword.test(this.password)) {
            this.alertShow = false
        }else if(this.password == ""){
            this.alertTitle = "Please input Password"
            this.alertType = "Danger"
            this.alertShow = true
            setTimeout(
                () => {
                    this.alertShow = false
            },3000)
        }else{
            this.alertTitle = "Password should be at least 6 characters long, contain at least one uppercase & one digit"
            this.alertType = "Danger"
            this.alertShow = true
        }
    }
    checkpageTypePassword() {
        if (this.pageType == 'signUp') {
            this.validatePassword()
        }else {
            return null
        }
    }

    async checkpageTypeAuth(pageType: string){
        if (pageType == 'signUp' && this.name != "" && this.email != "" && this.password != '' && this.regPassword.test(this.password)) {
            this.spinnerShow = true
            await axios.post(this.API_URL, {
                name: this.name,
                email: this.email,
                password: this.password,
            })
            .then(() => {
                // console.log(res);
                this.toastIcon = 'success'
                this.toastTitle = 'Signed up successfully'
                this.toastShow = true
                this.$router.push(`/`)
            })
            .catch((err) => {
                // console.log(err.response.data.message, err.code);
                this.alertTitle = err.response.data.message
                this.alertType = "danger"
                this.alertShow = true
                this.spinnerShow = true
                setTimeout(() => {         
                    this.alertShow = false
                    this.spinnerShow = false
                    this.email = ''
                    this.password = ''
                    this.name = ''
                },3000) 
            });
        }else if(pageType == 'login' && this.email != "" && this.password != ''){
            this.spinnerShow = true
            await axios.post(`${this.API_URL}/login`, {
                email: this.email,
                password: this.password,
            })
            .then((res) => {
                // console.log(res);
                this.toastIcon = 'success'
                this.toastTitle = 'Signed in successfully'
                this.toastShow = true
                this.$router.push(`/`)
            })
            .catch((err) => {
                // console.log(err.response.data.message, err.code);
                this.alertTitle = err.response.data.message
                this.alertType = "danger"
                this.alertShow = true
                this.spinnerShow = true
                switch (err.response.data.message) {
                    case "invalid credentials":
                        this.alertTitle = "Invalid email or password";
                        break;
                    default:
                        this.alertTitle = "Email or password is incorrect";
                        break;
                }
                setTimeout(() => {         
                        this.alertShow = false
                        this.spinnerShow = false
                        this.email = ''
                        this.password = ''
                        this.name = ''
                },3000) 
            });
        }else{
            this.alertTitle = "Error !, Please input required details"
            this.alertType = "Danger"
            this.alertShow = true
            this.spinnerShow = true
            setTimeout(
                () => {
                    this.alertShow = false
                    this.spinnerShow = false
                    this.email = ''
                    this.name = ''
                    this.password = ''
                },3000)
            return 
        }
    }
}
</script>

<style scoped>
#app{
    min-height: 100vh;
}
.icon{
    margin-left: -30px; 
    margin-top: 10px;
}
#signup:hover{
    color: red !important;
}

form a:hover{
    color: red;
}
</style>