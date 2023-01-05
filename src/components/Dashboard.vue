<template>
    <div class="bg-light h-100">
        <div class="navbar-light">
            <div>
                <div class="w-25 d-inline-block">
                    <img src="@/assets/logo/profile-user.png" alt="Profile" class="icon">
                    {{ user.name }} ({{ user.phone }})
                </div>
                <div class="w-50 d-inline-block text-center">
                    <span class="arrow" v-if="page > 1" @click="anotherPage(-2)"><b>
                        </b></span>
                    {{ page }}/{{ total_page }}
                    <span class="arrow" v-if="page < total_page" @click="anotherPage(0)"><b>></b></span>

                </div>
                <div class="w-25 d-inline-block text-end">
                    <button type="button" class="btn btn-outline-info btn-sm pl-5 pr-5" 
                        data-bs-toggle="modal" id="uploadImg" data-bs-target="#showUploadModalModal">Upload</button>
                    <img src="@/assets/logo/logout.png" alt="Logout" class="icon logout" title="Logout"
                        v-on:click="logout()">
                </div>
            </div>
        </div>
        <div id="carouselMultiItemExample" class="carousel slide carousel-dark text-center" data-mdb-ride="carousel">
            <div class="carousel-inner py-4">
                <div class="carousel-item active">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3 mb-2" style="height: 140px;" v-for="data in media" :key="data.id"
                                 @click="modalData = editData = data, showModal = true">
                                <div class="mb-3 ">
                                    <img :src="data.img_url" :id="data.id" :alt="data.title"
                                        class="card-img-top gallery-img pl-3 mt-4"
                                        data-bs-toggle="modal" data-bs-target="#imageModal" />
                                    <h6 class="card-title">{{ data.title }} </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ImageModal id="imageModal" :modalData="modalData" :getUserMedia="getUserMedia"></ImageModal>
        <AddImageModal id="showUploadModalModal" :getUserMedia="getUserMedia"></AddImageModal>
    </div>
</template>

<script>
import keys from '../utilities/keys';
import Axios from '../axios/axios'
import Urls from '../utilities/urls';
import ImageModal from '../modal/ImageModal.vue'
import AddImageModal from '../modal/AddImgaeModal.vue'
export default {
    components : {ImageModal, AddImageModal},
    data() {
        return {
            user: {},
            page: 0,
            total_page: 1,
            media: [],
            showModal: false,
            modalData: {title: '', description: '', img_url: '', id:''},
            showUploadModal: false,
            editData:null,
        }
    },
    
    created() {
        this.getUserDetail()
        this.getUserMedia()
    },
    methods: {
        getUserSuccessHandler(response) {
            let data = response.data[keys.DATA]
            this.user = data
            this.$store.dispatch('store/setUserState', data)
        },
        getUserDetail() {
            let url = Urls.USER_ACCOUNT;
            Axios.methods.requestGET(url, {}, {}, this.getUserSuccessHandler)
        },
        logout() {
            this.$store.dispatch('store/logoutUser')
            this.$router.push({ name: 'login' });
        },
        getMediaSuccessHandler(response) {
            let data = response.data
            this.media = data[keys.DATA]
            this.page = data[keys.PAGE]
            this.total_page = data[keys.TOTAL_PAGES]
        },
        getUserMedia(val=0) {
            this.page = Number(this.page) + val
            if (this.page < this.total_page) {
                let url = Urls.USER_MEDIA
                let data = {}
                data[keys.PAGE] = this.page + 1
                data[keys.TOTAL_ENTITIES] = 16
                Axios.methods.requestGET(url, data, {}, this.getMediaSuccessHandler);
            }
        },
        
        anotherPage(val) {
            this.page = Number(this.page) + Number(val);
            this.getUserMedia();
        },
        
        
        
    }
}
</script>
<style scoped>
.modal-img {
    width: 250px;
    height: 250px;
}

.gallery-img {
    max-height: 120px;
    width: 200px;
    height: 120px;
    border: 1px solid black;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.arrow {
    cursor: pointer;
    font-size: 20px;
}

.arrow:hover {
    color: blue;
}
</style>