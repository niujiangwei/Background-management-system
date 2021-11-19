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
        111
        <!-- <ul class="list_ui">
          <li v-for="(List, index) in list" :key="index">
            <div class="text">{{ List.title }}</div>
            <img
              :src="List.pic"
              style="width: 100%;height: 100%"
              class="List_pic"
            />
          </li>
        </ul> -->
      </div>
      <div class="tab-card">222</div>
      <div class="tab-card">333</div>
      <div class="tab-card">11</div>
    </div>
  </div>
</template>

<script>
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
        // {
        //   title: 'title',
        //   pic: ''
        // },
        // {
        //   title: 'title',
        //   pic: ''
        // }
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
}
.cards .tab-card {
  display: none;
  -webkit-animation: fadeEffect 1s;
  animation: fadeEffect 1s;
  width: 800px;
  height: 800px;
  background: pink;
  float: left;
  margin: 36px 100px;
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
  width: 200px;
  height: 900px;
  float: left;
}
</style>
