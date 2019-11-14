export const triggerImageUpload = (file)=>{
    return{
        type:'@file/image_upload',
        file
    }
}

export const triggerRetrieveFiles = ()=>{
    return{
        type:'@file/retrieve_files'
    }
}

export const triggerAttachmentUpload = (files)=>{
    return{
        type:'@file/attachment_upload',
        files
    }
}
