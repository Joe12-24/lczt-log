import { ClickHouseClient, createClient } from '@clickhouse/client'; // 或 '@clickhouse/client-web'
// @ts-ignore
import { reactive } from 'vue';

interface ClickHouseResultSet<T> {
  meta: Meta[];
  data: T[];
  rows: number;
  statistics: Statistics;
}

interface Statistics {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
}

interface Meta {
  name: string;
  type: string;
}

interface Count {
  c: number;
}

interface FormInline {
  user: string;
  region: string;
  date: string;
  source: string;
  status: string;
  clientId: string;
  businessAccount: string;
  cifAccount: string;
  functionId: string;
  serialNo: string;
  callTime: string;
  startDate: string;
  endDate: string;
  parameter: string;
  result: string;
}

// 初始化 ClickHouse 客户端
// @ts-ignore
const initClickHouseClient = async (): Promise<ClickHouseClient> => {
  const client = createClient({
    host: 'http://127.0.0.1:18123', // 替换为你的 ClickHouse 服务器地址
    username: 'default',
    password: 'qwerty',
    database: 'default',
  });

  console.log('ClickHouse ping');
  if (!(await client.ping())) {
    throw new Error('无法连接到 ClickHouse!');
  }
  console.log('ClickHouse pong!');
  return client;
};

// 创建表单数据对象
const formInline = reactive<FormInline>({
  user: '',
  region: '',
  date: '',
  source: '',
  status: '',
  clientId: '',
  businessAccount: '',
  cifAccount: '',
  functionId: '',
  serialNo: '',
  callTime: '',
  startDate: '',
  endDate: '',
  parameter: '',
  result: '',
});

// 处理表单提交
// @ts-ignore
const onSubmit = async () => {
  console.log('提交表单!');
  const client = await initClickHouseClient();

  // 从 formInline 获取表单数据
  const { user, region, date, source, status, clientId, businessAccount, cifAccount, functionId, serialNo, callTime, startDate, endDate, parameter, result } = formInline;

  // 构造 ClickHouse 查询语句
  let query = `SELECT count() AS c FROM your_table WHERE 1=1`; // 替换 your_table 为你的表名

  if (user) query += ` AND user = '${user}'`;
  if (region) query += ` AND region = '${region}'`;
  if (date) query += ` AND date = '${date}'`;
  if (source) query += ` AND source = '${source}'`;
  if (status) query += ` AND status = '${status}'`;
  if (clientId) query += ` AND clientId = '${clientId}'`;
  if (businessAccount) query += ` AND businessAccount = '${businessAccount}'`;
  if (cifAccount) query += ` AND cifAccount = '${cifAccount}'`;
  if (functionId) query += ` AND functionId = '${functionId}'`;
  if (serialNo) query += ` AND serialNo = '${serialNo}'`;
  if (callTime) query += ` AND callTime = '${callTime}'`;
  if (startDate && endDate) query += ` AND date BETWEEN '${startDate}' AND '${endDate}'`;
  if (parameter) query += ` AND parameter = '${parameter}'`;
  if (result) query += ` AND result = '${result}'`;

  // 执行查询
  try {
    const row = await client.query({
      query,
    });

    const jsonRow: ClickHouseResultSet<Count> = await row.json();

    console.log(`找到 ${jsonRow.data[0].c} 条记录!`);
  } catch (error) {
    console.error('查询出错:', error);
  } finally {
    await client.close();
    console.log('👋');
  }
};

// 调用表单提交函数
onSubmit();
