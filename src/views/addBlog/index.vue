<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      :options="editorOptions"
      height="600px"
    />
    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>
    <!-- 文章头图 -->
    <Upload uploadTitle="文章头图" v-model="form.thumb" />
    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      slot="prepend"
      placeholder="请选择文章分类"
    >
      <el-option
        v-for="item in type"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>

    <div>
      <!-- 发布按钮 -->
      <el-button
        class="add-button"
        type="primary"
        style="margin-top: 15px"
        @click="addArticleHandle"
        >发布文章</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload.vue";
import { getBlogType } from "../../api/blogType";
import { addBlog } from "../../api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
      },
      type: [],
      editorOptions: {
        language: "zh-CN",
      },
    };
  },
  components: {
    Editor,
    Upload,
  },
  async created() {
    const { data } = await getBlogType();
    this.type = data;
  },
  methods: {
    addArticleHandle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        // toc 传递一个空数组过去，之后在服务器根据 markdown 的内容来生成 toc 目录
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      // 对象组装好以后，就提交给服务器
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        addBlog(obj).then(() => {
          this.$router.push("/blogList"); // 跳转到文章列表
        });
      } else {
        this.$message.error("请填写所有内容");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.add-button {
  margin-bottom: 30px;
}
</style>
