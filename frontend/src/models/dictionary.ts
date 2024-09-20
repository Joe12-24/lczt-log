// 定义数据字典

export const SOURCE_DICT = new Map<string, string>([
  ['sit', 'sit'],
  ['uat', 'uat'],
  ['200', '200']
]);

export const STATUS_DICT = new Map<number, string>([
  [1, '正常'],
  [2, '异常']
]);
export const STATE_DICT = new Map<boolean, string>([
  [true, '正常'],
  [false, '异常']
]);

// 工具函数：根据字典值获取对应的标签
export function getLabelFromDict(dict: Map<string, string>, key: string): string {
  return dict.get(key) || '未知';
}
