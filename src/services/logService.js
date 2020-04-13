import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: "https://e420be6a9a004442a037a159001c4549@o376762.ingest.sentry.io/5197977",
    release: "vidly-client-app@0.1.0",
  });
}

function log(error) {
  Sentry.captureException(error);
  // console.error(error);
}

export default { init, log };