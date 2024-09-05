import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import accessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserHomeView from "@/views/user/UserHomeView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionListView from "@/views/user/QuestionListView.vue";
import QuestionDetailView from "@/views/user/QuestionDetailView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Questions",
    component: HomeView,
    meta: {
      access: accessEnum.NOT_LOGIN,
    },
  },
  {
    path: "/noAuth",
    name: "NoAuth",
    component: NoAuthView,
    meta: {
      access: accessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "PersonalCenter",
    component: AboutView,
    meta: {
      access: accessEnum.NOT_LOGIN,
    },
  },
  {
    path: "/user",
    component: UserLayout,
    children: [
      {
        path: "/user", // 用户首页
        component: UserHomeView,
      },
      {
        path: "/user/login", // 用户关于页面
        component: UserLoginView,
      },
      {
        path: "/user/register",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/manage/question/add",
    component: AddQuestionView,
    meta: {
      access: accessEnum.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "ManageQuestions",
    component: ManageQuestionView,
    meta: {
      access: accessEnum.ADMIN,
    },
  },
  {
    path: "/question/list",
    name: "QuestionList",
    component: QuestionListView,
    meta: {
      access: accessEnum.USER,
    },
  },
  {
    path: "/question/detail/:id",
    name: "QuestionDetail",
    component: QuestionDetailView,
    meta: {
      access: accessEnum.USER,
      hideInMenu: true,
    },
  },
];
