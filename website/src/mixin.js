const Mixin = {
  computed: {
  },
  methods: {
    internalLink(href) {
      this.$router.push(href);
    }
  }
};

export default Mixin;
