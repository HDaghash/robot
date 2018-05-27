# Robot

Robot simulator moving on a square table. The table is 5 units x 5 units in size. There are no obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server
- clone the repo .
- make sure to have node and npm installed on your device . node : (https://nodejs.org/en/download/) | npm : (https://www.npmjs.com/get-npm)
- Run `npm install` (to install all the dependencies)
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Examples 

* for multi commands executions use the text area to submit your text like the following example :

```
PLACE 1,3,NORTH
RIGHT
MOVE
LEFT
MOVE
MOVE
RIGHT
MOVE
REPORT
```

* for single command use the single form issuer

* don't forget to install a full report about your movments by clicking "Download movments results" (csv file will be exported)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
