<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>
<!--如果只是在Editor组件里面绑定属性和事件，那么对于引用组件的页面而言，是无法得到编辑器中输入的值的，所以现在要使用父子组件来传递数据-->
<!--使用props属性让Editor组件只能读父组件传来的信息，将对组件值的改变全部放在父组件上进行-->
<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";

//定义一下传给子组件的值，写成一个接口的形式
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}
const plugins = [gfm(), highlight()];

// const value = ref("");
//
// const handleChange = (v: string) => {
//   value.value = v;
// };
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped></style>
