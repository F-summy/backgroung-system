<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="data" :border="true" style="width: 100%">
      <el-table-column prop="date" align="center" label="序号" width="70">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="标题" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="小图预览">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg1"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="大图预览">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.bigImg1"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleClick(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog
      title="文章标题编辑"
      :visible.sync="dialogFormVisible"
      top="5vh"
      width="70%"
    >
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description"
            size="medium "
          >
          </el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 中图 -->
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 大图 -->
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, postBanner } from "../../api/banner";
import { BASE_URL } from "../../api/BASE_URL";
import Upload from "../../components/Upload.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      dialogFormVisible: false,
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await getBanner();
      this.data = res.data;
      for (let item of res.data) {
        // if (item.midImg.startsWith(BASE_URL)) continue;
        item.midImg1 = BASE_URL + item.midImg;
        item.bigImg1 = BASE_URL + item.bigImg;
      }
    },
    handleClick(data) {
      if (!data) return;
      this.form = { ...data };
      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      this.dialogFormVisible = false;
      let arr = [...this.data];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      console.log(this.form, arr);
      postBanner(arr).then((res) => {
        this.dialogFormVisible = false; // 关闭掉对话框

        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
        // console.log(this.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
