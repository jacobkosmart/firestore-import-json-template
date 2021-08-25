


// import 저장된 파일 불러오기 node 환경이기 때문에 require 사용
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json')


//  JSON to firestore
const jsonToFirestore = async () => {
  try {
    console.log('init firebase')
    // 
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('firebase initialized ');

    await firestoreService.restore('./data.json')
    console.log('upload success')
  } catch(error) {
    console.log(error)
  }
};

jsonToFirestore();