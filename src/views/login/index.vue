<template>
  <div class="login">
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify
            @success="onSuccess"
            @fail="onFail"
            :sliderText="text"
            :w="350"
            :h="175"
            ref="slideDiv"
          ></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i
            ><i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
    <div class="loginBox">
      <h2 class="loginH2"><strong>Vue</strong> 后台管理系统</h2>
      <div class="loginCon">
        <div class="titleDiv">
          <p></p>
          <h3>输入用户名和密码登录</h3>
          <i class="el-icon-key"></i>
        </div>
        <el-form
          ref="loginForm"
          :rules="rules"
          :model="ruleForm"
          class="loginFormStyle"
        >
          <el-form-item prop="user">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            @click="loginYz('loginForm')"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SlideVerify from '@/components/SlideVerify'
// import $ from 'jquery'
export default {
  data() {
    return {
      notifyObj: null,
      text: '向右滑动',
      showSlide: false,
      userData: '',
      islogin: '',
      logindata: {
        success: true,
        msg: '登陆成功',
        token: 'admin-token',
        user: 'admin'
      },
      ruleForm: {
        user: 'admin',
        password: '123456'
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // this.shopTip()
  },
  methods: {
    onSuccess() {
      this.showSlide = false
      this._login()
    },
    onFail() {
      this.$message.error('验证失败')
    },
    refresh() {
      this.$refs.slideDiv.reset()
    },
    loginYz(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.showSlide = true
        } else {
          return
        }
      })
    },
    _login() {
      // $.ajax({
      //   type: 'POST',
      //   url: 'http://127.0.0.1:3000/login',
      //   data: {},
      //   dataType: 'json',
      //   async: false,
      //   success: data => {
      //     this.userData = data
      //     console.log(this, this.userData, data, 'data')
      //   },
      //   error: function(data, textStatus, errorThrown) {
      //     console.log(data, textStatus, errorThrown, 'error,data')
      //   }
      // })
      // this.userData.forEach(item => {
      //   if (
      //     item.user === this.ruleForm.user &&
      //     item.password === this.ruleForm.password
      //   ) {
      //     console.log('true')
      //     this.islogin = true
      //   }
      // })
      // const aa = this.userData.indexOf(this.ruleForm)
      console.log(this, 'this')

      this.$store
        .dispatch('user/_login', this.ruleForm)
        .then(res => {
          if (!res.data.success) {
            this.refresh()
          } else {
            console.log(res.data, this.userData, this.logindata, 'login000')

            this.$router.push(this.$route.query.redirect)
            if (this.notifyObj) {
              this.notifyObj.close()
            }
            this.notifyObj = null
          }
        })
        .catch(error => {
          this.refresh()
          this.$message.error(error)
        })
    },
    shopTip() {
      this.notifyObj = this.$notify({
        title: '提示',
        message:
          '目前有两个登陆角色，管理员和普通用户，账号分别为：admin、user,密码都为：123456',
        duration: 0,
        iconClass: 'el-icon-s-opportunity'
      })
    }
  },
  components: {
    SlideVerify
  }
}
</script>
<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background: url(../../assets/pageBg/loginBg.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}
.loginBox {
  height: 455px;
  width: 550px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -287px;
}
.loginH2 {
  font-size: 38px;
  color: #7b969f;
  text-align: center;
}
.loginCon {
  margin-top: 30px;
  background: #eee;
  border-radius: 4px;
  .titleDiv {
    padding: 0 28px;
    background: url(../../assets/pageBg/白色.jpg) no-repeat center center;
    position: relative;
    height: 120px;
    border-radius: 4px 4px 0 0;
    .el-icon-key {
      color: #252621;
    }
    h3 {
      font-size: 22px;
      color: #252621;
      font-weight: initial;
      padding-top: 23px;
    }
    p {
      font-size: 16px;
      color: #252621;
      padding-top: 12px;
    }
    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 29px;
    }
  }
  .el-form {
    padding: 25px 25px 30px 25px;
    background: #fff;
    border-radius: 0 0 4px 4px;
    background: url(../../assets/pageBg/白色.jpg) no-repeat center center;
  }
}
.loginBtn {
  width: 100%;
  background: #fdeeef;
  border-radius: 20px;
  border: 0px;
  color: #999;
}
.slideShadow {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.slideSty {
  position: absolute;
  width: 380px;
  height: 311px;
  background: #e8e8e8;
  border: 1px solid #dcdcdc;
  left: 50%;
  top: 50%;
  margin-left: -188px;
  margin-top: -176px;
  z-index: 99;
  border-radius: 5px;
}
.iconBtn {
  padding: 9px 0 0 19px;
  color: #5f5f5f;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  i:last-child {
    margin-left: 7px;
  }
}
</style>
<style>
.slideSty .slide-verify {
  margin: 13px auto 0 auto;
  width: 350px !important;
}
.slideSty .slide-verify-slider {
  width: 100% !important;
}
.slideSty .slide-verify-refresh-icon {
  display: none;
}
</style>
