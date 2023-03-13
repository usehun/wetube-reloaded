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

### Conditionals, Iteration, Mixins

    if, else if, else문

    h1= pageTitle 은 #{pageTitle} 같다.

    ul
        if fakeUser.loggedIn
            li
                a(href="/logout") Log out
        else
            li
                a(href="/login") Login

    Iteration (반복)
    Pug는 each와 while라는 두 가지 기본 반복 방법을 지원한다.
        ul
            each val in [1, 2, 3, 4, 5]
                li= val


    배열이나 객체에 반복할 값이 없으면 실행될 else 블록을 추가할 수도 있다.
    - var values = [];
    ul
        each val in values
            li= val
        else
            li There are no values

    Mixins
    Mixin을 사용하면 재사용 가능한 Pug 블록을 만들 수 있다.
    또한 Mixindm은 함수로 컴파일되며 인수를 사용할 수 있다.

### 몽고DB 설치, DB연결, Model 생성

    Mongo DB를 사용하기 위해서 Mongo, Mongo shell이 필요하다.

    npm i mongoose 설치하고 mongoose를 사용하여 DB의 주소를 가져온다.

    model을 만드는 이유는 DB의 구조에 대해 알려줘야 하기 떄문이다.
    model의 형태는 schema라고 한다.

### callback, promise

    db.js에 db와 관련 없는 부분을 init.js로 분리
    외부 데이터베이스를 연동함에 있어 처리 방식 2가지 (callback, promise)

    callback function 의 장점은 에러들을 바로 볼 수 있다.
    하지만 js의 단점은 기다리는 기능이 없어서 아무리 위에서 아래로 읽어도 database에서 불러오는 시간이 있어서 순서가 꼬인다.
    그래서 callback function을 썼었다.

    await는 database에게 결과값을 받을때까지 js가 기다리게 해줄 수 있다.
    await,async의 장점은 매우 직관적이다. 즉 js 가 어디서 어떻게 기다리는지 알 수 있다.
    await는 규칙상 function이 async 상태일때만 안에서 사용 가능!
    하지만 callback function과 달리 promise방식은 error 가 어디서 오는지 명확하지가 않다.
    그래서 try catch 방법을 쓴다
    말그대로 try 안에 있는 코드를 실행해보고 오류가 생기면 catch 안에 코드가 실행되는구조

    callback
    video.find({}, (error, videos) => {
        if(error){
            return res.render("server-error")
        }
            return res.render("home")
    });

    promise
    export const home = async (req, res) => {
        try {
            const videos = await video.find({});
            return res.render("home", { pageTitle: "Home", videos });
        } catch {
            return res.render("server-error");
        }
    };

### 라우터, 컨트롤러 수정, pug 수정

    route().get().post();
    get, post 메서드를 같이 쓰는 방법이다.

    req.body
    req.body에는 form을 통해 submit된 데이터의 키-값 쌍을 포함한다.
    기본적으로는 undefined이며 express.json() 또는 express.urlencoded()와 같은 바디 파싱 미들웨어를 사용할 때 값을 받아온다.

    app.use(express.urlencoded({ extended: true }));
    express.urlencoded({extended:true}) HTML form 의 body를 이해해서 우리가 쓸 수 있는 멋진 자바스크립트 형식으로 변형시켜줄 수 있다.

    form 에 대한 data를 보낼때 input의 name 으로 정보를 받기 때문에 꼭 form엔 name을 정해줘야한다!

### 모델 생성, 데이터 추가

    import mongoose from "mongoose";
    몽구스를 import 한 후 컨트롤러에서 사용될 모델의 틀을 만든다.


    만든 모델을 컨트롤러에서 사용한다.
    ```
    const { title, description, hashtags } = req.body;
    const video = new Video({
        title: title,
        description: description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
        views: 0,
        rating: 0,
        },
    });
    await video.save();
    ```

### 컨트롤러 error추가, 모델 default,schema 설정

    컨트롤러에 try,catch 구문을 사용하여 에러가 생겼을 상황에 대비

    모델 스케마에 default를 사용하여 컨트롤러에서 직접 입력하지 않아도 자동으로 입력, max,trim,min을 사용하여 조금 더 상세하게 데이터 입력 가능.

    16진법 변환을 사용해서 video.id가 컨트롤러에서 이해하도록 변환
    ( /[0-9a-f]{24})

### Upload hashtags 수정, 몽고 사용

    몽구스로 모델에서 스케마.pre를 사용하여 저장전에 해시태그의 문법을 수정한다.

    videoSchema.pre("save", async function () {
    this.hashtags = this.hashtags[0]
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
    });

    1. 몽고 사용하기
    > mongosh

    2. 내가 가진 db 보기
    > show dbs

    3. 현재 사용 중인 db 확인
    > db

    4. 사용할 db 선택하기
    > use dbName
    (현재 수업에서는 `use wetube`)

    5. db 컬렉션 보기
    > show collections

    6. db 컬렉션 안에 documents 보기
    > db.collectionName.find()
    (현재 수업에서는 `db.videos.find()`)

    7. db 컬렉션 안에 documents 내용 모두 제거하기
    > db.collectionName.remove({})
    (현재 수업에서는 `db.videos.remove({})`)

