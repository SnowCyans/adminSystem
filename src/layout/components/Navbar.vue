<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div
        style="float: left; height: 100%; line-height: 60px; margin-right: 20px"
      >
        <ThemePicker
          style="vertical-align: bottom; height: 45px; margin-right: 15px"
        ></ThemePicker>
        <Fullscreen></Fullscreen>
        <el-dropdown trigger="click" @command="handleCommand">
          <span>
            <svg-icon
              icon-class="language"
              style="color: #fff; font-size: 20px"
            ></svg-icon>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">en</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            v-imgerror
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 主页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import Cookies from 'js-cookie'
import i18n from '@/lang'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleCommand (command) {
      console.log(command)
      i18n.locale = command
      Cookies.set('locale', command)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: white;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: white;
        }
      }
    }
  }
}
.navbar {
  // background: -webkit-linear-gradient(pink, skyblue);
  // background-color: #cbcfda;
  background: url("~@/./assets/common/kf.jpg") no-repeat 0 100%;
  background-size: cover;
  background-position: center;
}
::v-deep .app-breadcrumb.el-breadcrumb .no-redirect {
  color: #fff;
}
.user-avatar {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  vertical-align: middle;
}
.name {
  color: #fff;
  vertical-align: middle;
  margin-left: 5px;
}
.user-dropdown {
  color: #fff;
}
</style>
