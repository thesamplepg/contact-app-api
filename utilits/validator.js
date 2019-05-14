const validator = (config, data) => {
  for (let key in config) {
    if (!data[key]) {
      return {
        validation: false,
        error: `You forget ${key} field`
      };
    } else if (data[key].length < config[key]) {
      return {
        validation: false,
        error: `${key} must be more than ${config[key]}`
      };
    }
  }

  return {
    validation: true
  };
};

module.exports = validator;
