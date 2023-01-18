import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { connect } from '@rxjs-insights/devtools/connect';

import { AppModule } from './app/app.module';

connect();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
