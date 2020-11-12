function serialToJson(form) {
    let f = form.serializeArray();
    let result = {};
    f.forEach(item => {
        for (let prop in item) {
            result[item.name] = item.value;
        }
    });
    return result;
}