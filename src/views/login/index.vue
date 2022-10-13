<template>
  <div class="login-page">
    <el-tooltip class="svg-github" effect="dark" content="Connect Me" placement="bottom">
      <a href="https://github.com/FLAMEZOMBIE"><icon name="github" :scale="2.5"></icon></a>
    </el-tooltip>
    <img src="../../assets/images/mimsicon.png" style="width: 25vw; position: absolute; left: -100px; top: 50px; transform: rotate(30deg); opacity: 0.3;">
    <div class="login-wrap" style=" border-radius: 20px; box-shadow: -8px -8px 8px #FFFFFF, 8px 8px 8px rgba(0, 0, 0, 0.05);">
      <el-col :class="translateLeft" :span="Autocomplete">

        <div v-if="notforget">
          <div class="logo">
            <img class="logomims" src="../../assets/images/logomims.png" style="width: 150px; height: 40px; margin-top: 40px;">
            <p style="margin-top: 30px; color: gray; font-size: 13px;">Management Integration Material System</p>
          </div>
        
          <div class="login-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="username" style="margin-top: 30px;">
                <el-input :placeholder="$t('login.userplaceholder')" v-model="ruleForm.username" style="border-radius: 10px;"></el-input>
              </el-form-item>
              <el-form-item prop="password" style="margin-top: 30px;">
                <el-input :placeholder="$t('login.pwdplaceholder')" type="password" v-model="ruleForm.password" style="border-radius: 10px;"></el-input>
              </el-form-item>
              <el-col class="forgetpwd" style="font-size: 13px; margin-left: 70%; color: gray;">
                <span @click="wrapSwitch(false)">{{$t('login.forgetpwd')}}</span>
              </el-col>
              <el-form-item class="btn" style="margin-top: 30%;">
                <el-button :loading="loading" @click="handleLogin('ruleForm')" style="background: linear-gradient(91.08deg, #2F6FED 0.33%, #00A3FF 101.56%); color: white;">{{$t('login.btn')}}</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="login-footer">
            <!-- <el-col :span="12">
              <el-checkbox v-model="remember">{{$t('login.remember')}}</el-checkbox>
            </el-col> -->
            <!-- <el-col class="forgetpwd" :span="12">
              <span @click="wrapSwitch(false)">{{$t('login.forgetpwd')}}</span>
            </el-col> -->
          </div>
        </div>

        <div v-else>
          <div class="title forgetwrap-title">
            <a>
              <span>MIMs</span>
            </a>
          </div>
          <div class="forget-form">
            <el-form :model="forgetForm" ref="forgetRuleForm">
              <el-form-item>
                <el-input :placeholder="$t('login.forget_email')" v-model="forgetForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('login.forget_code')" v-model="forgetForm.code"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('login.forget_passwrd')" type="password" v-model="forgetForm.newPassword"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('login.confirm_passwrd')" type="password" v-model="forgetForm.confirmPassword"></el-input>
              </el-form-item>
              <el-form-item class="btn">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button @click="wrapSwitch(true)" >{{$t('login.forget_back')}}</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button @click="forgetHandle">{{$t('login.forget_btn')}}</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </div>

      </el-col>

      <!-- <el-col :class="translateRight" :span="14">
        <div class="wallpaper"></div>
      </el-col> -->
    </div>
  </div>
</template>

<script>
import langselect from '@/components/langselect'
import storage from '@/utils/storage'
import { Autocomplete } from 'element-ui'

const useRegexp = {
  exist: /\S+/
}

