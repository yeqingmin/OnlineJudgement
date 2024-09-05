<template>
  <div id="userRegister">
    <a-form
      :model="form"
      :style="{ width: '400px' }"
      @submit="handleSubmit"
      class="form"
    >
      <h1>用户注册</h1>
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
      <a-form-item field="post" label="密码确认">
        <a-input-password
          class="inputBox"
          v-model="form.checkPassword"
          placeholder="重新输入密码"
        />
      </a-form-item>
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
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
} as UserRegisterRequest);

const router = useRouter();
const handleSubmit = async () => {
  //调用后端代码（接口）来进行服务，提交数据
  //使用userRegister的请求接口
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    //代表请求成功
    //则调用获取当前存储的用户的信息显示在主页并跳转到主页
    message.info("注册成功！请登录");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    //显示失败信息
    message.error("注册失败" + res.message);
  }
};
</script>

<style scoped>
#userRegister {
  position: relative;
}
h1 {
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.form {
  position: absolute;
  padding: 20px;
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
