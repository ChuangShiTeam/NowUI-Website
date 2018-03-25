<style src="./index.css" scoped></style>
<template src="./index.html"></template>

<script>
  import bImg from 'bootstrap-vue/es/components/image/img';

  import mixins from '../mixins/index';

  export default {
    components: {
      bImg
    },
    mixins: [mixins],
    data () {
      return {
        logo: require('../assets/img/logo.png'),
        btn01: require('../assets/img/btn01.png'),
        btn02: require('../assets/img/btn02.png'),
        btn03: require('../assets/img/btn03.png'),
        btn04: require('../assets/img/btn04.png'),
        btn05: require('../assets/img/btn05.png'),
        btn06: require('../assets/img/btn06.png')
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {}
  }
</script>
