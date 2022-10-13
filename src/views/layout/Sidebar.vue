<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      class="sidebar-menu"
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="bg"
      :text-color="tc"
      :active-text-color="atc">
      <img src="../../assets/images/mimswhitetext.png" style="width: 10vw; margin-top: 13%; margin-bottom: 10% ; ">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  data() {
    return {
      // bg: '#556d84',
      tc: '#fff',
      atc: 'rgb(0, 130, 200)'
    }
  },
  components: {
    sidebarItem
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routers']),
    isCollapse() {
      if (this.sidebar.sliderState === 'full') {
        return false
      }
      return true
    }
  }
}
</script>

<style>
.sidebar-menu{
  background: linear-gradient(92.49deg, #2F6FED 1.83%, #00A3FF 103.31%);
}
</style>
