<template>
  <div id="basiclayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="-header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="-body">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="-footer"
        >CodeOJ Copyright@Yeqingmin</a-layout-footer
      >
    </a-layout>
  </div>
</template>

<style scoped>
* {
  color: gray;
}
#basiclayout {
  /*background: url("../assets/background.png");*/
}

#basiclayout .-header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basiclayout .-body {
  margin-bottom: 10px;
}

#basiclayout .-footer {
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
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
