// 定义枚举
export enum Source {
  'newMall' = '凌志接口',
  'newMallTsdk' = '综合理财',
  'xiaodai' = '小贷'
}

export enum Status {
  '1' = '正常',
  '2' = '异常'
}

// 工具函数：根据枚举值获取对应的标签
export function getSourceLabel(source: keyof typeof Source): string {
  return Source[source] || '未知';
}

export function getStatusLabel(status: keyof typeof Status): string {
  return Status[status] || '未知';
}
