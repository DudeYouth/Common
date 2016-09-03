var arr = [{
    id: 1,
    name: "011",
    pid: 0,
}, {
    id: 2,
    name: "012",
    pid: 0,
}, {
    id: 3,
    name: "013",
    pid: 2,
}, {
    id: 4,
    name: "014",
    pid: 3,
}, {
    id: 5,
    name: "015",
    pid: 2,
}, {
    id: 6,
    name: "016",
    pid: 1,
}]

function combianation(arr, id) {
    var newArr = [];
    var i = 0;
    var cache = null;
    id = id || 0;
    while (i < arr.length) {
        if (arr[i].pid == id) {
            cache = arr[i];
            newArr.push(cache);
            arr.splice(i, 1);
            cache.child = combianation(arr, cache.id);
        } else {
            i++;
            continue;
        }
    }
    return newArr;
}
console.log(combianation(arr));