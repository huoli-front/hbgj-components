<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
// import ui from '../../docs/ui';
// import tools from '../../docs/tools';
// import core from '../../docs/core';
import Menu from '../menu';
export default {
  name: 'index',
  components: {
    Menu
  },
  data () {
    return {
      type: '',
      envData: {
        ui: {},
        tools: {},
        validate: {}
      }
    };
  },
  computed: {
    menuList () {
      return this.envData[this.type] || null;
    }
  },
  created () {
    console.log(1);
  },
  beforeRouteUpdate (to, from, next) {
    this.type = to.params.type;
    this.getEnvData();
    next();
  },
  mounted () {
    this.type = this.$route.params.type;
    this.getEnvData();
  },

  methods: {
    getEnvData () {
      const { type } = this;
      if (['ui', 'tools', 'validate'].includes(this.type)) {
        const bundle = import(`../../docs/${this.type}`);
        bundle.then((myModule) => {
          myModule.default((data) => {
            console.log(data.default);
            this.envData[this.type] = data.default;
            const a = data.default.api.map((item, i) => {
              const title = {
                title: item.title.slug,
                text: item.title.text
              };
              const headers = item.headers.map((header, i) => {
                return {
                  type: 'header',
                  path: `/${type}/${item.title.slug}/${header.slug}`,
                  text: header.text
                };
              });
              return {
                title,
                headers
              };
            });

            console.log(a);
          });
        });
      }
    },
    changeTypeView (type) {
      this.$router.replace({
        name: 'type-route',
        params: {
          type: type
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
  @import "../../style.less";
  .left-panel {
    width: 250PX;
    height: 100vh;
    font-size: 13PX;
    position: fixed;
    left: 0;
    top: 0;
    background: @leftMenuBg;
    .type-menu {
      width: 250PX;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px;
      display: flex;
      flex-direction: row;
      margin: 0px;
      padding: 0;
      .type-menu {
        display: block;
        font-size: 90%;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        background: white;
        flex: 1 1 0%;
        padding: 5px;
        color: #000;
        text-decoration: none;
        &.active {
          color: #fff;
          background: rgb(233, 73, 73);
        }
      }
      a:nth-child(1) {
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
      }
      a:nth-child(2) {

      }
      a:nth-child(3) {

      }
    }
    .menu-title {
      color: rgb(82, 82, 82);
      display: block;
      font-weight: bold;
      margin-top: 20px;
      text-transform: uppercase;
    }
  }
</style>
