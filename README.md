# smartphone
### 📱바닐라 자바스크립트를 활용한 SPA 스마트폰 에뮬레이션



## 설치방법

-----

- npm init

- npm i express



## 파일구조

----

```
├─frontend
│  ├─static
│  │   ├─css
│  │   ├─images
│  │   └─js  
│  │      ├─views
│  │      |    ├─AbstractViews.js
│  │      |    ├─Alarm.js
│  │      |    ├─Home.js
│  │      |    ├─Memo.js
│  │      |    └─Photo.js
│  │      └─index.js
│  └─index.html
├─node_modules
├─package-lock.json
├─package.json
├─server.js
└─README.md

```



## 프로젝트 화면 구성 및 기능

-----

홈 화면과 3개의 앱(알람, 메모, 사진)으로 총 4개의 화면으로 구성되어 있으며, 
각 앱에서 BACK 버튼을 누르면 홈화면으로 이동합니다.
SPA(Single Page Application)로 만들었습니다.

- #### **홈화면**

  - 상단에 날짜와 시간 표시. (모든 화면에서 표시 동일)

  - 알람, 메모, 사진 앱 표시

  - 각 앱을 누르면 해당 앱 화면으로 이동

  - 앱은 Drag & Drop으로 서로 위치 이동 가능

    <img src="/Users/ahntoday/Library/Application Support/typora-user-images/image-20210823212709266.png" alt="image-20210823212709266" style="zoom:40%;" />



- #### **알람앱**

  - 우측 상단 'NEW' 버튼 클릭 시 바로 아래 입력창 생성

  - 분은 10분 단위 입력

  - 저장 클릭 시 아래 알람 리스트에 추가되고 입력창 사라짐

  - 알람 시간이 되면 alert창으로 알람 띄워주고, 확인 클릭 시 해당 알람 삭제됨

  - 알람 리스트 localStorage에 저장하여, 브라우저 Reload 후에도 그대로 존재

    <img src="/Users/ahntoday/Library/Application Support/typora-user-images/image-20210823212910289.png" alt="image-20210823212910289" style="zoom:40%;" />

  

- #### **메모앱**

  - 우측 상단 'NEW' 버튼 클릭 시 바로 아래 입력창 생성

  - 메모는 엔터 키 입력 시 저장되며 입력창 사라짐

  - 메모리스트는 2줄만 표시됨

  - 해당 메모 클릭 시 모든 메모 내용 나오도록 펼쳐짐

  - 한번에 하나의 메모만 펼칠 수 있도록 이전에 펼쳐진 메모는 다시 2줄로 표시됨

  - 모든 메모는 localStorage에 저장하여, 브라우저 Reload 후에도 그대로 존재

    <img src="/Users/ahntoday/Library/Application Support/typora-user-images/image-20210823213711644.png" alt="image-20210823213711644" style="zoom:40%;" />



- #### **사진앱**

  - 상단에 모든 사진 리스트가 나오며 가로 스크롤 가능

  - 사진 선택시 Border 생성
  - 선택된 사진은 아래에 표시되고, 화면에 맞게 줄어듦

  <img src="/Users/ahntoday/Library/Application Support/typora-user-images/image-20210823213332502.png" alt="image-20210823213332502" style="zoom:40%;" />
