import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//내가만들 모듈은 main.js에 선언을 해줘야 vue가 알아먹을 수 있다.
import mixins from "./mixins";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//vue에서 alert(알람)을 이쁘게 만들어주는 라이브러리
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

//mixin()안에 내가만든 모듈을 넣어주쟈
//store를 쓴다고 use를 넣어줭 ㅑ한다.
const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.use(store);
app.use(VueSweetalert2);
app.mount("#app");
//kakao javascript 키 넣어두기
window.Kakao.init("04d7423a795584cea1c2ee03d7600a5f1");
