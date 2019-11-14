const ImageModel = require('./image.model');

class Controller{
    async uploadFiles(files){
        let insertedData = await ImageModel.create(files);
        return insertedData;
    }

    async getImage(){
        let imageId = await ImageModel.findOne();
        return imageId;
    }

    async updateFiles(id,files){
        let insertedData = await ImageModel.findByIdAndUpdate(id,files,{ new: true });
        return insertedData;
    }
}


module.exports = new Controller();