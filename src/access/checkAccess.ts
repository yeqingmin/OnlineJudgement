/**
 * 公用的权限校验方法，本来写在App.vue中的
 * 很多的内容：菜单组件中需要判断权限（比如管理员可见的菜单和用户可见的菜单），
 * 权限拦截也要用权限判断功能（比如用户无法通过输入url就去访问管理员才能访问的url所在地址的界面）
 * 因此将权限校验方法抽取成公共方法
 */
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import accessEnum from "@/access/accessEnum";
import AccessEnum from "@/access/accessEnum";

/**
 * 检查权限，判断当前用户是否具有某个权限
 * @param loginUser 当前所登录的用户（有管理员和用户几种角色等）
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = accessEnum.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? accessEnum.NOT_LOGIN; //如果当前用户为空就将其值令为NOT_LOGIN的状态
  if (needAccess === accessEnum.NOT_LOGIN) {
    //如果需要的权限是任意的（not_Login那么就返回可访问）
    return true;
  }

  if (needAccess === accessEnum.USER) {
    //如果当前url页面需要的权限是用户，那么就需要用户先登录
    if (loginUserAccess === accessEnum.NOT_LOGIN) {
      //在这种情况下（需要登录）如果没登陆就不给访问了
      return false;
    }
  }
  if (needAccess === accessEnum.ADMIN) {
    //如果当前url页面需要的权限是管理员，那么只有管理员可以访问
    if (loginUserAccess !== accessEnum.ADMIN) {
      return false;
    }
  }
  return true;
};
export default checkAccess;

// const store = useStore();
// const router = useRouter();
// //全局的路由拦截，进行权限校验用的
// router.beforeEach((to, from, next) => {
//   if (to.meta?.access === "canAdmin") {
//     if (store.state.user.loginUser?.role !== "admin") {
//       next("/noAuth");
//       return;
//     }
//   }
//   next();
// });
// };
