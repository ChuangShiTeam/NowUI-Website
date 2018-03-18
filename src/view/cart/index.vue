<style src="./index.css" scoped></style>
<template src="./index.html"></template>

<script>
  import bImg from 'bootstrap-vue/es/components/image/img';

  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      bImg,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({

    }),
    created() {

    },
    mounted() {

    },
    methods: {}
  }
</script>
