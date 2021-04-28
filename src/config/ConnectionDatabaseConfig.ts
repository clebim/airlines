// eslint-disable-next-line import/no-mutable-exports
let connection = '';

if (process.env.NODE_ENV === 'test') {
  connection = 'test';
} else if (process.env.NODE_ENV === 'production') {
  connection = 'production';
} else {
  connection = 'default';
}

export default connection;
