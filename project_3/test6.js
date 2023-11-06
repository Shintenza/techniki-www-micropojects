function processData(dataArray) {
    let processedData = [];
    if (dataArray && dataArray.length > 0) {
        for (let i = 0; i < dataArray.length; i++) {
            let dataItem = dataArray[i];
            if (dataItem !== null && dataItem !== undefined) {
                let transformedItem = {};
                for (let key in dataItem) {
                    if (dataItem.hasOwnProperty(key)) {
                        let value = dataItem[key];
                        if (typeof value === 'string') {
                            value = value.trim();
                        }
                        transformedItem[key] = value;
                    }
                }
                if (Object.keys(transformedItem).length > 0) {
                    processedData.push(transformedItem);
                }
            }
        }
    }
    return processedData.filter(item => {
        for (let key in item) {
            if (item[key] === '' || item[key] == null) {
                return false;
            }
        }
        return true;
    }).map(item => {
        let newItem = {};
        for (let key in item) {
            newItem[key.toLowerCase()] = item[key];
        }
        return newItem;
    });
}


