### Set up

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

### 서버를 생성하고 Requset, Response 를 사용

    express를 import하고 express 함수를 실행한다.

    const PORT = 4000;
    const app = express();
    express 함수를 변수에 담고 app.listen(port, handleListening)를 실행하여
    함수 handleListening로 http://localhost:${PORT}의 서버를 실행한다.

    서버를 생성한 후에는 서버가 사용자 요청에 응답하도록 해야 한다.
    사용자는 HTTP 프로토콜을 사용하여 요청합니다. 이 요청을 GET 요청이라고 한다.
    주소 표시줄에 URL을 입력하고 페이지가 로드되면 실제로 서버에 GET 요청을 보내고 응답을 받고 브라우저에 응답을 표시한다.

    서버입장인 우린 request를 받는다. 브라우저가 request 보내고 root 페이지를 가져달라는 request를 받으면, 응답해준다.

    get("URL", "GET 핸들러 기능")을 설정하면 Get 요청을 처리하지만 GET 요청에는 응답하지 않습니다.
    서버가 사용자의 GET 요청에 응답하도록 하려면 EventHandler 함수를 화살표 함수로 수정해야 합니다. 그런 다음 응답 인수를 .end() 또는 .send()로 아래와 같이 만듭니다.
    const handleHome = (req, res) => {
        return res.send("I still love you.");
    };
    GET 처리기 함수 내부의 첫 번째 인수는 일반적으로 "req"로 이름이 지정되며 요청 개체를 받습니다.
    두 번째 인수의 이름은 일반적으로 "res"이며 응답 개체를 받습니다.
    res.end()는 아무 것도 반환하지 않고 응답을 종료합니다. res.send()는 사용자의 브라우저에 입력을 반환합니다. 이 특정 예에서 사용자는 "I still love you."라는 문자열을 보게 됩니다.

#### 2022-12-19 index.js, json 파일 생성, .gitignore, babel, nodemon 사용설정

#### 2022-12-20 서버생성
