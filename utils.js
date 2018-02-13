"use strict";

const key = "this is a very long key.";
const encryptor = require('simple-encryptor')(key);
const user = require('./models/user');
const configs = require('./config');
const request = require('request');

function encrypt(data) {
  return new Promise((resolve, reject) => {
    try {
      let encrypted = encryptor.encrypt(data);
      console.log(encrypted);
      resolve(encrypted);
    }
    catch(e) {
      reject({ "error": `Error: ${e}` });
    }
  });
}

function decrypt(data) {
  return new Promise((resolve, reject) => {
    try {
      let decrypted = encryptor.decrypt(data);
      console.log(decrypted);
      resolve(decrypted);
    }
    catch(e) {
      reject({ "error": `Error: ${e}` });
    }
  });
}

function checkForMatch(data) {
  return new Promise((resolve, reject) => {
    try {
      user.findOne({ "your_fb": data.crush_fb }, (err, match) => {
        console.log(`Match: ${match}`);
        if (!match) {
          console.log('no match found');
        }
        else if (match.your_fb == data.crush_fb) {
          console.log(`${match.name} matched with ${data.name}`);
          resolve({ "matches": [ match.mobile_no, data.mobile_no ]});
        }
      });
    }
    catch (e) {
      reject({ "error": e });
    }
  });
}

function makeCall(from, to) {
  // let dataString = 'From=XXXXX30240&To=XXXXX40682&CallerId=0XXXXXX4890';
  let dataString = `From=${from}&To=${to}&CallerId=${configs.callerId}`
  console.log(`Request: ${dataString}`);
  let options = {
      url: `https://${configs.sid}:${configs.token}@api.exotel.com/v1/Accounts/${configs.sid}/Calls/connect.json`,
      method: 'POST',
      body: dataString
  };
  console.log(options);
  // function callback(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //         console.log(body);
  //     } else {
  //       console.log(error);
  //     }
  // }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(response.statusCode);
    }
  });
}

module.exports = {
  encrypt,
  decrypt,
  checkForMatch,
  makeCall
}
