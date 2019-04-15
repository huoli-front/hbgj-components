<template>
  <div class="layout">
    <Layout>
      <HomeHeader></HomeHeader>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu ref="menu" :active-name="current.doc" :open-names="[current.category]" theme="light" width="auto">
            <Submenu :name="current.category" v-if="current.menuData">
              <template slot="title">
                <Icon type="md-construct" />
                {{ current.category }}
              </template>
              <MenuGroup title="API">
                <MenuItem
                  :key="current.category + '-api' + index"
                  v-for="(api, index) in current.menuData.api"
                  :to="`/${current.category}/api/${api.title.slug}`"
                  :name="api.title.slug"
                  v-text="api.title.text"
                ></MenuItem>
              </MenuGroup>
              <MenuGroup title="GUIDES">
                <MenuItem
                  :key="current.category + '-guide' + index"
                  v-for="(guide, index) in current.menuData.guides"
                  :to="`/${current.category}/guides/${guide.title.slug}`"
                  :name="guide.title.slug"
                  v-text="guide.title.text"
                ></MenuItem>
              </MenuGroup>
            </Submenu>

          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{minHeight: '280px', background: '#fff', margin: '24px 0'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import uiData from '../../docs/ui';
import toolsData from '../../docs/tools';
import coreData from '../../docs/core';
import HomeHeader from '../header/HomeHeader';

export default {
  name: 'menu-component',
  data () {
    return {
      uiData,
      toolsData,
      coreData,
      current: {
        category: null,
        type: null,
        doc: null,
        menuData: []
      }
    };
  },
  components: {
    HomeHeader
  },
  created () {
    this.setCurrent(this.$route);
  },
  beforeRouteUpdate (to, from, next) {
    this.setCurrent(to);
    next();
  },

  methods: {
    setCurrent (to) {
      const { category, doc } = to.params;
      const { type } = to.meta;
      this.current = {
        category,
        type,
        doc
      };
      switch (category) {
        case 'tools':
          this.current.menuData = this.toolsData;
          break;
        case 'ui':
          this.current.menuData = this.uiData;
          break;
        case 'core':
          this.current.menuData = this.coreData;
          break;
        default:
      }

      this.$nextTick(() => {
        const menu = this.$refs['menu'];
        menu.updateOpened();
        menu.updateActiveName();
      });
    },
    goPageWithParams (name, params) {
      console.log(111);
      this.$router.push({
        name,
        params
      });
    }

  }

};
</script>

<style scoped lang="less">

</style>
