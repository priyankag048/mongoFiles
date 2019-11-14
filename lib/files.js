const mongoose = require('mongoose');
const multer = require('multer');
const GridFSstorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURI = 'mongodb://localhost/files';


class Files {

    filename(req, file, cb) {
        cb(null, `${file.originalname.split('.')[0]}_${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
    }

    /** upload files */
    fileUpload() {
        let storage = GridFSstorage({
            url: mongoURI,
            filename: this.filename,
            root: 'files'
        });

        let upload = multer({
            storage: storage
        });
        return upload;
    }

    /** download files */
    fileDownload(data) {
        let gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.collection('files');
        let promise = new Promise((resolve, reject) => {
            gfs.files.find(data).toArray((err, files) => {
                if (files && files.length === 0) {
                    reject(err);
                }
                let readStream = gfs.createReadStream(files[0].filename);
                return resolve({ readStream, files });
            })
        });
        return promise;
    }


    /** remove files */
    async deleteFile(id) {
        let gfs = Grid(mongoose.connection.db, mongoose.mongo);
        let fileId = mongoose.Types.ObjectId(id);
        gfs.collection('files');
        let file = await gfs.files.findOne({ _id: fileId });
        if (file && file !== null) {
            gfs.collection('files').remove({ _id: fileId });
        }
    }
}

module.exports = new Files();