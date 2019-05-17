function config() {
    if (process.env.NODE_ENV !== 'production') {
        return {
            "apiPrefix": "http://localhost:3000",
            "serverPort": "3000",
            "db": {
                "nameBase": "homeSystem",
                "hostUser": "localhost",
                "portBase": 27017
            },
            "music": 'http://music/',
            "pictures": 'http://pictures/'
        };
    }
    else {
        return {
            "apiPrefix": "http://social-react.herokuapp.com",
            "serverPort": "8080",
            "db": {
                "nameBase": "corwin-base",
                "hostUser": "corwin.imp:kiuym1007810069@ds247327.mlab.com",
                "portBase": 47327
            },
            "music": "corwinimp.000webhostapp.com/music/",
            "pictures": "corwinimp.000webhostapp.com/pictures/"
        };
    }
}
;
module.exports = config();
