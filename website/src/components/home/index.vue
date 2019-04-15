<template>
  <Layout>
    <HomeHeader></HomeHeader>
    <Content :style="{padding: '50px', minHeight: '500px', background: '#fff'}">
      faddaf
    </Content>
  </Layout>
</template>

<script>
import './home.css';
import HomeHeader from '../header/HomeHeader';
export default {
  name: 'Home',
  components: {
    HomeHeader
  }
};
</script>

<style scoped lang="less">
  /**
    Home
   */
  .benz-result-box .result-list .item .name {
    width: 1.6rem;
  }
  .benz-result-box .result-list .item .content {
    flex: 1;
  }

</style>
