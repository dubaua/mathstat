<template lang="pug">
  #app
    table
      template(v-for="(group, index) in groups")
        tr.group
          td
            input(
              v-model="group.name",
              @focus="$event.target.select()",
              @paste="handlePaste").group__name
          td
            input(
              v-model.number="group.count",
              @focus="$event.target.select()",
              @paste="handlePaste").group__count
          td
            button(
              @click="removeGroup(index)",
              @focus="$event.target.select()").group__remove Удалить группу
    //- product
</template>

<script>
// import Product from '@/components/product';
/* eslint-disable no-console */
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
  methods: {
    handlePaste(e) {
      // Prevent the default pasting event and stop bubbling
      e.preventDefault();
      e.stopPropagation();

      // Get the clipboard data
      const paste = (e.clipboardData || window.clipboardData).getData('text');

      const rows = paste.replace(/\n$/, '').split('\n');
      // eslint-disable-next-line no-plusplus
      for (let row = 0; row < rows.length; row++) {
        console.log(rows[row].split('\t'));
      }
    },
    removeGroup(index) {
      console.log(index);
    },
  },
};
</script>

<style lang="scss"></style>
