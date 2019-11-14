const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectIds = Schema.Types.ObjectId;

const attachment = new Schema({
    filename:{
        type:String,
        required:true
    },
    originalname:{
        type:String,
        required:true
    },
    fileId:{
        type:ObjectIds,
        required:true
    }
});


const ImageSchema = new Schema({
    picture: {
        type: ObjectIds
    },
    attachments:[attachment]
});

module.exports = mongoose.model('ImageModel', ImageSchema);