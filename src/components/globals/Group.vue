<template lang="pug">
  .group
    .group__col
      input(v-model="group.name").group__name
    .group__col
      input(v-model.number="group.count").group__count
    .group__col
      button().group__remove Удалить группу
</template>

<script>
export default {
  name: 'Group',
  props: {
    group: Object,
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss">
.group {
  display: flex;
}
</style>
