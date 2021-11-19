<template>
  <div class="carousel">
    <el-card>
      <p class="pTitle" style="margin-top:30px;">
        2、卡片切换
      </p>
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="(item, index) in imgdata" :key="index">
          <img :src="item" style="width: 100%;height: 100%" />
          <h3 class="textH3">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="dujia">
        <span>Only独家</span>
        <div class="img">
          <img
            src="	https://cdn3-banquan.ituchong.com/weili/l/1054277384466858166.webp"
            alt=""
            class="img_1"
          />
          <img
            src="	http://www.jujiaolvpai.com//Public/Uploads/2021-07-29/61027f4ac2674.jpg"
            alt=""
            class="img_2"
          />
          <img
            src="		https://cdn9-banquan.ituchong.com/weili/sm/1089536454578929915.webp"
            alt=""
            class="img_3"
          />
          <img
            src="	https://cdn9-banquan.ituchong.com/weili/l/789800135931461642.webp"
            alt=""
            class="img_4"
          />
        </div>
        <div class="t_img">
          <img
            src="	https://cdn3-banquan.ituchong.com/weili/sm/323230777641664539.webp"
            alt=""
            class="t_img1"
          />
          <img
            src="	https://cdn9-banquan.ituchong.com/weili/sm/323171446963437642.webp"
            alt=""
            class="t_img2"
          />
          <img
            src="	https://cdn3-banquan.ituchong.com/weili/sm/195574093234525243.webp"
            alt=""
            class="t_img3"
          />
          <img
            src="	https://cdn6-banquan.ituchong.com/weili/sm/1092186492357312591.webp"
            alt=""
            class="t_img4 right"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgdata: [
        'https://img0.baidu.com/it/u=88730976,2717934252&fm=26&fmt=auto',
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
.dujia {
  width: 100%;
  height: 100%;
  position: relative;
}
.dujia span {
  width: 10%;
  background: #dd0e54;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  line-height: 50px;
}
.img {
  width: 100%;
  height: 100%;
  position: relative;
}
.img .img_1 {
  width: 53%;
  height: 625px;
}
.img .img_2 {
  width: 45.5%;
  height: 40.5%;
  position: absolute;
  right: 0.7%;
}
.img .img_3 {
  width: 22.5%;
  position: absolute;
  bottom: 5px;
  right: 23.7%;
}
.img .img_4 {
  width: 22.5%;
  height: 57%;
  position: absolute;
  bottom: 5px;
  right: 9px;
}
.t_img {
  width: 100%;
  height: 100%;
  position: relative;
}
.t_img .right {
  margin-right: 0;
}
.t_img1,
.t_img2,
.t_img3,
.t_img4 {
  width: 24.1%;
  margin: 1% 1% 0px 0px;
}
</style>
