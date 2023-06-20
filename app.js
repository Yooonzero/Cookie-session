const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

    res.cookie('name', 'sparta', {
        expires: expires,
    });
    return res.status(200).end();
});

app.get('/get-cookie', (req, res) => {
    // const cookie = req.headers.cookie;
    const cookies = req.cookies; // cookieparser 미들웨어를 적용했기 때문에 사용할 수 있다.
    console.log(cookies); // name=sparta
    return res.status(200).json({ cookies });
});

// 사용자의 정보를 저장할 만한 자물쇠 (데이터를 저장하는 부분)
let session = {}; // key-value() 이 형태로 열쇠 정보가 들어왔을 때 , 실제로 사용자의 정보를 사용할 수 있는 부분은 value 부분이다.
app.get('/set-session', (req, res) => {
    const name = 'sparta'; // 세션에 저장할 데이터
    const uniqueInt = Date.now(); // 클라이언트에게 할당할 키값 (열쇠)값
    session[uniqueInt] = name; // 세션에 데이터 저장을 완료했다
    res.cookie('sessionKey', uniqueInt); // 클라이언트에게 키값을 할당함
    res.status(200).end();
});

app.get('/get-session', (req, res) => {
    const { sessionKey } = req.cookies;
    const sessionItem = session[sessionKey];

    console.log(sessionItem);
    return res.status(200).json({ sessionItem: sessionItem });
});

app.listen(5002, () => {
    console.log(5002, '포트로 서버가 실행되었습니다.');
});
