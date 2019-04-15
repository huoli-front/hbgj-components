<template>
  <div>
    <div ref="guideInfo" class="markdown" v-html="guidesInfo.markup"></div>
  </div>
</template>

<script>
import uiData from '../../docs/ui';
import toolsData from '../../docs/tools';
import coreData from '../../docs/core';

export default {
  name: 'guide',
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
    this.moveScroll();
  },

  beforeRouteUpdate (to, from, next) {
    this.fetch(to);
    this.moveScroll();
    next();
  },
  methods: {
    fetch (route) {
      const { category, doc } = route.params;
      const guides = this[category]['guides'];
      const guidesInfo = guides.filter((item) => {
        return item.title.slug === doc;
      })[0];
      if (!guidesInfo) {
        this.$router.replace(`/${category}/guides/${guides[0].title.slug}`);
      } else {
        this.guidesInfo = guidesInfo;
      }
    },
    moveScroll () {
      this.$nextTick(() => {
        const { doc, pos } = this.$route.params;
        const hash = pos ? `${doc}-${pos}` : doc;
        const cur = this.$el.querySelector(`#${hash}`);
        console.log(cur.offsetTop);
        document.documentElement.scroll(0, cur.offsetTop);
      });
    }
  }

};
</script>

<style lang="less">

</style>
