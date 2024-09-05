<template>
  <div id="addQuestionView">
    <a-form
      ref="formRef"
      :model="form"
      :style="{ width: '80vw' }"
      @submit="handleSubmit"
    >
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
              <a-form-item field="judgeConfig.memoryLimit" label="MemoryLimit">
                <a-input
                  v-model="form.judgeConfig.memoryLimit"
                  placeholder="please enter the question's memoryLimit..."
                />
              </a-form-item>
              <a-form-item field="judgeConfig.timeLimit" label="TimeLimit">
                <a-input
                  v-model="form.judgeConfig.timeLimit"
                  placeholder="please enter the question's timeLimit..."
                />
              </a-form-item>
              <a-form-item field="judgeConfig.stackLimit" label="StackLimit">
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
                <div v-for="(item, index) in form.judgeCase" :key="index">
                  <a-form-item label="Input">
                    <a-input v-model="item.input" placeholder="Enter input" />
                  </a-form-item>
                  <a-form-item label="Output">
                    <a-input v-model="item.output" placeholder="Enter output" />
                  </a-form-item>
                  <a-button block @click="removeItem(index)" status="danger"
                    >Remove</a-button
                  >
                </div>
              </a-scrollbar>
              <a-button block @click="addItem" status="normal" type="outline"
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
              <a-button html-type="submit" status="success" type="outline"
                >Submit</a-button
              >
              <a-button
                @click="$refs.formRef.resetFields()"
                status="warning"
                type="outline"
                >Reset</a-button
              >
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
//题目创建使用表单，明确创建题目所需的内容
import { reactive, ref } from "vue";
import MDEditor from "@/components/MDEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const handleSubmit = async () => {
  //先调用后端接口
  let result = await QuestionControllerService.addQuestionUsingPost(form);
  if (result.code == 0) {
    //如果响应成功，清空数据并跳出成功添加的提示
    form.answer = "";
    form.content = "";
    form.judgeCase = [
      {
        input: "",
        output: "",
      },
    ];
    form.judgeConfig.stackLimit = 0;
    form.judgeConfig.timeLimit = 0;
    form.judgeConfig.memoryLimit = 0;
    form.tags = [];
    form.title = "";
    message.success("添加成功！");
  } else {
    message.error("添加失败！");
  }
};

const form = reactive({
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

const addItem = () => {
  form.judgeCase.push({ input: "", output: "" });
};

const removeItem = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style scoped>
#addQuestionView {
  margin-left: 10vw;
}

.judgeCase-submit {
  margin-top: 20px;
}
</style>
