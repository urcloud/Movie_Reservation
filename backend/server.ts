import app from './app';
import { appConfig } from './configs/app-config';
import { db } from './dbs';

db.connectToPg()
  .then(() => {
    app.listen(appConfig.port, () => {
      console.log(`app is running on port ${appConfig.port}.`);
    });
  })
  .catch((e) => console.error(e));
