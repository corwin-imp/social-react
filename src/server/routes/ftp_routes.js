/**
 * Created by Андрей on 27.02.2018.
 */
var os = require('os');



console.log('os', os.platform());
console.log('os', os.arch());
console.log('process',process.version);



if (os.platform() == 'win32') {
  var chilkat = require('chilkat_node8_win32');
} else if (os.platform() == 'linux') {
  if (os.arch() == 'arm') {
    var chilkat = require('chilkat_node8_arm');
  } else if (os.arch() == 'x86') {
    var chilkat = require('chilkat_node8_linux32');
  } else {
    var chilkat = require('chilkat_node8_linux64');
  }
}



let ftp = new chilkat.Ftp2();

let success;
//  Any string unlocks the component for the 1st 30-days.
success = ftp.UnlockComponent('Anything for 30-day trial');
if (success !== true) {
  console.log('suc-false', ftp.LastErrorText);
}

ftp.Hostname = 'files.000webhost.com';
ftp.Username = 'corwinimp';
ftp.Password = '1007810069';

//  Connect and login to the FTP server.

var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/add-file', (req, res) => {
    success = ftp.Connect();
    let complete = true;
    if (success !== true) {
      console.log('CONN_ERROR', ftp.LastErrorText);
      complete = false;
    }
  //  console.log('add', req.files);
    let firstName = req.files['file[0]'].name;
    if (firstName.toLowerCase().indexOf('.mp3') != -1) {
      success = ftp.ChangeRemoteDir(`/public_html/music`);
    } else {
      success = ftp.ChangeRemoteDir(`/public_html/pictures`);
    }

  // console.log('name', firstName.toLowerCase().indexOf('.mp3'));

    if (success !== true) {
      console.log('DIR_ERROR', ftp.LastErrorText);
      complete = false;
    }

    for (let item of Object.values(req.files)) {
      let file = item.data;
      let fileName = item.name;

      var remoteFilename = fileName;

      success = ftp.PutFileFromBinaryData(remoteFilename, file);
      if (success !== true) {
        console.log('PUT_ERROR', remoteFilename, ftp.LastErrorText);
        complete = false;
      }
    }
    success = ftp.Disconnect();
    if (complete) {
      res.json('success');
    }
  });

  router.post('/remove', (req, res) => {

    let complete = true;
    success = ftp.Connect();

    if (success !== true) {
      console.log('CONN_ERROR', ftp.LastErrorText);
      complete = false;
    }

    let data = req.body;
    success = ftp.ChangeRemoteDir(`/public_html/${data.type}`);
  //  console.log('remove', `/public_html/${data.type}`);
    if (success !== true) {
      console.log('DIR_ERROR',ftp.LastErrorText);
      complete = false;
    }
  //  console.log(data.file);
    success = ftp.DeleteRemoteFile(data.file);
    if (success !== true) {
      console.log('REMOVE_ERROR',ftp.LastErrorText);
      complete = false;
    }
    success = ftp.Disconnect();
    if (complete) {
      res.json('success');
    }
  });
};
