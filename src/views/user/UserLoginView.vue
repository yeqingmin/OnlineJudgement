<template>
  <div id="userlogin">
    <a-form
      :model="form"
      :style="{ width: '400px' }"
      @submit="handleSubmit"
      class="form"
    >
      <h1>用户登录</h1>
      <a-form-item field="name" label="用户名">
        <a-input
          class="inputBox"
          v-model="form.userAccount"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item field="post" label="密码" tooltip="密码不小于八位">
        <a-input-password
          class="inputBox"
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a href="/user/register" class="register">
        <!--todo 这里之后会跳转到注册页面-->
        无账户 | 注册
      </a>
      <a-form-item class="button">
        <a-button
          html-type="submit"
          style="
            background-color: #3bc7bc;
            height: 50px;
            width: 300px;
            color: white;
            font-size: 16px;
            border-radius: 10px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
          "
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  //调用后端代码（接口）来进行服务，提交数据
  //使用userLogin的请求接口
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    //代表请求成功
    //则调用获取当前存储的用户的信息显示在主页并跳转到主页
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    //显示失败信息
    message.error("登录失败" + res.message);
  }
};
</script>

<style scoped>
#userlogin {
  position: relative;
  text-align: center;
}
h1 {
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.form {
  position: absolute;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  /*height: 300px;*/
  width: 50px;
  background-color: #fff;
  border-radius: 10px;
}

.form a-form-item {
  height: 40px;
}

.inputBox {
  height: 50px;
}
.register {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  color: gray;
}
.button {
  margin-top: 20px;
}
</style>
