<template lang="pug">
  #app
    p
      | Внимание этот критерий служит для сравнения ДВУХ групп между собой,
      | поэтому для его расчета введине в поле ниже названия групп
    table.groups
      tr
        th Название методики
        th Сколько испытуемых в каждой группе
      tr
        td
          input(v-model="group1title", placeholder="Название группы 1").groups__name
        td
          input(
            v-model.number="group1count",
            @input="restrain('group1count', 1, 1, 50)"
            type="number",
            min="1",
            max="100",
            step="1",
            placeholder="Человек в группе 1").groups__count
      tr.group
        td
          input(v-model="group2title", placeholder="Название группы 2").groups__name
        td
          input(
            v-model.number="group2count",
            @input="restrain('group2count', 1, 1, 50)"
            type="number",
            min="1",
            max="100",
            step="1",
            placeholder="Человек в группе 2").groups__count
    p Введите названия шкал методик, участвующих в исследовании (без указания названия методики)
    p(v-for="(scale, index) in metricScales")
      input(v-model="scale.title", :placeholder="'Название '+(index+1)")
      button(@click="removeScale(index)", v-if="index !== 0") Удалить
    p
      input(
        v-model.number="scalesCount",
        @input="restrain('scalesCount', 1, 1, 50)"
        type="number",
        min="1",
        max="50",
        step="1")
      button(@click="addScales(scalesCount)")
        | Добавить {{scalesCount}} {{scalesPlural}}
    p
      button(@click="createTables") Создать таблицы
    template(v-if="matrix1.length || matrix2.length")
      h2 Таблицы
      table
        tr
          th
          th(v-for="(scale, i) in metricScales")
            | {{scale.title || 'Шкала '+(i+1)}}
        tr(v-for="(row, r) in matrix1")
          td
            | {{ group1title || 'Название группы 1'}}
          td(v-for="(col, c) in row")
            input(v-model="col.v", @paste="handlePasteInTable($event, r, c, 'matrix1')")
      table
        tr
          th
          th(v-for="(scale, i) in metricScales")
            | {{scale.title || 'Шкала '+(i+1)}}
        tr(v-for="(row, r) in matrix2")
          td
            | {{ group2title || 'Название группы 1'}}
          td(v-for="(col, c) in row")
            input(v-model="col.v", @paste="handlePasteInTable($event, r, c, 'matrix2')")
</template>

<script>
import { declOfNum, restrainMinMax } from '@/utils';
/* eslint-disable no-console, no-plusplus */
export default {
  name: 'App',
  components: {
    // Product,
  },
  data() {
    return {
      group1title: '',
      group2title: '',
      group1count: 1,
      group2count: 1,
      scalesCount: 1,
      metricScales: [
        {
          title: '',
        },
      ],
      matrix1: [],
      matrix2: [],
    };
  },
  computed: {
    scalesPlural() {
      return declOfNum(this.scalesCount, ['шкалу', 'шкалы', 'шкал']);
    },
  },
  methods: {
    handlePasteInTable(e, r, c, target) {
      // Prevent the default pasting event and stop bubbling
      e.preventDefault();
      e.stopPropagation();

      // Get the clipboard data
      const paste = (e.clipboardData || window.clipboardData).getData('text');

      const part = [];
      const rows = paste.replace(/\n$/, '').split('\n');
      for (let row = 0; row < rows.length; row++) {
        part.push(rows[row].split('\t'));
      }

      // fill intersection
      for (let row = 0; row < this[target].length - r; row++) {
        for (let col = 0; col < this[target][row].length - c; col++) {
          this[target][row + r][col + c].v = part[row][col];
        }
      }
    },
    removeScale(index) {
      this.metricScales.splice(index, 1);
    },
    addScales(count) {
      for (let i = 0; i < count; i++) {
        if (this.metricScales.length < 100) {
          this.metricScales.push({
            title: '',
          });
        }
      }
    },
    restrain(address, valid, min, max) {
      this[address] = restrainMinMax(this[address] || valid, min, max);
    },
    createTables() {
      const cols = this.metricScales.length;
      this.matrix1 = this.createTable(this.group1count, cols);
      this.matrix2 = this.createTable(this.group2count, cols);
    },
    createTable(rows, cols) {
      const table = [];

      for (let r = 0; r < rows; r++) {
        const row = [];

        for (let c = 0; c < cols; c++) {
          row.push({
            v: '',
          });
        }
        table.push(row);
      }
      return table;
    },
  },
};
</script>

<style lang="scss"></style>
