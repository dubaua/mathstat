<template lang="pug">
  #app
    template(v-for="group in groups")
      group(:group="group")
    //- product
</template>

<script>
// import Product from '@/components/product';

export default {
  name: 'App',
  components: {
    // Product,
  },
  data() {
    return {
      groups: [
        {
          name: 'Группа 1',
          count: 4,
        },
        {
          name: 'Группа 2',
          count: 4,
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss"></style>
