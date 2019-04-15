<template>
  <Header class="header">
    <Menu mode="horizontal" theme="light">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <MenuItem name="1" to="/">
          <Icon type="md-home" />
          主页
        </MenuItem>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-albums" />
            组件
          </template>
          <MenuItem name="2-1" to="/tools/guides">
            工具组件
          </MenuItem>
          <MenuItem name="2-2" to="/ui/guides">
            视图组件
          </MenuItem>
          <MenuItem name="2-3" to="/core/guides">
            功能组件
          </MenuItem>
        </Submenu>
        <MenuItem name="3" target="_blank" to="https://github.com/huoli-front/hbgj-components">
          <Icon type="logo-github" />
          Git Hub
        </MenuItem>
        <MenuItem name="4" target="_blank" to="mailto:83575615@qq.com">
          <Icon type="ios-contacts" />
          联系作者
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
export default {
  name: 'HomeHeader'
};
</script>

<style scoped lang="less">
  .header {
    background: #ffffff;
  }
  .layout-nav{
    float: right;
  }

</style>
