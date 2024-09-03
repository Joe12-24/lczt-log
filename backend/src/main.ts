import { ClickHouseClient, createClient } from '@clickhouse/client'; // or '@clickhouse/client-web'

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

//Please replace client connection parameters like`host`
//`username`, `passowrd`, `database` as needed.

// @ts-ignore
const initClickHouseClient = async (): Promise<ClickHouseClient> => {
  const client = createClient({
    host: 'http://127.0.0.1:18123',
    username: 'default',
    password: 'qwerty',
    database: 'default',
    // application: `pingpong`,
  });

  console.log('ClickHouse ping');
  if (!(await client.ping())) {
    throw new Error('failed to ping clickhouse!');
  }
  console.log('ClickHouse pong!');
  return client;
};

// @ts-ignore
const main = async () => {
  console.log('Initialising clickhouse client');
  const client = await initClickHouseClient();

  const row = await client.query({
    query: `SELECT count() AS c FROM system.tables WHERE database='system'`,
  });

  const jsonRow: ClickHouseResultSet<Count> = await row.json();

  console.log(`I have found ${jsonRow.data[0].c} system tables!`);

  await client.close();
  console.log(`👋`);
};

main();