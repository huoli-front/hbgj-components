<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="(menu,index) in list" :key="index">
        <router-link :to="title + '/' +menu.title.slug">{{ menu.title.text }}</router-link>
      </li>
    </ul>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import PropTypes from '../utils/vue-types';

export default {
  name: 'menu-view',
  props: {
    type: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.array
  },
  mounted () {
  }

};
</script>

<style scoped>

</style>
