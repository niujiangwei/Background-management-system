<template>
  <!-- <img src="./img/漂亮.webp" class="btBg" /> -->
  <div id="app" class="box">
    <ul class="tabs clearfix">
      <li v-for="(tab, index) in tabsName" :key="index">
        <a
          href="#"
          rel="external nofollow"
          class="tab-link"
          @click="tabsSwitch(index)"
          v-bind:class="{ active: tab.isActive }"
          >{{ tab.name }}</a
        >
      </li>
    </ul>
    <div class="cards">
      <div class="tab-card" style="display: block;">
        <div class="waterfall">
          <img src="http://placekitten.com/100/100" alt="300*100" />
          <img src="http://placekitten.com/100/70" alt="300*70" />
          <img src="http://placekitten.com/100/150" alt="300*150" />
          <img src="http://placekitten.com/100/250" alt="300*250" />
          <img src="http://placekitten.com/100/80" alt="300*80" />
          <img src="http://placekitten.com/100/90" alt="300*90" />
          <img src="http://placekitten.com/100/120" alt="300*120" />
          <img src="http://placekitten.com/100/180" alt="300*180" />
          <img src="http://placekitten.com/100/100" alt="300*100" />
          <img src="http://placekitten.com/100/70" alt="300*70" />
          <img src="http://placekitten.com/100/150" alt="300*150" />
          <img src="http://placekitten.com/100/250" alt="300*250" />
          <img src="http://placekitten.com/100/80" alt="300*80" />
          <img src="http://placekitten.com/100/90" alt="300*90" />
          <img src="http://placekitten.com/100/120" alt="300*120" />
          <img src="http://placekitten.com/100/180" alt="300*180" />
          <img src="http://placekitten.com/100/80" alt="300*80" />
          <img src="http://placekitten.com/100/90" alt="300*90" />
          <img src="http://placekitten.com/100/120" alt="300*120" />
          <img src="http://placekitten.com/100/180" alt="300*180" />
        </div>
      </div>
      <div class="tab-card">
        <div
          v-for="(item, index) in list"
          :key="index"
          style="width:100%;height:100%;"
        >
          <img :src="item.pic" alt="" />
        </div>
      </div>
      <div class="tab-card">333</div>
      <div class="tab-card">11</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data: function() {
    return {
      tabsName: [
        {
          name: '校园风',
          isActive: true
        },
        {
          name: '甜美可爱',
          isActive: false
        },
        {
          name: '婚纱照',
          isActive: false
        },
        {
          name: '家庭照',
          isActive: false
        }
      ],
      active: false,
      list: [
        {
          pic: 'https://t7.baidu.com/it/u=850188563,2773576460&fm=193&f=GIF'
        }
      ]
    }
  },
  methods: {
    tabsSwitch: function(tabIndex) {
      var tabCardCollection = document.querySelectorAll('.tab-card'),
        len = tabCardCollection.length
      for (var i = 0; i < len; i++) {
        tabCardCollection[i].style.display = 'none'
        this.tabsName[i].isActive = false
      }
      this.tabsName[tabIndex].isActive = true
      tabCardCollection[tabIndex].style.display = 'block'
    }
  },
  mounted() {
    var colCount
    var colHeightArray = []
    var imgWidth = $('.waterfall img').outerWidth(true)
    colCount = Math.floor($('.waterfall').width() / imgWidth)
    for (var i = 0; i < colCount; i++) {
      colHeightArray[i] = 0
    }
    $('.waterfall img').on('load', function() {
      var minValue = colHeightArray[0]
      var minIndex = 0
      for (var i = 0; i < colCount; i++) {
        if (colHeightArray[i] < minValue) {
          minValue = colHeightArray[i]
          minIndex = i
        }
      }
      $(this).css({
        left: minIndex * imgWidth,
        top: minValue
      })
      colHeightArray[minIndex] += $(this).outerHeight(true)
    })

    $(window).on('resize', function() {
      var colCount
      var colHeightArray = []
      colCount = Math.floor($('.waterfall').width() / imgWidth)
      for (var i = 0; i < colCount; i++) {
        colHeightArray[i] = 0
      }
      $('.waterfall img').each(function() {
        var minValue = colHeightArray[0]
        var minIndex = 0
        for (var i = 0; i < colCount; i++) {
          if (colHeightArray[i] < minValue) {
            minValue = colHeightArray[i]
            minIndex = i
          }
        }
        $(this).css({
          left: minIndex * imgWidth,
          top: minValue
        })
        colHeightArray[minIndex] += $(this).outerHeight(true)
      })
    })
  }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.tabs li {
  float: left;
  margin-right: 8px;
  list-style: none;
}
.tabs .tab-link {
  display: block;
  width: 200px;
  height: 49px;
  text-align: center;
  line-height: 49px;
  text-decoration: none;
  margin-top: 100px;
}
.tabs .tab-link.active {
  height: 47px;
  transition: 0.3s;
  background: #999;
}
.cards {
  float: left;
  width: 60%;
  height: 100%;
}
.cards .tab-card {
  display: none;
  -webkit-animation: fadeEffect 1s;
  animation: fadeEffect 1s;
  width: 100%;
  height: 100%;
  background: pink;
  float: left;
  margin: 5% -9%;
  position: relative;
}
@-webkit-keyframes fadeEffect {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeEffect {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tab-link:hover {
  color: #000;
}
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
  width: 23%;
  height: 900px;
  float: left;
}
.waterfall {
  max-width: 700px;
  margin: 0 auto;
}
.waterfall img {
  width: 100px;
  /* 绝对定位实现瀑布流布局 */
  position: absolute;
  margin: 5px;
  /* 给图片重新排列加上动画效果 */
  transition: all 0.5s;
}
</style>
