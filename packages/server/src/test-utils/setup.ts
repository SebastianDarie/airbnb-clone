import { createTestConn } from './createTestConn';

createTestConn(true)
  .then(() => process.exit())
  .catch((err) => console.log(err));
