<template>
    <div class="vertical-center">
        <div class="inner-block ">
            <div class="vue-tempalte">
                <h3> Forgot Password</h3>

                <div class="form-group">
                    <input type="number" :class="{ error_border: phone_error }" class="form-control form-control-lg"
                        placeholder="Phone" v-model="data.phone" @click="phone_error = phone_repeat = false" />
                </div>
                <div class="error-msg" v-if="phone_repeat">{{ error_msg.phone }}</div>
                <div class="form-group mt-4">
                    <input type="password" :class="{ error_border: password_error }"
                        class="form-control form-control-lg" placeholder="Password" v-model="data.password"
                        @click="password_error = false" />
                </div>
                <div class="form-group mt-4">
                    <input type="password" :class="{ error_border: v_password_error }"
                        class="form-control form-control-lg" placeholder="Verify Password" v-model="data.v_password"
                        @click="v_password_error = pass_repeat = false" />
                </div>
                <div class="error-msg" v-if="pass_repeat">{{ error_msg.password }}</div>

                <button class="btn btn-dark btn-lg btn-block mt-4" v-on:click="submit()">
                    Reset Password
                </button>

                <p class="forgot-password text-right">
                    Remember Password
                    <router-link :to="{ name: 'login' }">sign in</router-link>
                </p>
                <p class="forgot-password text-right">
                    New User
                    <router-link :to="{ name: 'signup' }">sign up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>


<script>
import Axios from '../../axios/axios'
import Urls from '../../utilities/urls';
import keys from '@/utilities/keys';
export default {
    data() {
        return {
            data: {
                phone: null,
                password: "",
                v_password: ""
            },
            phone_error: false,
            password_error: false,
            v_password_error: false,
            phone_repeat: false,
            pass_repeat: false,
            error_msg: {
                phone: 'Invalid Number',
                password: 'Password Dont Match'
            }
        };
    },
    methods: {
        successHandler(response) {
            let data = {}
            data[keys.TEXT_MESSAGE] = 'Password Change Successfully'
            data[keys.COLOR] = 'r'
            data[keys.TIMEOUT] = 500
            this.$store.dispatch('snackBar/setSnackBar', data, { root: true });
            this.$router.push({ name: 'login' });
        },
        errorHandler(response) {
            this.phone_repeat = true
        },
        submit() {
            let error = false;
            for (let i in this.data) {
                if (!Boolean(this.data[i])) {
                    this[`${i}_error`] = true;
                    error = true;
                }
            }
            if (!(this.data.password === this.data.v_password)) {
                error = true
                this.password_error = this.v_password_error = this.pass_repeat = true
            }
            if (!(this.data.phone.length >= 10)) {
                error = true
                this.error_msg.phone = 'Invalid Phone Number'
                this.phone_error = this.phone_repeat = true
            }
            if (!(this.data.password.length > 6)) {
                error = true
                this.error_msg.password = 'Password lenght should be more than 6'
                this.password_error = this.v_password_error = this.pass_repeat = true
            }
            if (!error) {
                let url = Urls.FORGOT_PASSWORD;
                Axios.methods.requestPATCH(url, this.data, {}, this.successHandler, this.errorHandler)
            }
        }
    },
};
</script>