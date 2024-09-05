<template>
  <div id="questionDetailView">
    <a-layout>
      <a-layout-sider class="sider" width="40vw"
        ><a-typography :style="{ marginTop: '-40px' }">
          <a-typography-title>{{
            data.id + "." + data.title
          }}</a-typography-title>
          <a-typography-paragraph data-index="content">{{
            data.content
          }}</a-typography-paragraph>
          <a-typography-paragraph>
            <ul>
              <li>
                Architectural blueprints
                <ul>
                  <li>Architectural blueprints</li>
                </ul>
              </li>
              <li>Engineering drawings</li>
              <li>Business processes</li>
            </ul>
          </a-typography-paragraph>
          <a-typography-paragraph>
            <ol>
              <li>Architectural blueprints</li>
              <li>Engineering drawings</li>
              <li>Business processes</li>
            </ol>
          </a-typography-paragraph>
        </a-typography></a-layout-sider
      >
      <a-layout-content class="content"></a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
  JudgeConfig,
  QuestionControllerService,
  QuestionVO,
  UserVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { onMounted, reactive, ref } from "vue";
let data = reactive({
  acceptedNum: 0,
  content: "",
  createTime: "",
  favourNum: 0,
  id: 0,
  judgeConfig: {
    memoryLimit: 0,
    timeLimit: 0,
    stackLimit: 0,
  },
  submitNum: 0,
  tags: [],
  thumbNum: 0,
  title: "",
  updateTime: "",
  userId: 0,
} as QuestionVO);
const router = useRouter();
const route = useRoute();
const fetchData = async () => {
  const id = Number(route.params.id);
  let result = await QuestionControllerService.getQuestionVoByIdUsingGet(id);
  if (result.code === 0 && result.data) {
    data.id = result.data.id;
    data.title = result.data.title;
    data.content = result.data.content;
    data.acceptedNum = result.data.acceptedNum;
    data.judgeConfig = result.data.judgeConfig;
    data.favourNum = result.data.favourNum;
    data.tags = result.data.tags;
    console.log(result.data);
  } else {
    message.error("请求加载题目数据失败");
  }
};
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
#questionDetailView {
}
</style>
