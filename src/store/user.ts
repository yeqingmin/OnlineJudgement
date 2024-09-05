//定义了要保存的状态，存储的信息，比如用户信息
import { StoreOptions } from "vuex";
import accessEnum from "@/access/accessEnum";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: accessEnum.NOT_LOGIN,
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: accessEnum.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser.userName = payload.userName;
      state.loginUser.userRole = payload.userRole;
      console.log(state.loginUser);
    },
  },
} as StoreOptions<any>;
