<template>
  <div class="className">
    <el-card>
      <div slot="header">
        <span>基础表格</span>
      </div>
      <el-button type="primary" @click="add">添加</el-button>
      <el-table
        :data="
          tableData.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id"> </el-table-column>
        <el-table-column label="Date" prop="date"> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column label="下单金额" prop="price"> </el-table-column>
        <el-table-column label="系列" prop="style"> </el-table-column>
        <el-table-column label="拍摄地址" prop="address"> </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              @keyup.enter.native="addAnswer"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="" :visible.sync="dialogVisible" width="80%">
      <el-form label-width="80px" :model="motaikuang">
        <el-form-item label="名称">
          <el-input v-model="motaikuang.name"></el-input>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="motaikuang.id"></el-input>
        </el-form-item>
        <el-form-item label="下单金额">
          <el-date-picker
            v-model="motaikuang.date"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下单金额">
          <el-input v-model="motaikuang.price"></el-input>
        </el-form-item>
        <el-form-item label="系列">
          <el-input v-model="motaikuang.style"></el-input>
        </el-form-item>
        <el-form-item label="拍摄地址">
          <el-input v-model="motaikuang.address"></el-input>
        </el-form-item>
      </el-form>

      <el-button
        type="info"
        icon="el-icon-close"
        circle
        @click="closeDialog"
      ></el-button>

      <el-button
        type="success"
        icon="el-icon-check"
        circle
        @click="commitEdit"
      ></el-button>
    </el-dialog>

    <el-card class="mtop30 anoCard">
      <div slot="header">
        <span>带分页表格</span>
      </div>
      <el-table :data="tablePage" border stripe style="width: 100%;">
        <el-table-column prop="num" label="序号" width="120"></el-table-column>
        <el-table-column prop="id" label="ID#"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">{{
              scope.row.status | statusText
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        class="fyDiv"
        @size-change="handleSize"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getPageTab1 } from '@/api/table'
import $ from 'jquery'
export default {
  data() {
    return {
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '虎',
          price: '12000',
          style: '暗黑系',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '2',
          date: '2016-05-04',
          price: '25000',
          style: '西式',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: '3',
          date: '2016-05-01',
          price: '40000',
          style: '中式',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: '4',
          date: '2016-05-03',
          price: '22000',
          style: '街头',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      motaikuang: {},
      dialogVisible: false,
      activeName: 'info',
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      tablePage: [],
      // 添加按钮点击的状态值
      addstate: 0
    }
  },
  created() {
    this._getPageTab1(1, 10)
  },
  mounted() {
    this.updata()
  },
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '进行中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    // 提交修改
    commitEdit() {
      // this.dialogVisible = false

      if (this.addstate == 1) {
        $.ajax({
          type: 'POST',
          url: 'http://127.0.0.1:30000/add',
          data: this.motaikuang,
          dataType: 'text',
          async: false,
          success: data => {
            this.dialogVisible = false
            console.log(this, this.motaikuang, data, 'data')
          },
          error: (data, textStatus, errorThrown) => {
            this.dialogVisible = false
            console.log(data, textStatus, errorThrown, 'error,data')
          }
        })
        this.addstate = 0
        this.updata()
      } else {
        $.ajax({
          type: 'POST',
          url: 'http://127.0.0.1:30000/edit',
          data: this.motaikuang,
          dataType: 'text',
          async: false,
          success: data => {
            this.dialogVisible = false
            console.log(this, this.motaikuang, data, 'data')
          },
          error: (data, textStatus, errorThrown) => {
            this.dialogVisible = false
            console.log(data, textStatus, errorThrown, 'error,data')
          }
        })
        console.log(this.motaikuang)
        this.updata()
      }
    },
    // 更新
    updata() {
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:30000/table',
        data: {},
        dataType: 'json',
        async: false,
        success: data => {
          this.tableData = data
          console.log(this, this.tableData, data, 'data')
        },
        error: function(data, textStatus, errorThrown) {
          console.log(data, textStatus, errorThrown, 'error,data')
        }
      })
    },
    // 添加
    add() {
      this.dialogVisible = true
      this.addstate = 1
      console.log(this.motaikuang, 'motaikuang')
    },
    // 关闭模态框
    closeDialog() {
      this.dialogVisible = false
    },
    // 修改按钮
    handleEdit(index, row) {
      this.dialogVisible = true
      this.motaikuang = row
      console.log(this.motaikuang, index, row)
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(index, row)
      /*提示消息*/
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:30000/delete',
            data: { id: row.id },
            dataType: 'text',
            async: false,
            success: data => {
              console.log(this, data, 'data')
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            },
            error: function(data, textStatus, errorThrown) {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
              console.log(data, textStatus, errorThrown, 'error,data')
            }
          })
          this.updata()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      /*如果用户确认打印confirm,如果用户取消显示cancel*/
    },
    handleSize(val) {
      this.pageSize = val
      this._getPageTab1(this.currentPage, val)
    },
    handlePage(val) {
      this.currentPage = val
      this._getPageTab1(val, this.pageSize)
    },
    _getPageTab1(current, size) {
      getPageTab1({ currentPage: current, pageSize: size })
        .then(res => {
          this.total = res.data.total
          this.tablePage = res.data.tableList
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    addAnswer() {
      // this.search = '空'
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
}
</style>
<style lang="scss">
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
</style>
