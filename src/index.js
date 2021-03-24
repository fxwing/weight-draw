/* eslint-disable no-var */
// 按权重随机抽奖
var arr = [
    {
        name: '一等奖',
        key: 'level1',
        radio: 1
    },
    {
        name: '二等奖',
        key: 'level2',
        radio: 2
    },
    {
        name: '三等奖',
        key: 'level3',
        radio: 3
    },
    {
        name: '参与',
        key: 'level4',
        radio: 5
    }
];
var Draw = /** @class */ (function () {
    function Draw(data) {
        this.data = data;
    }
    Draw.prototype.getResult = function () {
        var dataList = this.setList(this.data);
        var resetList = this.reset(dataList);
        var random = this.randomFrom(0, this.data.length - 1);
        return resetList[random];
    };
    Draw.prototype.setList = function (data) {
        var dataList = [];
        data.map(function (item) {
            dataList.push({
                name: item.name,
                value: item.key
            });
            for (var i = 0; i < item.radio; i++) {
                dataList.push({
                    name: item.name,
                    value: item.key
                });
            }
        });
        return dataList;
    };
    Draw.prototype.reset = function (arr) {
        var eachArr = arr.concat([]);
        var lastArr = [];
        var _this = this;
        function deepEach(deepArr) {
            if (deepArr.length) {
                var randomIndex = _this.randomFrom(0, eachArr.length - 1);
                lastArr.push(eachArr[randomIndex]);
                eachArr.splice(randomIndex, 1);
                deepEach(eachArr);
            }
        }
        deepEach(eachArr);
        return lastArr;
    };
    Draw.prototype.randomFrom = function (lowerValue, upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    };
    return Draw;
})();
var draw = new Draw(arr);
console.log(draw.getResult());
