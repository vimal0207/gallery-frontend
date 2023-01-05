<template>
  <div class="vertical-center">
    <div class="inner-block ">
      <div class="vue-tempalte">
          <h3>Sign In</h3>

          <div class="form-group">
            <input type="number" :class="{error_border:phone_error}" class="form-control form-control-lg" 
                      placeholder="Phone" v-model="data.phone" @click="phone_error=false" />
          </div>

          <div class="form-group mt-4">
            <input type="password" :class="{error_border:password_error}" class="form-control form-control-lg" 
                    placeholder="Password" v-model="data.password" @click="password_error=false"/>
          </div>

          <button class="btn btn-dark btn-lg btn-block mt-4" v-on:click="submit()">
            Sign In
          </button>

          <p class="forgot-password text-right">
            New User
            <router-link :to="{ name: 'signup' }">sign up</router-link>
          </p>
          <p class="forgot-password text-right">
            <router-link :to="{ name: 'forgot-password' }"> Forgot Password</router-link>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from '../../axios/axios'
import Urls from '../../utilities/urls'; 
import AuthHelper from '@/utilities/auth'
import keys from '@/utilities/keys';

export default {
  data() {
    return {
      data : {
        phone: null,
        password: ""
      },
      phone_error : false,
      password_error : false,
    };
  },
  beforeCreate(){
      if(AuthHelper.get_token()){
        this.$router.push({name : 'dashboard'});
      }
  },
  methods : {
    successHandler(response){
      AuthHelper.set_token(response.data)
      this.$router.push({name : 'dashboard'});
    },
    errorHandler(response){
      let data = {}
      data[keys.TEXT_MESSAGE] = 'Something Went Wrong, Please Check Credentials'
      data[keys.COLOR] = 'r'
      data[keys.TIMEOUT] = 500
      this.$store.dispatch('snackBar/setSnackBar', data, { root: true });
    },
      submit(){
        let error = false;
        for(let i in this.data){
          if(!Boolean(this.data[i])){
            this[`${i}_error`] = true;
            error = true;
          }
        }
        if(!error){
          let url = Urls.LOGIN;
          Axios.methods.requestPOST(url, this.data, {}, this.successHandler, this.errorHandler)
        }
      }
  },
};
</script>