import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// Require in a base component context, include subdirectories = true
const requireComponent = require.context('.', true, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/(index)?\.\w+$/, '')));

  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig);
});
