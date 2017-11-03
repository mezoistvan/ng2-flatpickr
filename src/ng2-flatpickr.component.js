"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
if (typeof window !== 'undefined') {
    require('flatpickr');
}
var Ng2FlatpickrComponent = /** @class */ (function () {
    function Ng2FlatpickrComponent() {
        var _this = this;
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: function (selectedDates) { _this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.propagateChange = function (_) { };
    }
    Ng2FlatpickrComponent_1 = Ng2FlatpickrComponent;
    ///////////////////////////////////
    Ng2FlatpickrComponent.prototype.writeValue = function (value) {
        this.propagateChange(value);
    };
    Ng2FlatpickrComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Ng2FlatpickrComponent.prototype.registerOnTouched = function () { };
    ///////////////////////////////////
    Ng2FlatpickrComponent.prototype.setDateFromInput = function (date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    };
    Ng2FlatpickrComponent.prototype.ngAfterViewInit = function () {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    };
    Ng2FlatpickrComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('setDate') && changes['setDate'].currentValue) {
            this.setDateFromInput(changes['setDate'].currentValue);
        }
    };
    __decorate([
        core_1.ViewChild('flatpickr'),
        __metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "setDate", void 0);
    Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = __decorate([
        core_1.Component({
            selector: 'ng2-flatpickr',
            template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input class=\"ng2-flatpickr-input\" [placeholder]=\"placeholder\" type=\"text\" data-input>\n\t\t</div>",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return Ng2FlatpickrComponent_1; }),
                    multi: true
                }
            ]
        })
    ], Ng2FlatpickrComponent);
    return Ng2FlatpickrComponent;
    var Ng2FlatpickrComponent_1;
}());
exports.Ng2FlatpickrComponent = Ng2FlatpickrComponent;
//# sourceMappingURL=ng2-flatpickr.component.js.map