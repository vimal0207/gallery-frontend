<template>
    <div class="modal fade" id="imageModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">{{ modalData.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body text-center">
                    <img :src="modalData.img_url" :alt="modalData.title" class="card-img-top modal-img h-50 w-50" />
                    <div class="mt-3"><b>{{ modalData.description }}</b></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"
                        @click="downloadMedia(modalData.img_url)">Download</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="deletMedia(modalData.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import keys from '../utilities/keys';
import Axios from '../axios/axios'
import Urls from '../utilities/urls';
export default {
    props: ['modalData', 'getUserMedia'],
    methods: {
        deleteMediaSuccessHandler(response) {
            this.getUserMedia(-1);
            this.showModal = false;
            this.modalData = { title: '', description: '', img_url: '', id: '' };
            let data = {}
            data[keys.TEXT_MESSAGE] = 'Deleted Successfully'
            data[keys.COLOR] = 'r'
            data[keys.TIMEOUT] = 500
            this.$store.dispatch('snackBar/setSnackBar', data, { root: true });
        },
        deletMedia(id) {
            let url = Urls.USER_MEDIA
            Axios.methods.requestDELETE(`${url}${id}/`, {}, this.deleteMediaSuccessHandler);
        },
        async toDataURL(url) {
            const blob = await fetch(url).then(res => res.blob());
            return URL.createObjectURL(blob);
        },
        async downloadMedia(url) {
            const a = document.createElement("a");
            a.href = await this.toDataURL(url);
            a.download = "myImage.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
    }
}
</script>