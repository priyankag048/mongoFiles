import axios from 'axios';
import env from '../config';

let config = {
    header:'multipart/form-data'
}

export const uploadImage = (data)=>{
    return axios.post(`${env.url}image`,data,config);
}

export const getFiles = ()=>{
    return axios.get(`${env.url}files`);
}

export const uploadAttachments = (data)=>{
    return axios.post(`${env.url}attachments`,data,config);
}