export default {
  name: 'login',
  components: {
    langselect
  },
  mounted() {
    this.$notify({
      title: 'Login Tips',
      message: 'Name is admin Enter the password freely',
      position: 'top-left',
      duration: 0
    })
  },
  data() {
    const validobj = {
      username: [
        { ruleName: 'exist', error: this.$t('login.valid.userexist') }
      ],
      password: [{ ruleName: 'exist', error: this.$t('login.valid.pwdexist') }]
    }

    const _typeof = val =>
      Object.prototype.toString
        .call(val)
        .replace(/^\S+\s/, '')
        .replace(/]$/, '')
        .toLocaleLowerCase()

    const validfn = (rule, value, callback) => {
      const _validobj = validobj[rule.field.replace(/^\S+(?=\.)\./g, '')]
      for (let i = 0; i < _validobj.length; i++) {
        let _rule = useRegexp[_validobj[i].ruleName]
        if (_typeof(_rule) === 'regexp') {
          if (!_rule.test(value)) {
            return callback(new Error(_validobj[i].error))
          }
        } else if (_typeof(_rule) === 'function') {
          if (_rule(value, _validobj[i].params)) {
            return callback(new Error(_validobj[i].error))
          }
        }
      }
      callback()
    }

    return {
      lang: this.$store.state.app.language,
      ruleForm: {
        username: storage.get('loginUser') || 'admin',
        password: ''
      },
      rules: {
        username: [{ validator: validfn, trigger: 'blur', required: true }],
        password: [{ validator: validfn, trigger: 'blur', required: true }]
      },
      remember: true,
      loading: false,
      switchLeft: false,
      switchRight: false,
      notforget: true,
      forgetForm: {
        email: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    translateLeft() {
      return {
        'translate-left': true,
        'login-col': true,
        'switch-left': this.switchLeft
      }
    },
    translateRight() {
      return {
        'translate-right': true,
        'login-col': true,
        'switch-right': this.switchLeft
      }
    }
  },
  methods: {
    wrapSwitch(state) {
      this.switchLeft = !this.switchLeft
      this.switchRight = !this.switchRight
      setTimeout(() => {
        this.notforget = state
        this.$refs['ruleForm'].resetFields()
        // this.$refs['forgetRuleForm'].resetFields()
      }, 300)
    },
    handleLogin(formName) {
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let { username, password } = this.ruleForm
            this.remember
              ? storage.set('loginUser', username)
              : storage.remove('loginUser', username)
            const response = await this.$store.dispatch('loginbyUser', {
              username: username.trim(),
              password: password
            })
            this.loading = false
            if (response.data) {
              this.$notify.closeAll()
              this.$router.push({ path: '/' })
            } else {
              this.$message({
                message: response.message,
                type: 'error',
                duration: 10000,
                showClose: true
              })
            }
          } catch (error) {
            throw new Error(error)
          }
        } else {
          this.loading = false
          this.$message.error(this.$t('login.validfaild'))
        }
      })
    },
    forgetHandle() {
      this.$message.success(this.$t('login.pwdChanged'))
      this.wrapSwitch(true)
    }
  }
}
</script>

<style lang="stylus">
.forget-form,
.login-form
  .el-form-item__content
    line-height 40px
  .el-input__inner
    padding-top: 2px;
    height 40px
    line-height 40px

.btn button
    width: 100%
    padding 12px 20px
</style>

<style lang="stylus" scoped>
@import "../../assets/styl/variables.styl"

.login-col
  height 100%

.login-page
  display flex
  justify-content center
  align-items center
  position absolute
  height 100%
  width 100%
  .lang
    position absolute
    right 59px
    top 24px
  .svg-github
    position absolute
    right 29px
    top 25px
  .translate-left
  .translate-right
    will-change auto
    transform translateX(0px)
    transition transform .6s ease-in-out
  .switch-left
    transform translateX(525px)
  .switch-right
    transform translateX(-375px)
  
.login-wrap
  overflow hidden
  width 400px
  height 550px
  background #F8F9FA
  border-radius 4px
  transform translateY(-10px)
  box-shadow 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04)

  .logo
    padding-top 26px
    text-align center

  .title
    font-weight bold
    color main-color
    padding-top 8px
    font-size 22px

    a
      cursor cell
    a:before
      content '['
      opacity 0
      margin-right 10px
      transform translateX(-10px)
      transition transform .2s, opacity .2s

    a:after
      content ']'
      opacity 0
      margin-left 10px
      transform translateX(10px)
      transition transform .2s, opacity .2s

    a:hover:before
    a:hover:after
      opacity 1
      transform translateX(0)

    .subtitle
      color sub-color

  .forgetwrap-title
    padding-top 30px
    padding-left 15px

  .forget-form
    padding 20px 30px 30px
    padding-bottom 0

  .login-form
    padding 30px
    padding-bottom 0

  .login-footer
    padding 0 30px 
    .forgetpwd
      text-align right 
      span
        cursor pointer
        font-size 14px
        font-weight 500
        color #606266

  .wallpaper
    width 100%
    height 100%
    background url('../../assets/images/loginwallpaper.jpg')
    background-size cover
    position relative
</style>
