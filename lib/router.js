const mongoose = require('mongoose');
const fileController = require('./files');
const controller = require('./model');
const upload = fileController.fileUpload();


class Router {

    getAttachments(files, attachments) {
        let newAttachments = []
        if (files) {
            for (var i = 0; i < files.length; i++) {
                newAttachments.push({ filename: files[i].filename, originalname: files[i].originalname, fileId: files[i].id });
            }
        }
        return [...attachments, ...newAttachments];
    }

    routes(app) {
        /** Upload image */
        app.post('/image', upload.single('file'), async (req, res) => {
            try {
                let picture, _id, request, output;
                let imageDetails = await controller.getImage();
                if (imageDetails && imageDetails !== null) {
                    _id = imageDetails._id;
                    if (req && req.file) {
                        picture = req.file.id;
                        fileController.deleteFile(imageDetails.picture);
                    } else {
                        picture = imageDetails.picture;
                    }
                    request = { _id, picture };
                    output = await controller.updateFiles(_id, request);
                } else {
                    picture = req.file.id;
                    request = { picture };
                    output = await controller.uploadFiles(request);
                }
                if (output) {
                    res.status(200).json({ message: 'file uploaded', output });
                }
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        });

        /** Upload attachments */
        app.post('/attachments', upload.array('files'), async (req, res) => {
            try {
                let _id = "", attachments = [], request, output;
                let imageDetails = await controller.getImage();
                if (imageDetails && imageDetails !== null) {
                    _id = imageDetails._id;
                    attachments = this.getAttachments(req.files, imageDetails.attachments);
                    request = { _id, attachments };
                    output = await controller.updateFiles(_id, request);
                } else {
                    attachments = this.getAttachments(req.files, []);
                    request = { attachments };
                    output = await controller.uploadFiles(request);
                }
                res.status(200).json({ message: 'file uploaded', output });
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        });


        /** download image */
        app.get('/file/:id', async (req, res) => {
            try {
                let id = req.params.id;
                let fileId = mongoose.Types.ObjectId(id);
                let url = await fileController.fileDownload({_id:fileId});
                let fileDownloaded = url.files;
                res.set('Content-Type', fileDownloaded[0].contentType);
                return url.readStream.pipe(res);
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        });


        /** download attachments */
        app.get('/attachment/:name', async(req,res)=>{
            try {
                let name = req.params.name;
                let url = await fileController.fileDownload({filename:name});
                let fileDownloaded = url.files;
                res.set('Content-Type', fileDownloaded[0].contentType);
                return url.readStream.pipe(res);
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        });


        /** delete files */
        app.delete('/file/:id', (req, res) => {
            try {
                let id = req.params.id;
                fileController.deleteFiles(id);
                res.status(200).json({ message: 'file deleted' });
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        });


        /** get all files */
        app.get('/files', async (req, res) => {
            try {
                let imageDetails = await controller.getImage();
                if (imageDetails && imageDetails !== null) {
                    res.status(200).json({ imageDetails });
                }
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        });
    }
}

module.exports = new Router();