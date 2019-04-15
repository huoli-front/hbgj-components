<template>
  <div class="api-wrapper">
    <div class="markdown" v-html="guidesInfo.markup"></div>
  </div>
</template>

<script>
import uiData from '../../docs/ui';
import toolsData from '../../docs/tools';
import coreData from '../../docs/core';

export default {
  name: 'api',
  data () {
    return {
      tools: toolsData,
      ui: uiData,
      core: coreData,
      guidesInfo: {}
    };
  },
  mounted () {
    this.fetch(this.$route);
  },

  beforeRouteUpdate (to, from, next) {
    this.fetch(to);
    next();
  },
  methods: {
    fetch (route) {
      const { category, doc } = route.params;
      const a = this[category]['api'];
      const guidesInfo = a.filter((item) => {
        return item.title.slug === doc;
      })[0];
      if (!guidesInfo) {
        this.$router.replace(`/${category}/api/${a[0].title.slug}`);
      } else {
        this.guidesInfo = guidesInfo;
      }
    }
  }
};
</script>

<style lang="less">

</style>
