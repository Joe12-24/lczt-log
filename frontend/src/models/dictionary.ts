// 定义数据字典

export const SOURCE_DICT = new Map<string, string>([
  ['newMall', '凌志接口'],
  ['newMallTsdk', '综合理财'],
  ['xiaodai', '小贷']
]);

export const STATUS_DICT = new Map<number, string>([
  [1, '正常'],
  [2, '异常']
]);
export const STATE_DICT = new Map<number, string>([
  [true, '正常'],
  [false, '异常']
]);

// 工具函数：根据字典值获取对应的标签
export function getLabelFromDict(dict: Map<string, string>, key: string): string {
  return dict.get(key) || '未知';
}
