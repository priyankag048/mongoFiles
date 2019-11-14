import { toastr } from 'react-redux-toastr'
import { takeLatest, put, all, take } from 'redux-saga/effects';
import { uploadImage, uploadAttachments, getFiles, downloadAttachments } from '../api/files.api';

function* upload_image_saga(data) {
    try{
        let response = yield uploadImage(data.file);
        if (response.status === 200) {
            toastr.success('Success', `Image Uploaded Successfully`);
            yield put({
                type: '@user/saga_action/image',
                picture: response.data.output.picture
            })
        }
    }catch(e){
        toastr.error('Failed',e.message);
    }
   
}

function* retrieve_files_saga() {
    try{
        let response = yield getFiles();
        if(response.status === 200){
            let data = response.data.imageDetails;
            if(data.picture){
                yield put({
                    type: '@user/saga_action/image',
                    picture: data.picture
                });
            }
           if(data.attachments){
            yield put({
                type: '@user/saga_action/attachments',
                attachments: data.attachments
            });
           }
        }
    }catch(e){
        toastr.error('Failed',e.message);
    }
}

function* upload_attachments_saga(data){
    try{
        let response = yield uploadAttachments(data.files);
        toastr.success('Success', `Attachments Uploaded Successfully`);
        yield put({
            type: '@user/saga_action/attachments',
            attachments: response.data.output.attachments
        });
    }catch(e){
        toastr.error('Failed',e.message);
    }
}

export default function* checkFiles() {
    yield all([
        takeLatest('@file/image_upload', upload_image_saga),
        takeLatest('@file/retrieve_files', retrieve_files_saga),
        takeLatest('@file/attachment_upload', upload_attachments_saga)
    ])
}