### Delete 추가, Search 추가

    export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
    };

    findByIdAndDelete(id) (=findOneAndDelete({_id:id}))

    model.sort({정렬하고싶은 기준 : desc(내림차순) , asc(오름차순)})
    Video.find({}).sort({ createdAt: "asc" })

    라우터로 지정한 :id -> req.params
    pug파일에서 input으로 받은 내용 -> req.body(form이 POST일 때)
    pug파일에서 input으로 받은 url내용 -> req.query (form이 GET일 때)
    const { keyword } = req.query;

### Search 수정

    Model.find()
    documents를 찾는다. (findOne과 다르게 전체 document를 찾는다.)
    Mongoose는 명령이 전송되기 전에 모델의 스키마와 일치하도록 필터를 캐스팅한다.

    videos title을 검색할때 keyword가 포함된것들을 regex operator를 통해 검색해 줄 수 있다.
    (regex = regular expression의 약자)
    const { keyword } = req.query;

    $regex: new RegExp(keyword, "i") -> keyword가 포함된 것들을 검색.
    $regex: new RegExp(`^${keyword}`, "i") -> keyword로 시작되는 것들을 검색.
    $regex: new RegExp(`${keyword}$`, "i") -> keyword로 끝나는 것들을 검색.
    (여기서 "i" = Welcome,welcome 둘다 같게 해주는것 즉 lowercase,uppercase의 구분을 없게 해주는것)
    ( mongoose가 아닌 mongoDB가 해주는 기능이다)

#### Join

### Returns, Renders

    return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.
    - 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용
    render한 것은 다시 render할 수 없음
    - redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)

### Hash

    npm i bcrypt 설치

    userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
    });

    위 코드를 사용하여 저장전에 해싱을 해줘서 유저의 정보를 보호해준다.

### user 컨트롤러, 상태코드, 세션 미들웨어

    user 컨트롤러에서 Error 처리

    - 200(OK): 서버가 요청을 제대로 처리했다는 뜻이다. 이는 주로 서버가 요청한 페이지를 제공했다는 의미로 쓰인다.
    - 400(Bad Request): 서버가 요청의 구문을 인식하지 못할 때 발생한다. 클라이언트 측에서 문제가 있을 때 주로 발생한다.
    - 404(Not Found): 서버가 요청한 페이지를 찾을 수 없을 때 발생한다. 서버에 존재하지 않는 페이지에 대한 요청이 있을 경우 서버는 이 코드를 제공한다.

    const ok = await bycrypt.compare(password, user.password);
    bycrypt가 비밀번호를 입력 값과 해싱된 값을 비교해준다.

    npm i express-session
    세션 미들웨어가 사이트로 들어오는 모두를 기억한다.

    1. 브라우져 서버에 접근
    2. 서버가 브라우져에게 Cookie 준다.
    3. 브라우져가 서버에 다시 접근할 때 2.에서 받은 Cookie를 함께 건냄.
    4. 서버는 Cookie를 통해 브라우져를 구분 할 수 있다.

    - 기본적으로 서버와 유저의 연결은 stateless한 성질을 띈다.(wifi가 쭉 연결되어 있는것과 다르게)
    - 이러한 연결 특성으로 인해 매번 연결시 유저는 새로이 서버에 자신을 확인 받아야 함
    - 만약 증표(증거)가 있다면 다시 연결시 유저에 대한 확인이 쉬워짐
    - 쿠기가 증표 역활을 함. 유저는 서버 연결시 서버에게 증표를 건네받음(쿠키는 유저가 보관)
    - 서버는 session으로 해당 증표를 가진 유저의 기록을 저장해둠
    - 유저가 증표(쿠키)를 가지고 오면 서버는 저장되어 있는 session을 통해 유저를 쉽게 확인

#### 2023-03-13 User 컨트롤러 수정, status code, 세션 미들웨어

#### 2023-03-07 Hashing

#### 2023-02-28 Returns, Renders

#### 2023-02-01 Join(form, controller, model, router)

#### 2023-01-26 Search 수정

#### 2023-01-25 Delete, Search 추가

#### 2023-01-23 hashtags 수정

#### 2023-01-19 try,catch 구문, error추가, 모델 설정

#### 2023-01-17 모델 생성, 데이터 생성

#### 2023-01-04 mongoose 설치, 라우터 수정, 컨트롤러 수정, pug 수정

#### 2023-01-03 콜백함수

#### 2022-12-31 MongoDB, DB 연결, Model 생성

#### 2022-12-28 Conditionals, Iteration, Mixins

#### 2022-12-26 TEMPLATES, MVP Styles

#### 2022-12-23 Routers, Exports-Import, URL Parameters

#### 2022-12-22 External Middlewares

#### 2022-12-21 Middlewares

#### 2022-12-20 서버생성

#### 2022-12-19 index.js, json 파일 생성, .gitignore, babel, nodemon 사용설정

오류
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory

해결
git config --global core.autocrlf true
