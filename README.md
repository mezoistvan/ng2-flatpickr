# ng2-flatpickr
Angular 2+ wrapper for flatpickr

```javascript
npm install --save ng2-flatpickr
```

Usage: import the component to the module, then declare it in order to use it in html templates.

```javascript
import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';

@NgModule({
  declarations: [
    AppComponent,
    Ng2FlatpickrComponent
    ...
```

Example usage in a form component html template:

```javascript
<ng2-flatpickr formControlValue="formControlName"></ng2-flatpickr>
```

Flatpickr css needs to be loaded separately. when using `@angular/cli`, load it in `angular-cli.json`.

```javascript
"styles": [
  "../node_modules/flatpickr/dist/flatpickr.min.css"
]
```

### v0.1.4
Usable in forms. Flatpickr opens on click.

next version (coming in a few days):

### v0.1.5
Formatting options using @Input().
