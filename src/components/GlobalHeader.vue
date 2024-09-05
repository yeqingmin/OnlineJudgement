<template>
  <a-row
    class="grid-demo"
    id="globalHeader"
    align="center"
    :wrap="false"
    style="background-color: #fff"
  >
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        :default-selected-keys="['1']"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img src="../assets/logo.png" alt="logo" class="logo" />
            <div class="title">CodeOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in filteredRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import accessEnum from "@/access/accessEnum";

const router = useRouter();
const selectedKeys = ref(["/"]);
const currentRoute = useRoute();
const store = useStore();

// const visibleRoutes = routes.filter((item, index) => {
//   if (item.meta?.hideInMenu) {
//     return false;
//   }
//   return true;
// });

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "yeqingmin",
//     role: accessEnum.ADMIN,
//   });
// }, 3000);

//必须要使用计算属性，因为计算属性是响应式的而不是被写死的，每当计算内容发生改变属性值就会改变，会重新触发渲染
//计算属性，用于根据meta中是否隐藏的属性来对item进行过滤
const filteredRoutes = computed(() => {
  return routes.filter((item) => {
    //todo 根据不同的角色权限来校验
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    //return !item.meta?.hideInMenu;
    return true;
  });
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
#globalHeader {
  text-align: center;
}

.title-bar {
  height: 50px;
}

.title {
  line-height: 50px;
  float: right;
}

.logo {
  height: 48px;
}
</style>
