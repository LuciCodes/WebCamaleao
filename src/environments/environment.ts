// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useTestData: true,
  webApiHost: 'http://localhost:4200',
  firebase: {
    apiKey: "AIzaSyDc9oQYSt2Gt6Fpj3iD32NIFPGKehNySTE",
    authDomain: "camaleao-b6f8f.firebaseapp.com",
    databaseURL: "https://camaleao-b6f8f.firebaseio.com",
    projectId: "camaleao-b6f8f",
    storageBucket: "camaleao-b6f8f.appspot.com",
    messagingSenderId: "716818224001",
    appId: "1:716818224001:web:030472f2060ce165008e80",
    measurementId: "G-3PBD6XVSPW"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
