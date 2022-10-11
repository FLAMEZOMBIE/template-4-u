<template>
  <div class="profile-container">
    <el-row class="header">
      <el-col :sm="24" :lg="12" class="header-left">
        <div class="header-avatar">
          <img :src="avatarUrl" />
        </div>
        <div class="header-content">
          <div class="title">
            Hello! {{username}}，Welcome on MIMs
          </div>
          <div class="sub">
            Position: Front-end Engineer (ICON+)
          </div>
          <div class="sub">
            Login：{{lastLoginDate}}
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :lg="12"></el-col>
    </el-row>

    <el-row class="profile-content" :gutter="20">
      <el-col :sm="24" :lg="18" class="profile-content__left">
        <el-alert
          title="Tip: HEAVENS LOST PROPERTY"
          type="success">
        </el-alert>
        <el-alert
          title="Alert!：HEAVENS LOST PROPERTY"
          type="warning">
        </el-alert>
        <el-card shadow="hover">
          <div slot="header">
            <span class="card-title">Everyone is dynamic</span>
          </div>
          <div class="feed" v-for="(item, index) in feedmock" :key="index">
            <div class="line">
              <div>{{item.content}}</div>
              <div class="time">{{item.time}}</div>
              <el-button class="details" type="primary" size="mini" plain>Detail</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="6" class="profile-content__right">
        <el-input
          size="medium"
          placeholder="Search something?"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>

        <el-card shadow="hover">
          <div slot="header">
            <span class="card-title">Information module</span>
          </div>
          <div>
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
          </div>
        </el-card>

        <el-card shadow="hover">
          <div slot="header">
            <span class="card-title">Information module</span>
          </div>
          <div>
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
            Lorem ipsum dolor sit amet consiquest dio.
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'

const feedmock = [
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: '666'
  },
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: '666'
  },
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: '666'
  },
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: '666'
  },
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: 'FLAMEZOMBIE'
  },
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: '666'
  },
  {
    content: 'lorem impsum dolor sit amet meta alpah beta tetta gamma hexa',
    time: '666'
  }
]

const visitHistoryMock = [
  'Permission control',
  'Start with pages',
  'Use the file for controlling the horse',
  'But a person wants his inner thoughts',
  'The table chapter is particularly displayed',
  'And display with a ribbon',
  'Review the verification list',
  'Help to change the heart of Indonesia',
  'We must praise and correct it'
]

export default {
  name: 'profile',
  data() {
    return {
      search: '',
      feedmock,
      visitHistoryMock,
      avatarUrl: this.$store.state.user.avatar,
      username: this.$store.state.user.name,
      lastLoginDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/variables.styl'

title-color = #464646
title-sub = #8c8c8c

.profile-container
  .el-card
    font-size 14px

  @extend .edenfont-content
  width 100%
  .header
    padding 15px
    margin -15px
    box-sizing unset
    background white
    height 130px
    &-left
      height 100%
      display flex
      box-sizing border-box
      align-items center
    &-avatar
      margin-left 20px
      display inline-block
      vertical-align middle
      width 100px
      img 
        border-radius 50%
        width 100%
    &-content
      flex 1
      margin-left 20px
      height 85px
      display inline-block
      vertical-align middle
      .title
        font-size 18px
        font-weight bold
        color title-color
        span
          cursor pointer
          color main-color
          &:hover
            text-decoration-line underline
      .sub
        margin-top 20px
        color title-sub
        font-size 14px
      .sub:last-child
        margin-top 10px

  .profile-content
    margin-top 30px
    &__left
      margin-bottom 20px
      .el-alert
        margin-bottom 20px
      .feed
        height 63px
        border-bottom 1px solid #e0e0e0
        .line
          position relative
        .time
          color #a7a7a7
          font-size 14px
          margin-top 10px
        .details
          position absolute
          right 0
          top 0
      .feed:not(:first-child)
        margin-top 25px
      .feed:last-child
        border-bottom 0px

    &__right
      .el-card:not(:first-child)
        margin-top 20px
    .card-title
      color #585858
</style>
