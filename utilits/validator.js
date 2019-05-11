const validator = (config, data) => {

    for(let key in config) {
        if(!(data[key] && config[key] >= data[key].length)) {
            return {
                validation: false,
                failed: key
            }
        } 
    }

    return {
        validation: true
    };

};

module.exports = validator;