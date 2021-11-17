[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Pure External Organization Merging Tool

A tool for merging duplicated External Organizations in Elsevier Pure using the
new write API.

## Use

Enter the (base) URL for your Pure instance and a valid API key for working
with External Organizations. Enter your search query and hit the "Search"
button to make a request to `external-organizations/search` (limited to 1000
results.)

Use the "View Details" buttons to see the details of any of the organizations -
all data returned by the API should be displayed.

Select one organization to be the "target" organization into which other
records should be merged. Use the checkboxes to select other organizations to
merge into the target. You can clear your selection using the "Clear" button.

Click "Merge" to see a dialog summarising the organizations to be merged. To go
ahead with the merge, click the "Merge" button at the bottom of the dialog.

## Running

Before anything else:

```shell
cp src/environments/environment.ts.template src/environments/environment.ts
cp src/environments/environment.prod.ts.template src/environments/environment.prod.ts
```

This is an Angular app, so all API requests are being run client-side. This
leads to CORS issues, which have to be managed. Assuming it's not possible to
adjust the HTTP headers coming from Pure, you can use a proxy to achieve this.

In development, you can edit `src/app/proxy.conf.json` to set up a proxy when
using `ng serve`.

Once you've got a proxy set up for your test and/or live instances of Pure,
update the entries in `src/environments/environment.ts` and
`src/environments/environment.prod.ts`. This will make the proxying invisible
to users.

After that, the auto-generated Angular docs below should be enough to get it
running.

Copyright 2021 University of St Andrews.

## Auto-generated Angular README

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
