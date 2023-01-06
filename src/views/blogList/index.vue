<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      :data="data"
      :border="true"
      style="width: 100%"
      v-loading="listLoading"
    >
      <el-table-column prop="date" align="center" label="序号" width="70">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (currentPage - 1) * eachPage }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="文章名称" width="180">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="图片预览" trigger="hover">
            <el-image
              style="width: 150px; height: 150px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            >
            </el-image>
            <a
              slot="reference"
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        align="center"
        width="280"
        label="文章描述"
      >
        <template slot-scope="scope">
          <div class="description">
            <span>{{ scope.row.description }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="浏览量">
        <template slot-scope="scope">
          <span>{{ scope.row.scanNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="评论量">
        <template slot-scope="scope">
          <span>{{ scope.row.commentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        align="center"
        label="所属分类"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.category.name ? scope.row.category.name : "未分类"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        align="center"
        label="创建日期"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ format(scope.row.createDate) }}</span>
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
              @click="handlEditeClick(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleted(scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination
        background
        :page-size="eachPage"
        :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, total, ->, sizes, jumper"
        :total="count"
        :current-page.sync="pagerCurrentPage"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        @prev-click="prevClickHandle"
        @next-click="nextClickHandle"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getBlog, delBlog } from "@/api/blog";
import format from "..//../utils/format";
import { BASE_URL, FONT_URL } from "@/api/BASE_URL";
export default {
  data() {
    return {
      data: [],
      srcList: [],
      eachPage: 5, // 每一页显示的条数
      currentPage: 1, // 当前页码，默认进来是第一页
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      pagerCurrentPage: 1,
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    format,
    //编辑文章
    handlEditeClick(data) {
      this.$router.push(`/editBlog/${data.id}`);
    },
    async fetchData() {
      this.listLoading = true;
      const { data } = await getBlog(this.currentPage, this.eachPage);
      this.listLoading = false;
      const arr = data.rows;
      for (var i = 0; i < arr.length; i++) {
        arr[i].thumb = BASE_URL + arr[i].thumb;
        this.srcList.push(arr[i].thumb);
      }
      this.data = arr;
      this.count = data.total;
      this.totalPage = Math.ceil(this.count / this.eachPage);
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        this.fetchData();
      }
    },
    // 跳转到具体的文章
    goToTitleHandle(blogInfo) {
      window.open(`${FONT_URL}/article/${blogInfo.id}`);
    },
    //删除文章
    handleDeleted(item) {
      this.$confirm("是否删除该文章及评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBlog(item.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页相关事件
    sizeChangeHandle(pagerNum) {
      this.eachPage = parseInt(pagerNum);
      this.pagerCurrentPage = 1;
      this.currentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.description {
  text-align: left;
}
.page-container {
  margin: 30px 0;
}
</style>
