<template>
  <div class="vertical-center">
    <div class="inner-block ">
      <div class="vue-tempalte">
        <h3>Sign Up</h3>

        <div class="form-group">
          <input type="text" class="form-control form-control-lg" placeholder="Full Name" v-model="data.name"
            :class="{ error_border: name_error }" @click="name_error = false" />
        </div>

        <div class="form-group mt-4">
          <input type="number" class="form-control form-control-lg" placeholder="Phone" v-model="data.phone"
            :class="{ error_border: phone_error }" @click="phone_error = phone_repeat = false" />
          <div class="error-msg" v-if="phone_repeat">{{error_msg.phone}}</div>
        </div>

        <div class="form-group mt-4">
          <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="data.password"
            :class="{ error_border: password_error }" @click="password_error = false" />
        </div>

        <div class="form-group mt-4">
          <input type="password" class="form-control form-control-lg" placeholder="Verify Password"
            v-model="data.v_password" :class="{ error_border: password_error }" 
            @click="password_error = pass_repeat = false" />
          <div class="error-msg" v-if="pass_repeat">{{error_msg.password}}</div>
          </div>

        <button v-on:click="submit()" class="btn btn-dark btn-lg btn-block mt-4">
          Sign Up
        </button>

        <p class="forgot-password text-right">
          Already registered
          <router-link :to="{ name: 'login' }">sign in?</router-link>
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
      data: {
        phone: null,
        name: '',
        password: '',
        v_password: '',
      },
      phone_error: false,
      password_error: false,
      name_error: false,
      v_password_error: false,
      phone_repeat: false,
      pass_repeat: false,
      error_msg : {
        phone : 'Number Already Used',
        password : 'Password Dont Match'
      }
    };
  },
  beforeCreate() {
    if (AuthHelper.get_token()) {
      this.$router.push({ name: 'dashboard' });
    }
  },
  methods: {
    successHandler(response) {
      let user = response.data[keys.DATA];
      let data = {}
      data[keys.TEXT_MESSAGE] = 'Sign Up Successfully'
      data[keys.COLOR] = 'r'
      data[keys.TIMEOUT] = 500
      this.$store.dispatch('snackBar/setSnackBar', data, { root: true });
      this.$router.push({ name: 'login' });
    },
    errorHandler(error) {
      if(error.response.status==409){
        this.error_msg.phone = 'Number Already Used'
        this.phone_repeat = true
        this.phone_error = true
      }
    },
    submit() {
      let error = false;
      for (let i in this.data) {
        if (!Boolean(this.data[i])) {
          this[`${i}_error`] = true
          error = true
        }
      }
      if (!(this.data.password === this.data.v_password)) {
        error = true
        this.password_error = this.v_password_error = this.pass_repeat = true
      }
      if (!(this.data.phone.length >= 10)) {
        error = true
        this.error_msg.phone = 'Invalid Phone Number'
        this.phone_error =  this.phone_repeat = true
      }
      if (!(this.data.password.length > 6)) {
        error = true
        this.error_msg.password = 'Password lenght should be more than 6'
        this.password_error = this.v_password_error = this.pass_repeat = true
      }
      if (!error) {
        let url = Urls.USER_ACCOUNT;
        Axios.methods.requestPOST(url, this.data, {}, this.successHandler, this.errorHandler)
      }
    }
  },
};
</script>
