//全局的路由拦截，进行权限校验用的
import router from "@/router";
import store from "@/store";
import accessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

//全局的路由拦截，进行权限校验用的
router.beforeEach(async (to, from, next) => {
  // if (to.meta?.access === accessEnum.ADMIN) {
  //   if (store.state.user.loginUser?.userRole !== "admin") {
  //     next("/noAuth");
  //     return;
  //   }
  // }
  //现在要根据登录状态来进行权限校验，分为几种方式：1.从未登陆过；2.登录了是用户；3.登陆了是管理员
  //粗略就分为两种情况，未登录（无论访问到哪个网页都没有权限都会重定向到登录页面）；登陆了但权限不足（跳转到无权限页面）
  //先获取当前用户
  const loginUser = store.state.user.loginUser;

  //如果当前从存储态获取的loginUser为空（证明从未登陆过）或者当前loginUser没有userRole就证明从未登录过
  if (!loginUser || !loginUser.userRole) {
    //等待获取store内容
    await store.dispatch("user/getLoginUser");
  }

  const nextPath = (to.meta?.access as string) ?? accessEnum.NOT_LOGIN;
  //如果当前用户从未登录，跳转到登录页面,要跳转的页面需要登录
  if (nextPath !== accessEnum.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果权限不足
    if (!checkAccess(loginUser, nextPath)) {
      //转发到无权限页面
      next("/noAuth");
      return;
    }
  }
  next();
});
