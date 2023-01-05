<template>
    <div class="modal fade" id="showUploadModalModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="showUploadModalLabel">Add Image</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="input-group mb-3">
                            <div class="text-center">
                                <img src="" alt="" width="150px" height="150px" style="display: none;" id="display">
                            </div>
                            <div class="custom-file border border-light w-100">
                                <input type="file" class="custom-file-input w-100" id="inputFile" @change="setImage()"
                                    accept="image/*" refs="file">
                            </div>
                        </div>
                        <input type="text" placeholder="Title*" class="w-100 mt-3 rounded" v-model="uploadData.title">
                        <textarea name="description" id="description" class="w-100 mt-3 rounded" rows="5"
                            placeholder="Description*" v-model="uploadData.description">
                                    </textarea>
                        <div class="mt-3"><b></b></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            >Close</button>
                        <button type="button" class="btn btn-primary" @click="uploadImage()" disabled id="uploadBtn"
                            data-bs-dismiss="modal">Upload</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import keys from '../utilities/keys';
import Axios from '../axios/axios'
import Urls from '../utilities/urls';
export default{
    props : ['getUserMedia'],
    data(){
        return {
            uploadData: { title: '', description: '', img: null },
        }
    },
    watch: {
        editData : function (value){
            if(Boolean(value)){
                this.uploadData = value
            }
        },
        uploadData: {
            handler(val) {
                let disable = false;
                for (let i in val) {
                    if (!Boolean(val[i])) {
                        disable = true
                    }
                }
                document.getElementById('uploadBtn').disabled = disable
            },
            deep: true
        }
    },
    methods : {
        uploadSuccessHandler(response) {
            this.getUserMedia(-1);
            let data = {}
            data[keys.TEXT_MESSAGE] = 'Photo Uploaded Successfully'
            data[keys.COLOR] = 'r'
            data[keys.TIMEOUT] = 500
            this.$store.dispatch('snackBar/setSnackBar', data, { root: true });
            for (let i in this.uploadData) {
                this.uploadData[i] = null
            }
        },
        uploadImage() {
            let url = Urls.USER_MEDIA
            let data = new FormData;
            data.append(keys.IMG, this.uploadData[keys.IMG])
            data.append(keys.TITLE, this.uploadData[keys.TITLE])
            data.append(keys.DESCRIPTION, this.uploadData[keys.DESCRIPTION])
            Axios.methods.requestPOST(url, data, {}, this.uploadSuccessHandler)
        },
        setImage() {
            let files = document.getElementById('inputFile').files
            var image = document.getElementById('display');
	        image.src = URL.createObjectURL(files[0]);
            image.style.display='block'
            this.uploadData[keys.IMG] = files[0]
        },
    }
}
</script>