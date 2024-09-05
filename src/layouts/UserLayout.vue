<template>
  <div id="userlayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="-header">
        <img src="../assets/logo.png" class="logo" />
        <div>OnlineJudge</div>
      </a-layout-header>
      <a-layout class="-body">
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <!--        <a-layout-sider>用户目录</a-layout-sider>-->
      </a-layout>
      <a-layout-footer class="-footer"
        >CodeOJ Copyright@Yeqingmin</a-layout-footer
      >
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  color: gray;
}
#userlayout {
  background: url("../assets/background.png") 0% 0% /100% 100%;
  text-align: center;
}
#userlayout .-header {
  margin-bottom: 40px;
}

#userlayout .-header .logo {
  width: 80px;
  height: 80px;
}
#userlayout .-body {
  /*background-color: gray;*/
  margin-bottom: 10px;
}
#userlayout .-footer {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: sticky;
  font-size: 12px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
