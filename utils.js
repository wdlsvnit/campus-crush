"use strict";

const key = "this is a very long key.";
const encryptor = require('simple-encryptor')(key);

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

module.exports = {
  encrypt,
  decrypt
}
