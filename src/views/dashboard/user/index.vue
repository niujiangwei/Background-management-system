<template>
  <div class="user_hone">
    <div class="banner">
      <img
        src="	https://cdn9-banquan.ituchong.com/weili/l/918172946039570442.webp"
        alt=""
      />
      <div class="back"></div>
      <span class="banner_text">Gallery</span>
      <span class="banner_text2">欢迎进入您的管理系统</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.banner img {
  position: relative;
  top: -35px;
  left: -30px;
  width: 107%;
  height: 872px;
}
.banner_text {
  font-size: 18vh;
  color: #fff;
  opacity: 0.7;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  position: absolute;
  right: 3%;
  top: 17%;
}
.banner_text2 {
  position: absolute;
  bottom: 99px;
  color: #fff;
  opacity: 0.7;
  right: 5%;
  font-size: 8vh;
  width: 27%;
}
.back {
  background: #5ca9ba;
  width: 492px;
  height: 122px;
  position: absolute;
  bottom: 47px;
  left: 200px;
  z-index: 10000;
}
</style>
