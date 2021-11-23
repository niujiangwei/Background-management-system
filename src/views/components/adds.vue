<template>
  <div class="carousel">
    <el-card>
      <el-carousel :interval="4000" indicator-position="outside">
        <el-carousel-item
          v-for="(item, index) in imgdata"
          :key="index"
          style="width: 51%;margin-left: 24%;"
        >
          <img :src="item" style="width: 100%;height: 100%" />
          <h3 class="textH3">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="min_width">
        <div class="tiaotiao"></div>
        <img src="./image/3.jpg" alt="" />
        <div class="tiaotiao"></div>
        <img src="./image/2.jpg" alt="" />
        <div class="tiaotiao"></div>
        <img src="./image/1.jpg" alt="" />
        <div class="tiaotiao"></div>
        <img src="./image/4.jpg" alt="" />
        <div class="tiaotiao"></div>
        <img src="./image/5.jpg" alt="" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgdata: [
        'http://localhost:8080/static/img/%E5%AD%A6%E6%A0%A16.ec57f935.jpg',
        'http://localhost:8080/static/img/%E5%AD%A6%E6%A0%A15.a010c24d.jpg',
        'http://localhost:8080/static/img/%E5%AD%A6%E6%A0%A14.acdb61f7.jpg',
        'http://localhost:8080/static/img/%E5%AD%A6%E6%A0%A13.03b6b7d0.jpg'
      ]
    }
  }
}
</script>
<style>
.textH3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.min_width {
  width: 80%;
  margin: auto;
}
.min_width img {
  width: 45%;
  margin: auto;
  display: inherit;
}
.min_width .tiaotiao {
  width: 45%;
  height: 50px;
  background: #999;
  margin: 20px auto;
}
</style>
