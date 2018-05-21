<template lang="pug">
  div {{currentProduct}}
</template>

<script>

export default {
  name: 'Product',
  components: {},
  computed: {
    currentProduct() {
      return this.$route.params.productId || 'pizza';
    },
  },
};
</script>
