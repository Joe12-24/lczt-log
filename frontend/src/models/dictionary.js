// 定义数据字典
export const SOURCE_DICT = new Map([
    ['newMall', '凌志接口'],
    ['newMallTsdk', '综合理财'],
    ['xiaodai', '小贷']
]);
export const STATUS_DICT = new Map([
    ['1', '正常'],
    ['2', '异常']
]);
// 工具函数：根据字典值获取对应的标签
export function getLabelFromDict(dict, key) {
    return dict.get(key) || '未知';
}
