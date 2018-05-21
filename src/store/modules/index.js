import camelCase from 'lodash/camelCase';

const requireModule = require.context('.', false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  // Don't register this file as a Vuex module
  if (fileName === './index.js') return;

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  const module = requireModule(fileName);

  modules[moduleName] = {
    // namespaced: true,
    ...module.__esModule ? module.default : module, // eslint-disable-line
  };
});

export default modules;
