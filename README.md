# Youtube Clone

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

### 미들웨어

    미들웨어는 요청과 응답 사이의 소프트웨어이다.
    모든 미들웨어는 핸들러입니다. 모든 컨트롤러는 미들웨어이다.
    다음 인수를 포함하여 세 가지 인수가 있다. => (req, res, next)
    미들웨어는 request에 응답하지 않는다. request를 지속시켜 주는 것이다.

    app.use = global middleware를 만들 수 있게 해주는 함수
    global middleware는 어떤 url을 들어가도 사용하게 되는걸 의미한다.
    express또한 위에서 아래로 읽기 때문에 url을 get하는 순서를 지켜줘야한다.

### Morgan

    import morgan from "morgan" Morgan을 불러온다.
    morgan("dev")를 사용하여 정교하고 간단한 미들웨어로 사용할 수 있다.
    dev를 사용하면 GET, path, status code, 응답시간 등 많은 것을 쉽게 가져온다.
    dev 말고도 다른 옵션들이 있다.

### 라우터

    라우터는 컨트롤러와 URL의 독립적인 방법으로 관리를 쉽게 해준다.

    app.get([URL], [Handler])를 사용하여 요청을 처리하는 대신 라우터를 만들고 라우터가 GET 요청을 처리하도록 할 수 있다.
    app.use("/", homeRouter) 만들기 - 이렇게 하면 사용자가 GET 요청을 보낼 때 요청이 homeRouter로 라우팅된다.
    그런 다음 아래와 같이 homeRouter라는 상수 변수를 생성한다.
    const homeRouter = express.Router()
    아래와 같이 핸들러 함수를 생성한다다.
    const handleReq = (req, res) => {res.send("Do something") }
    라우터를 핸들러에 연결하려면 아래 코드를 사용하면 된다.
    routerOne.get("/", handleReq);
    그러면 사용자가 URL "/" 가져오기를 요청할 때 Express [앱]에서 라우터 [homeRouter], 핸들러 기능 [handleReq]으로 라우팅된다.

    router와 controller를 같이 쓰는 건 좋지않기 때문에 서로 다른 폴더로 분리하고 파일을 만들어서 export 해준다.
    각각의 파일은 독립적이라서 파일을 공유하려면 export 먼저하고 import를 해야한다.

    export default globalRouter <- 밑에 적어줌으로서 export가 가능하다.
    사용하려는 파일에서는 import globalRouter from "./routers/globalRouter" 으로 불러낼 수 있고 default export로 참조한 코드이기 때문에 import 할 때 이름은 자유롭게 사용해도 상관없다.

    두개 이상 import를 하려면 export를 하는 파일에서 export를 하려는 지정된 코드들 제일 앞에 export를 적어준다.
    export const edit = (req, res) => res.send("edit");
    export const remove = (req, res) => res.send("Remove");

    아래와 같이 구체적으로 적어서 사용하면 두개 이상 가져올 수 있고 같은 이름을 사용해야한다.
    import { edit, remove } from "../controllers/userController";

    url 매개변수에서 videoRouter.get("/:id", see);
    : <- 매개변수가 들어갈 자리를 알려준다.

    정규식 (\\d+)를 사용하면 숫자만 받을 수 있다.
    videoRouter.get("/:id(\\d+)", see);
    (js 에서는 \하나 더 붙이기)

    Routing
    https://expressjs.com/ko/guide/routing.html

    정규표현식 테스트 사이트
    https://www.regexpal.com

### Pug

    npm i pug를 적어 pug를 설치한다.
    View Engine: 뷰엔진은 서버에서 처리한 데이터 결과값을 정적인 페이지(HTML 파일)에 보다 편리하게 출력해주기 위해 사용한다.
    뷰엔진에서 요구하는 형태로 템플릿 파일(문서)을 만들고, 해당 템플릿 문서에 서버에서 처리한 데이터를 전달하면 해당 데이터를 화면에 출력할 수 있다.

    app에 우리의 view engine이 pug라고 말해줘야 함
    => app.set("view engine", "pug");
    express가 views 디렉토리에서 pug 파일을 찾도록 설정되어있다.

    pug 안에 Js넣는법
    #{Js code}

    pug의 장점
    1. 깔끔한 html을 작성하게 함
    2. 자바스크립트를 html에 포함할 수 있음
    3. 한 파일로 모든 템플릿을 업데이트할 수 잇음 (반복X)

    여기서 views를 보면 default가 process.cwd() + '/views' 로 되어있음
    cwd는 current working directory = 즉 package.json이 있는 곳이다!
    우리가 render하고싶은 pug file들은 youtubeclone/src/views에 있는데
    현재는 youtubeclone/views에서 찾으니 에러가 발생한다.
    app.set("views", process.cwd() + "/src/views"); 를 추가해 위치를 바꿔주자!

    res.render("연결할곳" , {변수:"내용" });

    MVP Styles
    link(rel="stylesheet" href="https://unpkg.com/mvp.css")

#### 2022-12-26 TEMPLATES, MVP Styles

#### 2022-12-23 Routers, Exports-Import, URL Parameters

#### 2022-12-22 External Middlewares

#### 2022-12-21 Middlewares

#### 2022-12-20 서버생성

#### 2022-12-19 index.js, json 파일 생성, .gitignore, babel, nodemon 사용설정
