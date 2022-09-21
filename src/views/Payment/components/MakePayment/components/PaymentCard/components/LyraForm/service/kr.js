const accumulatedCallbacks = {};

let accumulator = (name, args) => {
  if (!accumulatedCallbacks.hasOwnProperty(name)) accumulatedCallbacks[name] = [];
  switch (name) {
    case 'setFormConfig':
      if (typeof window.KR_CONFIGURATION === 'undefined') window.KR_CONFIGURATION = {};
      Object.keys(args).forEach((key) => {
        window.KR_CONFIGURATION[key] = args[key];
      });
      break;
    case 'setFormToken':
      break;
    default:
      accumulatedCallbacks[name].push([name, args]);
      break;
  }
};

const accumulatorCallAll = (newAccumulator) => {
  const accKeys = Object.keys(accumulatedCallbacks);
  accKeys.forEach((key) => {
    const items = accumulatedCallbacks[key];
    items.forEach((item) => {
      newAccumulator(...item);
    });
  });
};

const globalConfiguration = {};

export default {
  setFormConfig(configuration) {
    accumulator('setFormConfig', configuration);
  },
  setFormToken(token) {
    accumulator('setFormToken', token);
  },
  triggerReady() {
    accumulator = (name, args) => window.KR[name](args);

    // Call previous calls and close the accumulator
    accumulatorCallAll(accumulator);
  },
  reportGlobalConfiguration(conf) {
    Object.keys(conf).forEach((key) => {
      globalConfiguration[key] = conf[key];
    });
  },
  getGlobalConfiguration() {
    return globalConfiguration;
  },
  normalize(from, to, value = '') {
    if (from.toLowerCase() === 'kebabcase') {
      if (to.toLowerCase() === 'pascalcase') {
        return value.replace(/(\-\w)/g, m => m[1].toUpperCase());
      } if (to.toLowerCase() === 'camelcase') {
        const camelValue = value.replace(/(\-\w)/g, m => m[1].toUpperCase());
        return camelValue.charAt(0).toUpperCase() + camelValue.slice(1);
      }
    }

    return value;
  },
};
