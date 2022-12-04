//vuex는 vue에서 상태를 관리를 도와주는 모듈이다.
import { createStore } from "vuex";

//영구적인 state를 위해서 npm 설치를 해야합니다.
import persistedstate from "vuex-persistedstate";

const store = createStore({
  //여기가 공통 코드가 될 수 있다.
  state() {
    return {
      user: {},
    };
  },
  // 로그인 하고 나면 state에 데이터를 넣어주고 사용자 정보를 넣주는 역할이다.
  mutations: {
    user(state, data) {
      state.user = data;
    },
  },
  //화면을 refresh해도 user라는 변수가 계속 유지됩니다.
  plugins: [
    persistedstate({
      paths: ["user"],
    }),
  ],
});

export default store;
