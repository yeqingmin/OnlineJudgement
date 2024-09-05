<template>
  <div id="manageQuestionView">
    <div class="add-btn">
      <a-button type="primary" @click="onAddQuestion">
        <template #default>Add Question</template>
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
    </div>
    <a-table :data="data" style="margin-top: 30px" :pagination="pagination">
      <template #columns>
        <a-table-column title="id" data-index="id"></a-table-column>
        <a-table-column title="标题" data-index="title"></a-table-column>
        <a-table-column title="内容" data-index="content"></a-table-column>
        <a-table-column title="标签" data-index="tags"
          ><template #cell="{ record }">
            <a-input-tag
              :model-value="JSON.parse(record.tags)"
              readonly
            /> </template
        ></a-table-column>
        <a-table-column title="答案" data-index="answer"></a-table-column>
        <a-table-column title="提交数" data-index="submitNum"></a-table-column>
        <a-table-column
          title="通过数"
          data-index="acceptedNum"
        ></a-table-column>
        <a-table-column title="判题配置" data-index="judgeConfig">
        </a-table-column>
        <a-table-column title="判题用例" data-index="judgeCase">
        </a-table-column>
        <a-table-column title="用户ID" data-index="userId"></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button type="primary" @click="handleUpdate(record)"
              >修改</a-button
            >
            <a-modal v-model:visible="visible" width="80vw">
              <a-form :model="form" @submit="handleEditSubmit">
                <a-row :gutter="20">
                  <a-col :span="10">
                    <a-form-item field="title" label="Title">
                      <a-input
                        placeholder="Please enter the question's title"
                        v-model="form.title"
                      ></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item field="tags" label="Tags">
                      <a-input-tag
                        :style="{ width: '320px' }"
                        v-model="form.tags"
                        placeholder="Please Enter the Question's Tags"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="20">
                  <a-col :span="10">
                    <a-form-item
                      label="JudgeConfig"
                      :content-flex="false"
                      :merge-props="false"
                    >
                      <a-space direction="vertical" fill>
                        <a-form-item
                          field="judgeConfig.memoryLimit"
                          label="MemoryLimit"
                        >
                          <a-input
                            v-model="form.judgeConfig.memoryLimit"
                            placeholder="please enter the question's memoryLimit..."
                          />
                        </a-form-item>
                        <a-form-item
                          field="judgeConfig.timeLimit"
                          label="TimeLimit"
                        >
                          <a-input
                            v-model="form.judgeConfig.timeLimit"
                            placeholder="please enter the question's timeLimit..."
                          />
                        </a-form-item>
                        <a-form-item
                          field="judgeConfig.stackLimit"
                          label="StackLimit"
                        >
                          <a-input
                            v-model="form.judgeConfig.stackLimit"
                            placeholder="please enter the question's timeLimit..."
                          />
                        </a-form-item>
                      </a-space>
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item>
                      <a-form>
                        <a-scrollbar
                          style="height: 100px; overflow: auto"
                          field="judgeCase"
                        >
                          <div
                            v-for="(item, index) in form.judgeCase"
                            :key="index"
                          >
                            <a-form-item label="Input">
                              <a-input
                                v-model="item.input"
                                placeholder="Enter input"
                              />
                            </a-form-item>
                            <a-form-item label="Output">
                              <a-input
                                v-model="item.output"
                                placeholder="Enter output"
                              />
                            </a-form-item>
                            <a-button
                              block
                              @click="removeItem(index)"
                              status="danger"
                              >Remove</a-button
                            >
                          </div>
                        </a-scrollbar>
                        <a-button
                          block
                          @click="addItem"
                          status="normal"
                          type="outline"
                          >Add JudgeCase</a-button
                        >
                      </a-form>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="30">
                  <a-col :span="10">
                    <a-form-item field="answer" label="Answer">
                      <MDEditor
                        :value="form.answer"
                        class="editor"
                        :handle-change="onAnswerChange"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item field="content" label="Content">
                      <MDEditor
                        :value="form.content"
                        class="editor"
                        :handle-change="onContentChange"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item>
                      <a-space>
                        <a-button
                          html-type="submit"
                          status="success"
                          type="outline"
                          >Submit</a-button
                        >
                      </a-space>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>
            <a-button status="danger" @click="handleDelete(record.id)"
              >删除</a-button
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
  DeleteRequest,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { onMounted, reactive, ref } from "vue";
import { IconPlus } from "@arco-design/web-vue/es/icon";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import MDEditor from "@/components/MDEditor.vue";
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
const handleUpdate = (record: any) => {
  visible.value = true;
  form.id = record.id;
  form.content = record.content;
  form.tags = JSON.parse(record.tags);
  form.answer = record.answer;
  form.title = record.title;
  form.judgeCase = JSON.parse(record.judgeCase);
  form.judgeConfig = JSON.parse(record.judgeConfig);
};

const getQuestionList = async () => {
  let result = await QuestionControllerService.listQuestionByPageUsingPost(
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
});
const handlePageChange = () => {
  console.log("handlePageChange");
};
const onAddQuestion = () => {
  console.log("进入添加题目的方法");
  router.push("/manage/question/add");
};

const visible = ref(false);

const form = reactive({
  id: 0,
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});
const onAnswerChange = (v: string) => {
  form.answer = v;
};
const onContentChange = (v: string) => {
  form.content = v;
};
const handleDelete = async (id: number) => {
  let deleteRequest = {
    id,
  } as DeleteRequest;
  let result = await QuestionControllerService.deleteQuestionUsingPost(
    deleteRequest
  );
  if (result.code == 0) {
    message.success("删除成功！");
    await getQuestionList();
  } else {
    message.error("删除失败！");
  }
};
const addItem = () => {
  form.judgeCase.push({ input: "", output: "" });
};

const removeItem = (index: number) => {
  form.judgeCase.splice(index, 1);
};
const handleEditSubmit = async () => {
  //提交
  let result = await QuestionControllerService.editQuestionUsingPost(form);
  if (result.code == 0) {
    message.success("修改成功！");
    visible.value = false;
    //重新调用获取列表的函数保证数据更新
    await getQuestionList();
  } else {
    message.error("修改失败！");
  }
};
</script>
<style scoped>
#manageQuestionView {
}
.add-btn {
  margin-left: 50px;
}
</style>
