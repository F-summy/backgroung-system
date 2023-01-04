<template>
  <div class="app-container">
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-select
          v-model="select"
          slot="prepend"
          placeholder="输入文章分类，左边选择分类等级！"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
