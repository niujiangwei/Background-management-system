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
      <!-- <div class="lalal"></div> -->
      <!-- <img src="./image/学校1.jpg" alt="" /> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgdata: [
        '	http://localhost:8080/static/img/%E5%AD%A6%E6%A0%A11.078a351b.jpg',
        'https://img.bj520.com/202111/0a0b5ec4f6.jpg',
        'https://img.bj520.com/202111/3c2e013605.jpg',
        'https://img.bj520.com/202111/2ad5a3062b.jpg'
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
/* .lalal {
  background: url(http://localhost:8080/static/img/1.3a9f762e.jpg);
} */
</style>
