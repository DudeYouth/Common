//异步链式
function cb(callback) {
    var callbackList = [];

    function tcb() {
        var method = callbackList.shift();
        var timer = null;
        if (method) {
            method.apply(null, arguments);
        } else {
            timer = setTimeout(function() {
                method = callbackList.shift();
                if (method) {
                    method.apply(null, arguments);
                } else {
                    console.warn("回调不存在！");
                }
                clearTimeout(timer);
                timer = null;
            }, 0)
        }

    }
    callback(tcb);
    return {
        then: function(callback) {
            callbackList.push(function() {
                callback(tcb);
            });
            return this;
        },
    }
}

function packing(obj, callback) {
    var newObj = {};
    for (var key in obj) {
        if (typeof obj[key] == "function") {
            newObj[key] = function() {

            }
        }
    }
}
//判断是否是对象
function isObject(obj) {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
        return true;
    } else {
        return false;
    }
}
cb(function(method) {
    console.log(1);
    method();
}).then(function(method) {
    console.log(2);
    method();
}).then(function() {
    setTimeout(function() {
        console.log(3);
    }, 300)
})