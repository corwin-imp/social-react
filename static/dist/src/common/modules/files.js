var url = require('url');
var request = require('superagent');
import config from '../../../config/config';
var apiPrefix = config.apiPrefix, music = config.music, pictures = config.pictures;
function load_files(root, cb) {
    if (!root.endsWith('/')) {
        root += '/';
    }
    if (root == 'get-music/') {
        var room = apiPrefix + "/proxy/" + music;
    }
    else {
        var room = apiPrefix + "/proxy/" + pictures;
    }
    request.get(room).end(function (err, res) {
        if (err) {
            console.log(err);
            // return cb(err);
        }
        var el = document.createElement('div');
        el.innerHTML = res.text;
        var links = el.querySelectorAll('a');
        var files = [];
        links.forEach(function (link_el) {
            var parsed = url.parse(link_el.href);
            var path = parsed.path.substr(1);
            var src = url.resolve(room, path);
            if (root == 'get-music/') {
                var result = path.search(/(\mp3)/gi);
            }
            else if (root == 'get-pictures/') {
                var result = path.search(/(\jpg|\png)/gi);
            }
            else {
                var result = path.search(/(\mp4)/gi);
            }
            if (!path.startsWith('.') && result != -1) {
                src = src.replace(/profiles\//, '');
                files.push(src);
            }
        });
        cb(null, files);
    });
}
export default load_files;
