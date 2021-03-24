// 按权重随机抽奖

interface IItem {
    name: string;
    key?: any;
    radio: number;
}

interface IDraw {
    getResult(): IItem;
    setList(data: Array<IItem>): Partial<IItem>[];
    reset(arr: Array<Partial<IItem>>): Partial<IItem>[];
    randomFrom(lowerValue: number, upperValue: number): number;
}

const arr: Array<IItem> = [
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

class Draw implements IDraw {
    data: Array<IItem>;
    dataList: Partial<IItem>[];
    resetList: Partial<IItem>[];
    constructor(data) {
        this.data = data;
    }

    getResult() {
        const dataList = this.setList(this.data);
        const resetList = this.reset(dataList);
        let random = this.randomFrom(0, this.data.length - 1);
        return resetList[random];
    }

    setList(data) {
        let dataList = [];
        data.map(function (item) {
            dataList.push({
                name: item.name,
                value: item.key
            });
            for (let i = 0; i < item.radio; i++) {
                dataList.push({
                    name: item.name,
                    value: item.key
                });
            }
        });
        return dataList;
    }

    reset(arr) {
        let eachArr = arr.concat([]);
        let lastArr = [];
        let _this = this;
        function deepEach(deepArr) {
            if (deepArr.length) {
                let randomIndex = _this.randomFrom(0, eachArr.length - 1);
                lastArr.push(eachArr[randomIndex]);
                eachArr.splice(randomIndex, 1);
                deepEach(eachArr);
            }
        }
        deepEach(eachArr);
        return lastArr;
    }

    randomFrom(lowerValue, upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }
}

const draw = new Draw(arr);
console.log(draw.getResult());
