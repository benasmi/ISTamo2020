import React from "react";
import axios from "axios"
import history from "../helpers/history";
import {getAccessToken} from "../helpers/tokenStorage";

const request = async function (options, contentType) {

    const header = {
        'Content-Type': (contentType == null) ? 'application/json' : contentType,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${getAccessToken()}`
    };

    const client = axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: header
    });


    const onSuccess = function (response) {
        console.log('Request Successful!', response);
        return response.data;
    };

    const onError = function (error) {
        if (error.response) {
            console.debug('Status:', error.response.status);
            if (error.response.status === 403) {
                history.push("/login")
            }
            console.debug('Data:', error.response.data);
            console.debug('Headers:', error.response.headers);
        } else {
            console.debug('Error Message:', error.message);
        }

        return Promise.reject(error.response.data);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

const getRequest = function (path, urlData = "") {
    return request({
        url: path + urlData,
        method: 'GET'
    });
};

const postRequest = function (path, data, urlData = "") {
    return request({
        url: path + urlData,
        method: 'POST',
        data: data
    }, null);
};

const postMultipartRequest = function (path, formData) {
    return request({
        url: path,
        method: 'POST',
        data: formData
    }, 'multipart/form-data');
};

const patchRequest = function (path, data, urlData = "") {
    console.log({path, data});
    return request({
        url: path + urlData,
        method: 'PATCH',
        data: data
    }, null);
};

const deleteRequest = function (path, data, urlData = "") {
    return request({
        url: path + urlData,
        method: 'DELETE',
        data: data
    }, null);
};

const RequestType = {
    getRequest, postRequest, postMultipartRequest, patchRequest, deleteRequest
};

export default RequestType
