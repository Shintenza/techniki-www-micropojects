function processData(dataArray) {
    let processedData = [];
    if (!dataArray || dataArray.length == 0) return processedData;

    for (const dataItem of dataArray) {
        if (!dataItem) continue;
        let isAllowedToPush = true;
        let transformedItem = {};

        for (const key of Object.getOwnPropertyNames(dataItem)) {
            let value = dataItem[key];
            if (!value || value === "") {
                isAllowedToPush = false;
                break;
            }
            if (typeof value === "string") {
                value = value.trim();
            }
            transformedItem[key.toLowerCase()] = value;
        }
        if (isAllowedToPush) {
            processedData.push(transformedItem);
        }
    }
    return processedData;
}
