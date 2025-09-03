import app from './app';
import { appConfig } from './configs/app-config';

app.listen(appConfig.port, () => {
  console.log(`app is running on port ${appConfig.port}.`);
});
