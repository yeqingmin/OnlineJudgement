<template>
  <div id="questionListView">
    <a-table :data="data" style="margin-top: 30px" :pagination="pagination">
      <template #columns>
        <a-table-column title="题目id" data-index="id"></a-table-column>
        <a-table-column title="标题" data-index="title"></a-table-column>
        <a-table-column title="标签" data-index="tags">
          <template #cell="{ record }">
            <a-space>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="'green'"
                :closable="false"
                readonly
              >
                {{ tag }}
              </a-tag>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="提交数" data-index="submitNum"></a-table-column>
        <a-table-column
          title="通过数"
          data-index="acceptedNum"
        ></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button type="primary" @click="handleClickQuestion(record.id)"
              >去做题</a-button
            >
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
// 获取当前页面的所有题目的信息
import {
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { onMounted, reactive, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
let data = ref([]);
let router = useRouter();

let questionQuest = reactive({
  answer: "",
  content: "",
  current: 0,
  id: null,
  pageSize: 3,
  sortField: "",
  sortOrder: "",
  tags: [],
  title: "",
  userId: null,
} as unknown as QuestionQueryRequest);
let pagination = reactive({
  current: 0,
  total: 0,
  pageSize: 0,
  showTotal: true,
  onChange: (page: number) => {
    console.log("触发了onChange");
    questionQuest.current = page;
    console.log(questionQuest);
    getQuestionList();
  },
});

const getQuestionList = async () => {
  let result = await QuestionControllerService.listQuestionVoByPageUsingPost(
    questionQuest
  );
  if (result.code === 0) {
    data.value = result.data.records;
    pagination.current = result.data.current;
    pagination.total = result.data.total;
    pagination.pageSize = 3;
    console.log("data的值是：" + data.value);
  } else {
    message.error("请求错误");
  }
};
onMounted(() => {
  getQuestionList();
  console.log(data.value);
});
const handlePageChange = () => {
  console.log("handlePageChange");
};
const handleClickQuestion = (id: number) => {
  router.push({
    name: "QuestionDetail",
    params: { id },
  });
};
</script>

<style scoped>
#questionListView {
}
</style>
