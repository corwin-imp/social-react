var Profile = require('../models/Profile');
var Video = require('../models/Video');
var bodyparser = require('body-parser');
module.exports = function (router) {
    router.use(bodyparser.json());
    router.get('/video', (req, res) => {
        Video.find({}, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            }
            res.json(data);
        });
    });
    router.post('/add-video', (req, res) => {
        let data = req.body;
        const video = new Video({
            name: data[0],
            src: data[1],
            date: new Date(),
        });
        video.save(function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            }
            res.json(data);
        });
    });
    router.post('/video/delete', (req, res) => {
        let id = req.body.id;
        console.log(id);
        Video.findById(id).remove(function (err, doc) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            }
            res.json('ok');
        });
    });
    router.get('/items/delcol', (req, res) => {
        let modelName = 'items';
        if (!modelName || !modelName.length) {
            Promise.reject(new Error('You must provide the name of a model.'));
        }
        try {
            var model = mongoose.model(modelName);
            var collection = mongoose.connection.collections[model.collection.collectionName];
        }
        catch (err) {
            return Promise.reject(err);
        }
        return new Promise(function (resolve, reject) {
            collection.drop(function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                delete mongoose.models[modelName];
                delete mongoose.modelSchemas[modelName];
                resolve();
            });
        });
    });
};
