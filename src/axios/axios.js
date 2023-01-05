import axios from 'axios';
import AuthHelper from '../utilities/auth'
import keys from '../utilities/keys'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.baseURL = ' http://127.0.0.1:8000/'

export default {
    methods : {
        setHeader(header) {
            let token = AuthHelper.get_token()
            if(token){
                header[keys.AUTHORIZATON] = `Token ${token}`
            }
            return header
        },
        // AXIOS GET REQUEST
        requestGET(url, params, headers, successResponse = null, errorResponse = null) {
            headers = this.setHeader(headers)
            axios.get(
                url, {
                    params : params,
                    headers : headers
                }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },
        
        // AXIOS POST REQUEST
        requestPOST(url, params, headers={}, successResponse = null, errorResponse = null) {
            headers = this.setHeader(headers)
            axios.post(
                url, params, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },
        
        // AXIOS PUT REQUEST
        requestPUT(url, params, headers, successResponse = null, errorResponse = null) {
            headers = this.setHeader(headers)
            axios.put(
                url, params, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },

        // AXIOS PATCH REQUEST
        requestPATCH(url, params, headers, successResponse = null, errorResponse = null) {
            headers = this.setHeader(headers)
            axios.patch(
                url, params, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },

        // AXIOS DELETE REQUEST
        requestDELETE(url, headers, successResponse = null, errorResponse = null) {
            headers = this.setHeader(headers)
            axios.delete(
                url, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        }
    }
}
