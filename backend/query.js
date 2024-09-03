import clickhouse from "./db";

const query = 'SELECT * FROM test_table LIMIT 10';

clickhouse.query(query, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});
