var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
require('flatpickr');
let Ng2FlatpickrComponent = class Ng2FlatpickrComponent {
    ngAfterViewInit() {
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr({});
    }
};
__decorate([
    ViewChild('flatpickr'),
    __metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
Ng2FlatpickrComponent = __decorate([
    Component({
        selector: 'ng2-flatpickr',
        templateUrl: 'ng2-flatpickr.component.html'
    })
], Ng2FlatpickrComponent);
export { Ng2FlatpickrComponent };
//# sourceMappingURL=ng2-flatpickr.component.js.map