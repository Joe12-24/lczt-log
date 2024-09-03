const ClickHouse = require('node-clickhouse');
import { createClient } from '@clickhouse/client' // or '@clickhouse/client-web'

const client = createClient({
  /* configuration */
  host: '192.168.152.5',
  port: 8123,
  database: 'default',
  username: 'default',
  password: 'qwerty',
})
const resultSet = await client.query({
  query: 'SELECT number FROM system.numbers LIMIT 10',
  format: 'JSONEachRow', // or JSONCompactEachRow, JSONStringsEachRow, etc.
})
for await (const rows of resultSet.stream()) {
  rows.forEach(row => {
    console.log(row.json())
  })
}


// const clickhouse = new ClickHouse({
//   host: '192.168.152.5',
//   port: 8123,
//   database: 'default',
// });
//
// clickhouse.connect();
//
// module.exports = clickhouse;