# data.json 파일을 firebase store 에 import 하기

## 1.Node.js 준비

> `npm init`

- firestore-export-import 페키지 설치

> `npm i firestore-export-import`

## 2.Firebase 설정

- firestore 에 접속하기 위한 환경변수를 생성해야 합니다. firebase 프로젝트에서 웹앱 추가 하고 firebaseconfig 파일을 복사합니다.

- root 경로에 config.js 파일만들고 `module.export` 해줍니다

```js
// in config.js

// firebase 에서 저장된 sdk key 값들

const firebaseConfig = {
  apiKey: "AIzaSyAdEB9FRDyUOEQP7iPo3or**********",
  authDomain: "toic-voca-app-db.firebaseapp.com",
  projectId: "toic-voca-app-db",
  storageBucket: "toic-voca-app-db.appspot.com",
  messagingSenderId: "515335408022",
  appId: "1:515335408022:web:dd3f28**************",
};

module.exports = firebaseConfig;
```

## 3.Service Account key 생성

- DB 에 접근하기 위한 private key 를 생성합니다. firebase 에서 project settings => service accounts tab => generate new private key 해줍니다.

- 그러면 json 파일이 다운받아지는데 파일명을 serviceAccount.json 로 파일명 바꾸고, root 경로에 붙여 넣습니다.

```json
// in serviceAccount.json

{
  "type": "service_account",
  "project_id": "toic-voca-app-db",
  "private_key_id": "4f3234a372f2081e25e6bd70de31b1b498db3890",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDiVVrJQGMQ77Ea\npA2Y0NsS3mut0Pperfa32MfQHaBbBV82OG2O9Og/umGi/mzrxcoAY2EQU3dvgQLr\nCpXqayV91Fc4M0Zi2C2ntt9E7V8giQc8TztWOm+vxb9x2+sgvtOMM1CA0VrwQnTF\nQfkt9BVd1bgkFv59XFR4SZKwOMpeVGeiixjNeCJ6SLpZgtaqYQhoYJnaMCb7aIpF\n6xuSGHsRWDxuTLEHo8soYBU5MzLyoiH6sBVEGeNzoEDqbVFEzOtuSR4+dwzTMTr2lB3/7AggnAVo\nJBNhRvqSkSYS1KZ4NL6rBWrxSEmOFmRIp2m2cSHB621ignw0UUGuYiUlaqEcU526\noKOVjctkbusXR9VsT0YiFKT8QaOFcYsSUwTsDrwBAoGAInYchgRY+7S8gS49Y6AJ\nGx2giT1/rCjGidY6YqwxwpvMX+IMmZ9VuiLJTrZTv3AGMPZaaRFVPI6uxN+fpazT\nVkIlYzaJNicKzpZz6DQ0frNusSPO2/hvwHQvRFwaCLvy0edq5rP1CCjKYqHW3ND+\n0Lo2j+QaJf4zyCoPJAuYSDE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-9hjjv@toic-voca-app-db.iam.gserviceaccount.com",
  "client_id": "104424801054445601366",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9hjjv%40toic-voca-app-db.iam.gserviceaccount.com"
}
```

## 4.import.js 작성

- firestore 에 입력할 데이터와 설정파일, 키 파일이 준비 되었으니 실제 데이터를 추가하는 로직을 작성합니다. import.js 생성

```js
// import 저장된 파일 불러오기 node 환경이기 때문에 require 사용
const firestoreService = require("firestore-export-import");
const firebaseConfig = require("./config.js");
const serviceAccount = require("./serviceAccount.json");

//  JSON to firestore
const jsonToFirestore = async () => {
  try {
    console.log("init firebase");
    // firestore 초기화 시작
    await firestoreService.initializeApp(
      serviceAccount,
      firebaseConfig.databaseURL
    );
    console.log("firebase initialized ");

    // data.json 파일 firestore 에 push
    await firestoreService.restore("./data.json");
    console.log("upload success");
  } catch (error) {
    console.log(error);
  }
};

// 함수 실행
jsonToFirestore();
```

## 5.데이터 입력 실행

> `node import.js`

- 입력된 데이터 값 확인

![image](https://user-images.githubusercontent.com/28912774/130784446-1e830cb3-c414-4602-beab-20585ffa8390.png)

## Reference

firestore-export-import npm - [https://www.npmjs.com/package/firestore-export-import](https://www.npmjs.com/package/firestore-export-import)

copy coding - [https://copycoding.tistory.com/315](https://copycoding.tistory.com/315)
