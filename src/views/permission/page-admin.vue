<template>
  <div class="className">
    <el-card class="anoCard">
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入订单号"
          class="width1"
          v-model="sch_order"
        ></el-input>
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholde="请选择状态"
        >
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          class="width1"
          v-model="sch_date"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchTab()"
          >搜索</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addTab"
          >添加</el-button
        >
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column prop="order" label="订单号"></el-table-column>
        <el-table-column prop="time" label="下单时间"></el-table-column>
        <el-table-column
          prop="address"
          label="配送地址"
          width="210"
        ></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column
          prop="name"
          label="配送员"
          width="70"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="90">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">{{
              scope.row.status | statusText
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editTable(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              @click="toConfirm(scope.row)"
              :disabled="scope.row.status === 1 ? false : true"
              >配送</el-button
            >
            <el-button
              type="success"
              @click="toSuccess(scope.row)"
              :disabled="scope.row.status === 2 ? false : true"
              >完成</el-button
            >
            <el-button
              type="danger"
              @click="toDelete(scope.row)"
              :disabled="scope.row.status !== 3 ? false : true"
              >取消</el-button
            >
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
    <el-dialog title="订单修改" :visible.sync="diaIsShow" class="diaForm">
      <el-form
        ref="diaForm"
        :model="formData"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="订单号">
          <el-input
            type="text"
            v-model="formData.order"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="time">
          <el-date-picker
            v-model="formData.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="配送地址" prop="address">
          <el-input
            type="text"
            placeholder="请输入地址"
            v-model="formData.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            type="text"
            placeholder="请输入电话"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="配送员" prop="name">
          <el-input
            type="text"
            placeholder="请输入姓名"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholde="请选择状态">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeTab('diaForm', editType)"
            >确认</el-button
          >
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPageTab2 } from '@/api/table'
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '待精修', value: 1 },
        { label: '配送中', value: 2 },
        { label: '已完成', value: 0 },
        { label: '已取消', value: 3 }
      ],
      rowIndex: 0,
      rules: {
        // order: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        time: [
          {
            // type: 'datetime',
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择订单状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this._getPageTab2()
  },
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '待精修'
      } else if (val === 2) {
        return '配送中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'info'
      } else if (val === 2) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    _getPageTab2() {
      getPageTab2()
        .then(res => {
          console.log(res.data, 'res.data')
          const aa = {
            total: 100,
            tableList: [
              {
                id: 1,
                order: '440000199212132340',
                name: '汪勇',
                time: '1983-06-25 06:29:13',
                address: '河南省 开封市',
                phone: '14452658162',
                status: 3
              },
              {
                id: 2,
                order: '220000198905087444',
                name: '冯勇',
                time: '1990-05-21 17:15:14',
                address: '广西壮族自治区 梧州市',
                phone: '13578345763',
                status: 1
              },
              {
                id: 3,
                order: '450000198309285746',
                name: '姜艳',
                time: '2006-05-07 22:30:04',
                address: '江西省 抚州市',
                phone: '13861676712',
                status: 1
              },
              {
                id: 4,
                order: '990000202106173191',
                name: '刘强',
                time: '2007-01-16 19:21:17',
                address: '宁夏回族自治区 吴忠市',
                phone: '13523446680',
                status: 1
              },
              {
                id: 5,
                order: '810000198107103171',
                name: '蒋娜',
                time: '1985-01-03 01:32:16',
                address: '广东省 阳江市',
                phone: '13119422977',
                status: 1
              },
              {
                id: 6,
                order: '710000199403127611',
                name: '戴超',
                time: '1996-03-16 18:57:37',
                address: '湖南省 株洲市',
                phone: '13577734171',
                status: 1
              },
              {
                id: 7,
                order: '440000198703298738',
                name: '余桂英',
                time: '2012-11-26 17:38:44',
                address: '福建省 泉州市',
                phone: '14980422920',
                status: 2
              },
              {
                id: 8,
                order: '150000199806225318',
                name: '戴静',
                time: '1981-01-07 02:29:37',
                address: '河南省 鹤壁市',
                phone: '14252092621',
                status: 2
              },
              {
                id: 9,
                order: '610000199903304262',
                name: '潘敏',
                time: '1995-07-25 00:30:55',
                address: '湖北省 黄石市',
                phone: '13163815467',
                status: 3
              },
              {
                id: 10,
                order: '210000201804109424',
                name: '马丽',
                time: '2009-01-27 15:19:40',
                address: '黑龙江省 齐齐哈尔市',
                phone: '15122872772',
                status: 1
              },
              {
                id: 11,
                order: '370000198411127445',
                name: '袁强',
                time: '1972-01-07 23:41:02',
                address: '新疆维吾尔自治区 克拉玛依市',
                phone: '13976354017',
                status: 0
              },
              {
                id: 12,
                order: '520000197005040882',
                name: '龙艳',
                time: '1980-08-02 02:28:08',
                address: '重庆 重庆市',
                phone: '13501325365',
                status: 3
              },
              {
                id: 13,
                order: '350000198901162143',
                name: '何桂英',
                time: '2009-08-04 21:57:10',
                address: '山东省 聊城市',
                phone: '14564190921',
                status: 1
              },
              {
                id: 14,
                order: '620000199001306885',
                name: '常磊',
                time: '2019-09-23 09:24:06',
                address: '云南省 临沧市',
                phone: '13445687242',
                status: 1
              },
              {
                id: 15,
                order: '710000200001246891',
                name: '孙秀兰',
                time: '1978-03-15 13:00:19',
                address: '福建省 漳州市',
                phone: '14623652986',
                status: 2
              },
              {
                id: 16,
                order: '63000020210221488X',
                name: '罗秀英',
                time: '1996-06-27 22:37:28',
                address: '台湾 南投县',
                phone: '14108710534',
                status: 3
              },
              {
                id: 17,
                order: '440000197304193627',
                name: '曹敏',
                time: '1983-05-14 01:54:41',
                address: '四川省 南充市',
                phone: '14158296848',
                status: 2
              },
              {
                id: 18,
                order: '410000201612161540',
                name: '史磊',
                time: '2013-02-22 22:41:03',
                address: '甘肃省 张掖市',
                phone: '17013384771',
                status: 2
              },
              {
                id: 19,
                order: '530000200012025281',
                name: '熊超',
                time: '1977-11-17 03:31:28',
                address: '海外 海外',
                phone: '15784642617',
                status: 2
              },
              {
                id: 20,
                order: '130000201902161998',
                name: '高娜',
                time: '2013-09-17 04:09:24',
                address: '浙江省 台州市',
                phone: '14935143611',
                status: 3
              },
              {
                id: 21,
                order: '630000197104056463',
                name: '董洋',
                time: '1994-07-10 06:08:30',
                address: '河北省 张家口市',
                phone: '15875252474',
                status: 3
              },
              {
                id: 22,
                order: '130000201306132306',
                name: '郝洋',
                time: '2018-10-12 22:34:06',
                address: '四川省 绵阳市',
                phone: '14737081500',
                status: 1
              },
              {
                id: 23,
                order: '43000020080310621X',
                name: '许强',
                time: '2004-05-28 06:50:34',
                address: '青海省 海西蒙古族藏族自治州',
                phone: '13145346812',
                status: 1
              },
              {
                id: 24,
                order: '530000201405312243',
                name: '黎杰',
                time: '2010-12-23 10:44:41',
                address: '北京 北京市',
                phone: '13047185864',
                status: 2
              },
              {
                id: 25,
                order: '220000197801297311',
                name: '杜霞',
                time: '2008-11-16 02:41:10',
                address: '山西省 阳泉市',
                phone: '13618113676',
                status: 1
              },
              {
                id: 26,
                order: '370000197504138237',
                name: '邱超',
                time: '2014-05-03 02:29:53',
                address: '贵州省 遵义市',
                phone: '14777842184',
                status: 1
              },
              {
                id: 27,
                order: '530000200604106448',
                name: '陈艳',
                time: '1970-10-26 12:35:21',
                address: '安徽省 黄山市',
                phone: '15272868937',
                status: 1
              },
              {
                id: 28,
                order: '370000198911152989',
                name: '钱明',
                time: '2021-06-14 08:18:24',
                address: '海外 海外',
                phone: '19337479505',
                status: 1
              },
              {
                id: 29,
                order: '460000201710164445',
                name: '顾涛',
                time: '1983-01-27 20:44:08',
                address: '贵州省 毕节市',
                phone: '16221176858',
                status: 3
              },
              {
                id: 30,
                order: '310000200702100743',
                name: '侯霞',
                time: '1983-09-08 07:55:41',
                address: '浙江省 衢州市',
                phone: '16359177661',
                status: 1
              },
              {
                id: 31,
                order: '370000199202032188',
                name: '易勇',
                time: '1998-01-10 10:25:44',
                address: '广西壮族自治区 柳州市',
                phone: '14760492868',
                status: 1
              },
              {
                id: 32,
                order: '230000197009207871',
                name: '郭霞',
                time: '2012-08-19 01:12:13',
                address: '重庆 重庆市',
                phone: '15436633913',
                status: 1
              },
              {
                id: 33,
                order: '540000197412085117',
                name: '郭涛',
                time: '1992-12-03 05:20:22',
                address: '吉林省 四平市',
                phone: '15651324644',
                status: 0
              },
              {
                id: 34,
                order: '410000200011306922',
                name: '许杰',
                time: '1988-10-09 07:42:09',
                address: '重庆 重庆市',
                phone: '16368219284',
                status: 2
              },
              {
                id: 35,
                order: '440000199204234806',
                name: '钱艳',
                time: '2005-01-14 10:40:39',
                address: '贵州省 黔南布依族苗族自治州',
                phone: '14924047742',
                status: 0
              },
              {
                id: 36,
                order: '340000198008047271',
                name: '尹娟',
                time: '2015-05-17 01:54:24',
                address: '陕西省 榆林市',
                phone: '14630171770',
                status: 2
              },
              {
                id: 37,
                order: '220000199108274313',
                name: '黎秀英',
                time: '1971-05-21 03:20:12',
                address: '海南省 三亚市',
                phone: '13710621085',
                status: 0
              },
              {
                id: 38,
                order: '710000199809121842',
                name: '廖杰',
                time: '1981-05-02 00:54:21',
                address: '安徽省 巢湖市',
                phone: '13587663143',
                status: 0
              },
              {
                id: 39,
                order: '420000197603106032',
                name: '崔军',
                time: '1988-10-17 22:48:54',
                address: '广西壮族自治区 玉林市',
                phone: '13619144044',
                status: 1
              },
              {
                id: 40,
                order: '120000197304193956',
                name: '卢秀兰',
                time: '1971-06-22 13:10:09',
                address: '湖北省 十堰市',
                phone: '14761765896',
                status: 1
              },
              {
                id: 41,
                order: '420000199803131741',
                name: '何明',
                time: '1998-02-21 22:15:14',
                address: '河北省 沧州市',
                phone: '14187558276',
                status: 3
              },
              {
                id: 42,
                order: '520000199905065179',
                name: '雷洋',
                time: '2013-10-01 08:41:46',
                address: '广东省 广州市',
                phone: '13534643619',
                status: 1
              },
              {
                id: 43,
                order: '14000019990408676X',
                name: '郝军',
                time: '1984-12-25 11:41:25',
                address: '新疆维吾尔自治区 乌鲁木齐市',
                phone: '15987113454',
                status: 1
              },
              {
                id: 44,
                order: '530000200605053472',
                name: '郝勇',
                time: '1983-06-27 17:46:07',
                address: '江西省 抚州市',
                phone: '17124942195',
                status: 1
              },
              {
                id: 45,
                order: '420000197604066976',
                name: '梁敏',
                time: '1970-05-13 17:44:11',
                address: '上海 上海市',
                phone: '13423115416',
                status: 2
              },
              {
                id: 46,
                order: '440000199309199023',
                name: '刘强',
                time: '1982-09-21 21:33:37',
                address: '北京 北京市',
                phone: '13262018348',
                status: 0
              },
              {
                id: 47,
                order: '440000197904138285',
                name: '蔡磊',
                time: '2012-04-27 05:39:50',
                address: '宁夏回族自治区 石嘴山市',
                phone: '13576228959',
                status: 1
              },
              {
                id: 48,
                order: '510000199010185530',
                name: '戴强',
                time: '1985-10-28 09:18:24',
                address: '内蒙古自治区 乌海市',
                phone: '13757518822',
                status: 2
              },
              {
                id: 49,
                order: '620000199502095203',
                name: '杨桂英',
                time: '2007-07-10 10:27:04',
                address: '河北省 保定市',
                phone: '14245353667',
                status: 1
              },
              {
                id: 50,
                order: '320000197510272791',
                name: '常刚',
                time: '1970-12-24 13:38:17',
                address: '河南省 安阳市',
                phone: '13667527512',
                status: 2
              },
              {
                id: 51,
                order: '530000200707097644',
                name: '何丽',
                time: '1975-04-21 02:33:21',
                address: '湖南省 常德市',
                phone: '13280343114',
                status: 2
              },
              {
                id: 52,
                order: '640000202103191458',
                name: '杜超',
                time: '1977-12-20 17:35:37',
                address: '湖南省 湘潭市',
                phone: '13272641655',
                status: 1
              },
              {
                id: 53,
                order: '370000197206156349',
                name: '余静',
                time: '2006-01-16 08:28:39',
                address: '江西省 鹰潭市',
                phone: '13322584124',
                status: 0
              },
              {
                id: 54,
                order: '540000201109309463',
                name: '薛强',
                time: '1971-12-16 20:59:42',
                address: '海南省 海口市',
                phone: '13337322286',
                status: 2
              },
              {
                id: 55,
                order: '500000202004146183',
                name: '任洋',
                time: '2010-06-21 19:03:40',
                address: '香港特别行政区 九龙',
                phone: '14132453358',
                status: 2
              },
              {
                id: 56,
                order: '430000200112309763',
                name: '孔敏',
                time: '1980-06-21 08:06:05',
                address: '福建省 莆田市',
                phone: '16751479288',
                status: 2
              },
              {
                id: 57,
                order: '140000200803296018',
                name: '吕秀兰',
                time: '1985-06-20 08:24:05',
                address: '吉林省 白城市',
                phone: '18277295515',
                status: 2
              },
              {
                id: 58,
                order: '370000198905042898',
                name: '黎磊',
                time: '2001-08-18 12:23:18',
                address: '贵州省 遵义市',
                phone: '13411323639',
                status: 2
              },
              {
                id: 59,
                order: '340000202002124116',
                name: '蔡涛',
                time: '2016-11-25 15:44:02',
                address: '上海 上海市',
                phone: '15170646731',
                status: 1
              },
              {
                id: 60,
                order: '140000201303255812',
                name: '钱超',
                time: '1988-12-04 06:48:25',
                address: '广西壮族自治区 钦州市',
                phone: '13627724444',
                status: 2
              },
              {
                id: 61,
                order: '350000201607074016',
                name: '毛敏',
                time: '2019-07-04 14:52:16',
                address: '吉林省 白山市',
                phone: '13749383274',
                status: 3
              },
              {
                id: 62,
                order: '710000198407272790',
                name: '叶静',
                time: '2018-06-03 23:49:05',
                address: '湖南省 永州市',
                phone: '18856232552',
                status: 3
              },
              {
                id: 63,
                order: '63000019700724135X',
                name: '文静',
                time: '2015-08-27 02:38:29',
                address: '山西省 太原市',
                phone: '16576917345',
                status: 1
              },
              {
                id: 64,
                order: '150000201806023361',
                name: '阎桂英',
                time: '2000-05-21 14:19:42',
                address: '上海 上海市',
                phone: '14814737408',
                status: 1
              },
              {
                id: 65,
                order: '990000199110304823',
                name: '曾磊',
                time: '2018-03-27 15:20:09',
                address: '甘肃省 酒泉市',
                phone: '13843463013',
                status: 2
              },
              {
                id: 66,
                order: '330000201701136750',
                name: '史静',
                time: '1976-02-24 18:43:16',
                address: '台湾 台东县',
                phone: '14382416445',
                status: 2
              },
              {
                id: 67,
                order: '500000201807254458',
                name: '熊伟',
                time: '2015-10-18 22:36:06',
                address: '重庆 重庆市',
                phone: '15955786923',
                status: 2
              },
              {
                id: 68,
                order: '990000201909284253',
                name: '易娜',
                time: '1972-06-10 00:12:34',
                address: '广西壮族自治区 百色市',
                phone: '19367371431',
                status: 1
              },
              {
                id: 69,
                order: '440000198903171862',
                name: '范娜',
                time: '1971-01-04 00:38:17',
                address: '广东省 清远市',
                phone: '13536302775',
                status: 0
              },
              {
                id: 70,
                order: '990000201806272364',
                name: '谭刚',
                time: '2015-01-02 16:13:02',
                address: '山东省 济宁市',
                phone: '14933457566',
                status: 1
              },
              {
                id: 71,
                order: '150000197505129550',
                name: '李丽',
                time: '1978-01-02 14:28:18',
                address: '山东省 枣庄市',
                phone: '14449368364',
                status: 0
              },
              {
                id: 72,
                order: '510000200306033371',
                name: '李平',
                time: '2015-08-29 11:20:14',
                address: '上海 上海市',
                phone: '13227386723',
                status: 2
              },
              {
                id: 73,
                order: '46000020210711988X',
                name: '韩洋',
                time: '1982-09-27 03:08:07',
                address: '香港特别行政区 九龙',
                phone: '13073159528',
                status: 1
              },
              {
                id: 74,
                order: '510000199404161793',
                name: '曾娜',
                time: '1992-06-16 21:17:20',
                address: '广西壮族自治区 崇左市',
                phone: '13113382718',
                status: 2
              },
              {
                id: 75,
                order: '460000197408261501',
                name: '邵强',
                time: '1983-10-06 23:39:44',
                address: '云南省 保山市',
                phone: '15675267810',
                status: 3
              },
              {
                id: 76,
                order: '520000201610057112',
                name: '曹丽',
                time: '2006-10-16 11:28:30',
                address: '北京 北京市',
                phone: '14319808241',
                status: 2
              },
              {
                id: 77,
                order: '450000201802158614',
                name: '冯明',
                time: '2017-01-28 21:04:10',
                address: '福建省 南平市',
                phone: '13416454842',
                status: 3
              },
              {
                id: 78,
                order: '450000201012104371',
                name: '邱杰',
                time: '2007-09-01 19:49:16',
                address: '天津 天津市',
                phone: '15574732024',
                status: 2
              },
              {
                id: 79,
                order: '420000201703015671',
                name: '董军',
                time: '2019-08-24 05:23:56',
                address: '山西省 阳泉市',
                phone: '13751268569',
                status: 1
              },
              {
                id: 80,
                order: '820000197806152762',
                name: '乔丽',
                time: '1980-12-04 19:06:22',
                address: '黑龙江省 绥化市',
                phone: '13627354740',
                status: 1
              },
              {
                id: 81,
                order: '220000199209136606',
                name: '苏秀英',
                time: '1990-07-31 11:36:49',
                address: '江苏省 南通市',
                phone: '13313479318',
                status: 1
              },
              {
                id: 82,
                order: '430000197008176126',
                name: '汪勇',
                time: '1999-07-12 17:34:15',
                address: '吉林省 白城市',
                phone: '19947453483',
                status: 1
              },
              {
                id: 83,
                order: '330000197109082731',
                name: '钱杰',
                time: '2018-09-19 00:19:16',
                address: '陕西省 渭南市',
                phone: '14789886506',
                status: 0
              },
              {
                id: 84,
                order: '120000198802100315',
                name: '沈磊',
                time: '1971-10-17 23:55:31',
                address: '陕西省 宝鸡市',
                phone: '13622853851',
                status: 2
              },
              {
                id: 85,
                order: '31000019711206221X',
                name: '蒋静',
                time: '1980-06-27 12:22:18',
                address: '湖南省 郴州市',
                phone: '13156756125',
                status: 1
              },
              {
                id: 86,
                order: '360000200307210036',
                name: '江勇',
                time: '1981-09-22 20:10:16',
                address: '澳门特别行政区 澳门半岛',
                phone: '13176628642',
                status: 2
              },
              {
                id: 87,
                order: '410000197512141826',
                name: '梁洋',
                time: '1974-03-26 15:04:40',
                address: '四川省 广安市',
                phone: '16736070974',
                status: 3
              },
              {
                id: 88,
                order: '630000197412099158',
                name: '赖静',
                time: '1997-11-13 10:08:22',
                address: '西藏自治区 日喀则地区',
                phone: '15127718283',
                status: 0
              },
              {
                id: 89,
                order: '630000200307166691',
                name: '高磊',
                time: '1976-06-06 09:26:59',
                address: '贵州省 铜仁市',
                phone: '16852248412',
                status: 3
              },
              {
                id: 90,
                order: '120000201301159858',
                name: '贺秀英',
                time: '1983-05-11 07:45:02',
                address: '天津 天津市',
                phone: '13621491632',
                status: 1
              },
              {
                id: 91,
                order: '110000200502223338',
                name: '段军',
                time: '2021-07-23 11:19:17',
                address: '河北省 承德市',
                phone: '14132605669',
                status: 2
              },
              {
                id: 92,
                order: '360000200601074805',
                name: '顾秀兰',
                time: '2006-12-19 20:45:18',
                address: '西藏自治区 日喀则地区',
                phone: '13823155758',
                status: 1
              },
              {
                id: 93,
                order: '450000201202263920',
                name: '武勇',
                time: '1970-12-11 17:24:36',
                address: '天津 天津市',
                phone: '13244506248',
                status: 1
              },
              {
                id: 94,
                order: '110000198601057398',
                name: '叶平',
                time: '1997-11-08 05:41:02',
                address: '贵州省 黔西南布依族苗族自治州',
                phone: '15162124036',
                status: 3
              },
              {
                id: 95,
                order: '640000198705185267',
                name: '江芳',
                time: '1970-11-19 16:53:38',
                address: '陕西省 铜川市',
                phone: '13225535878',
                status: 2
              },
              {
                id: 96,
                order: '64000020060813226X',
                name: '吴涛',
                time: '2015-11-28 04:39:33',
                address: '澳门特别行政区 离岛',
                phone: '14527832296',
                status: 2
              },
              {
                id: 97,
                order: '140000197805118624',
                name: '张芳',
                time: '1991-11-11 05:25:49',
                address: '山西省 运城市',
                phone: '19677170417',
                status: 1
              },
              {
                id: 98,
                order: '320000201005092457',
                name: '常洋',
                time: '2004-07-21 19:32:20',
                address: '陕西省 榆林市',
                phone: '14807836987',
                status: 0
              },
              {
                id: 99,
                order: '130000198212228580',
                name: '范静',
                time: '1986-07-22 11:45:53',
                address: '江西省 上饶市',
                phone: '14153478332',
                status: 3
              },
              {
                id: 100,
                order: '65000019790405657X',
                name: '杨勇',
                time: '2005-04-15 05:22:32',
                address: '吉林省 辽源市',
                phone: '15156466873',
                status: 1
              }
            ]
          }
          // this.allList = res.data.tableList
          this.allList = aa.tableList
          this.schArr = this.allList
          this.getPageData()
          this.total = res.data.total
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
      console.log(this.tableData, 'this.tableData')
    },
    // 查找
    searchTab() {
      let arrList = []
      for (let item of this.allList) {
        if (
          this.sch_order.trim() === '' &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList
          break
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item)
          arrList.push(obj)
        }
      }
      this.schArr = arrList
      this.total = arrList.length
      this.currentPage = 1
      this.pageSize = 10
      this.getPageData()
    },
    // add
    addTab() {
      this.formData = {}
      this.diaIsShow = true
      this.formData.order = (Math.random() * 10e18).toString()
      this.formData.id = this.allList.length + 1
      this.editType = 'add'
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
    },
    // 审核
    toConfirm(row) {
      row.status = 2
      this.$notify({
        title: '成功',
        message: '审核提交成功',
        type: 'success'
      })
    },
    // 完成
    toSuccess(row) {
      row.status = 0
      this.$notify({
        title: '成功',
        message: '该订单已完成配送',
        type: 'success'
      })
    },
    // 取消
    toDelete(row) {
      row.status = 3
      this.$notify({
        title: '成功',
        message: '已取消该订单',
        type: 'success'
      })
    },
    // 编辑
    editTable(index, row) {
      this.formData = Object.assign({}, row)
      this.editType = 'update'
      this.diaIsShow = true
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
      this.rowIndex = index
    },
    changeTab(form, type) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === 'update') {
            // 改变整个表格数据
            let start = (this.currentPage - 1) * this.pageSize
            this.allList[start + this.rowIndex] = Object.assign(
              {},
              this.formData
            )
            // 解决数组不能通过索引响应数据变化
            this.$set(
              this.tableData,
              this.rowIndex,
              Object.assign({}, this.formData)
            )
            this.$notify({
              title: '成功',
              message: '订单已修改成功',
              type: 'success'
            })
          } else {
            this.tableData.unshift(Object.assign({}, this.formData))
            this.allList.push(Object.assign({}, this.formData))
          }
          this.diaIsShow = false
        } else {
          return
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
  padding-bottom: 20px;
}
.anoCard .el-table .el-button {
  padding: 8px 18px;
  font-size: 12px;
}
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
}
.diaForm {
  .el-input {
    width: 350px;
  }
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
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>
