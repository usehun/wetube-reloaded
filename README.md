###

    npm init을 사용하여 package.json 파일 생성

    json {
        "scripts": {
            "key" : "value"
        }
    }
    key 값을 불러 실행

    npm install express 적어 express 관련 package를 설치

    package.json에서
    "dependencies": {
    "express": "^4.18.2"
    }
    express 있다면 npm i 만 입력하면 dependencies의 관련 모듈을 다운로드한다. -> node_module 폴더를 따로 보낼 필요가 없다.
    npm i을 실행할 때는 꼭 package.json 저장후 실행

    node_modules 폴더가 github에 올라가지 않도록 .gitignore 파일을 만들어 /node_modules을 적어 숨긴다.

    package-lock.json은 패키지들을 안전하게 관리한다.

    dependencies는 개발에 필요한
    devDependencies는 개발자에게 필요한

    npm install --save-dev @babel/core에서 --save-dev는 devDependencies로 package.json에 추가

    babel을 설정하기 위해 babel.config.json을 만들고 패키지를 설치

    npm i @babel/preset-env --save-dev를 사용하면 최신 자바스크립트 구문을 사용할 수 있고 preset은 플러그인이다.

    nodemon은 만든 파일이 수정되는걸 감시해주는 패키지이다.
    파일이 수정될때마다 npm run dev 해줄 필요가 없고 콘솔창이 종료되지 않으면서 nodemon이 알아서 재시작을 해준다.

    "scripts": {
    "dev": "nodemon --exec babel-node index.js"
    }
    nodemon : npm run dev 실행
    babel : 최신 자바스크립트 구문 사용
    node index.js : 파일을 실행

#### 2022-12-19 index.js, json 파일 생성, .gitignore, babel, nodemon 사용설정

####
