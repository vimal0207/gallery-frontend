<template>
  <div class="vue-tempalte">
    <div class="App">
      <router-view />
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
          <div class="toast-body"><b>{{ snackBar.textMessage }}</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthHelper from '@/utilities/auth'
import { Toast } from "bootstrap/dist/js/bootstrap.esm.min.js";
export default {
  beforeCreate() {
    if (AuthHelper.get_token()) {
      this.$router.push({ name: 'dashboard' });
    }
    else {
      this.$router.push({ name: 'login' });
    }
  },
  computed: {
    snackBar() {
      let data = this.$store.getters['snackBar/GET_SNACKBAR'];
      if(data.show){
        this.submitHandler()
      }
      return data
    }
  },
  methods: {
    submitHandler() {
      const toast = new Toast(this.$refs.toast);
      toast.show();
    },
  },
}
</script>