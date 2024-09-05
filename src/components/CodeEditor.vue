<template>
  <div class="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, withDefaults } from "vue";
const codeEditorRef = ref();
const codeEditor = ref();
// const value = ref("hello world!");

//仍然需要让子组件读父组件内容，进而使得组件更好迁移
interface Props {
  value: string;
  handleChange: (v: string) => void;
}
onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    colorDecorators: true,
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });
  // codeEditor.value.onDidChangeModelContent(() => {
  //   console.log("目前内容是：", toRaw(codeEditor.value).getValue());
  // });
  //如果输入内容发生变化，调用父组件的方法来传导到子组件，参数为toRaw之后的信息
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped></style>
