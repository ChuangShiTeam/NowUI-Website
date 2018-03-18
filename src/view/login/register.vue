<style src="./register.css" scoped></style>
<template src="./register.html"></template>

<script>
  import bForm from 'bootstrap-vue/es/components/form/form';
  import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
  import bImg from 'bootstrap-vue/es/components/image/img';

  import mixins from '../../mixins/index';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      bForm,
      bFormGroup,
      bFormInput,
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
