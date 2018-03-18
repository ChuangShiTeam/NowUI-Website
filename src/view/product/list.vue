<style src="./list.css" scoped></style>
<template src="./list.html"></template>

<script>
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
  import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
  import bImg from 'bootstrap-vue/es/components/image/img';

  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      bCarousel,
      bListGroup,
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
