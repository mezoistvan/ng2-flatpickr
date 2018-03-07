[![Build Status](https://travis-ci.org/mezoistvan/ng2-flatpickr.svg?branch=master)](https://travis-ci.org/mezoistvan/ng2-flatpickr)

# ng2-flatpickr
ng2-flatpickr is a lightweight Angular 2+ wrapper for flatpickr, which is usable in reactive forms inside Angular.

Examples are under construction here: https://mezoistvan.github.io/ng2-flatpickr-examples/.

```javascript
npm install --save ng2-flatpickr
yarn add ng2-flatpickr
```

# Version 1.5.0

Usage: import the Ng2FlatpickrModule to your NgModule:

```javascript
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
  imports: [
    Ng2FlatpickrModule
    ...
```

Example usage in a form component html template:

```javascript
<ng2-flatpickr formControlName="formControlName"></ng2-flatpickr>
```

Overwrite the default flatpickr properties by inputting any of the flatpickr options: https://chmln.github.io/flatpickr/options/ 

```javascript
import { FlatpickrOptions } from 'ng2-flatpickr';

let exampleOptions: FlatpickrOptions = {
  defaultDate: '2017-03-15'
};

<ng2-flatpickr [config]="exampleOptions" formControlName="formControlName"></ng2-flatpickr>
```

Add locale to the options

```javascript
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';

let exampleOptions: FlatpickrOptions = {
  locale: Russian.ru,
  ...
};

<ng2-flatpickr [config]="exampleOptions" formControlName="formControlName"></ng2-flatpickr>
```

Set a placeholder for the input:

```javascript
<ng2-flatpickr placeholder="Pick a date!" formControlName="formControlName"></ng2-flatpickr>
```

Set a date using a string or a date object:

```javascript
let randomDateString = '1988-09-19';
let randomDateObject = new Date( 1234567891011 );

<ng2-flatpickr [setDate]="randomDateString" formControlName="formControlName"></ng2-flatpickr>
<ng2-flatpickr [setDate]="randomDateObject" formControlName="formControlName"></ng2-flatpickr>

```

Flatpickr css needs to be loaded separately. when using `@angular/cli`, load it in `angular-cli.json`.

```javascript
"styles": [
  "../node_modules/flatpickr/dist/flatpickr.min.css"
]
```
