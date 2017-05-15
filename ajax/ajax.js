    // 判断是不是对象
    let isObject = (data) => {
            return Object.prototype.toString.call(data) === "[object Object]";
        }
        // 判断是不是数组
    let isArray = (data) => {
            return data instanceof Array;
        }
        // 判断是不是undefined
    let isUndefined = (data) => {
        return typeof data === 'undefined';
    }

    // 生成请求参数的递归
    let cParam = (data, parentKey = '') => {
        let arr = [];
        for (let key in data) {
            // 缓存父级键值
            let keyTemp = parentKey;
            // 获取值
            let value = data[key];
            // 对象处理方式
            if (isObject(value) || isArray(value)) {
                if (parentKey) {
                    keyTemp += '[' + key + ']';
                } else {
                    keyTemp = key;
                }
                [].push.apply(arr, cParam(value, keyTemp));
                // 数值处理方式
            } else if (typeof value !== 'object' && !isUndefined(value)) {
                arr.push((parentKey ? parentKey + '[' + key + ']' : key) + '=' + value);
            }
        }
        return arr;
    }

    // 创建参数
    let createParam = (data) => {
        if (isObject(data)) {
            // uri编码
            return encodeURI(cParam(data).join('&'));
        } else {
            throw new Error('参数变量必须是个对象！');
        }

    }

    // 封装ajax
    export let ajax = (data) => {
        let xhr = new XMLHttpRequest();
        // 是不是post请求
        let isPort = data.type == 'post' ? true : false;
        // 生成参数
        let param = createParam(data.data || {});
        // 异步
        data.async = data.async || true;
        // 请求类型
        data.type = data.type || 'get';

        xhr.open(data.type, data.url + (!isPort ? ('?' + param) : ''), data.async);
        // 监听请求状态
        xhr.onreadystatechange = function() {
            // 成功
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = xhr.responseText;
                try {
                    result = JSON.parse(result);
                } catch (e) {}
                data.success && data.success(result);
            } else { // 失败
                data.error && data.error(xhr.statusText);
            }
        }

        // 设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        for (let key in data.header) {
            xhr.setRequestHeader(key, value);
        }
        // 发送请求
        isPort ? xhr.send(param) : xhr.send(null);
    }


    // 测试
    let obj = {
        name: 'baidu',
        data: [{
            name: '123',
            data: 123,
        }],
        arr: [1, 2, 3, 4]
    };
    ajax({
        url: 'http://localhost/index.php',
        type: 'get',
        data: obj,
        success: (res) => {
            console.log(res)
        }
    });