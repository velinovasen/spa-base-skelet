const regex = {
    imageUrl: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
}

// sorting object of objects
function sortFunction(data, attr) {
    var arr = [];
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            var obj = {};
            obj[prop] = data[prop];
            obj.tempSortName = data[prop][attr];
            arr.push(obj);
        }
    }

    arr.sort(function(a, b) {
        var at = a.tempSortName,
            bt = b.tempSortName;
        return at < bt ? 1 : ( at > bt ? -1 : 0 );
    });

    var result = [];
    for (var i=0, l=arr.length; i<l; i++) {
        var obj = arr[i];
        delete obj.tempSortName;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var id = prop;
            }
        }
        var item = obj[id];
        result.push(item);
    }
    return result;
}

// correct input form checker

function correctInputChecker(name, price, image, description, brand){

    let isOk = true;

    if (!/[A-z]+$/.test(name)) {
        isOk = false;
        return isOk;
    }
    if (!/(^\d+\.\d+$|^\d+$)/.test(price)) {
        isOk = false;
        return isOk;
    }
    if (!regex.imageUrl.test(image)) {
        isOk = false;
        return isOk;
    }
    if (!/.+/.test(description)) {
        isOk = false;
        return isOk;
    }
    if (!/([A-z0-9])\w+/.test(brand)) {
        isOk = false;
        return isOk;
    }
    return isOk;

}