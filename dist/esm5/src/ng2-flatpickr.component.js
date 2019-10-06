import * as tslib_1 from "tslib";
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
if (typeof window !== 'undefined') {
    require('flatpickr');
}
var Ng2FlatpickrComponent = /** @class */ (function () {
    function Ng2FlatpickrComponent() {
        var _this = this;
        this._tabindex = 0;
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: function (selectedDates) { _this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = function (_) { };
    }
    Ng2FlatpickrComponent_1 = Ng2FlatpickrComponent;
    Object.defineProperty(Ng2FlatpickrComponent.prototype, "tabindex", {
        get: function () { return this._tabindex; },
        set: function (ti) { this._tabindex = Number(ti); },
        enumerable: true,
        configurable: true
    });
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
    Ng2FlatpickrComponent.prototype.setAltInputPlaceholder = function (placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    };
    Ng2FlatpickrComponent.prototype.ngAfterViewInit = function () {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        if (this.flatpickrElement.nativeElement.flatpickr) {
            this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        }
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    };
    Ng2FlatpickrComponent.prototype.ngOnChanges = function (changes) {
        if (this.flatpickrElement.nativeElement
            && this.flatpickrElement.nativeElement._flatpickr) {
            if (changes.hasOwnProperty('setDate')
                && changes['setDate'].currentValue) {
                this.setDateFromInput(changes['setDate'].currentValue);
            }
            if (this.config.altInput
                && changes.hasOwnProperty('placeholder')
                && changes['placeholder'].currentValue) {
                this.setAltInputPlaceholder(changes['placeholder'].currentValue);
            }
        }
    };
    var Ng2FlatpickrComponent_1;
    tslib_1.__decorate([
        ViewChild('flatpickr', {
            static: true
        }),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "config", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrComponent.prototype, "addClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "setDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], Ng2FlatpickrComponent.prototype, "tabindex", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
    Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'ng2-flatpickr',
            template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return Ng2FlatpickrComponent_1; }),
                    multi: true
                }
            ]
        })
    ], Ng2FlatpickrComponent);
    return Ng2FlatpickrComponent;
}());
export { Ng2FlatpickrComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3pFLElBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0lBQzdCLE9BQU8sQ0FBRSxXQUFXLENBQUUsQ0FBQztDQUMxQjtBQWtCRDtJQWhCQTtRQUFBLGlCQXVHQztRQXBGUyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWYsNEJBQXVCLEdBQXFCO1lBQ25ELElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLFVBQUUsYUFBa0IsSUFBUSxLQUFJLENBQUMsVUFBVSxDQUFFLGFBQWEsQ0FBRSxDQUFDLENBQUMsQ0FBQztTQUN6RSxDQUFDO1FBV0YsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFHekIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVV0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBY25CLG9CQUFlLEdBQUcsVUFBRSxDQUFNLElBQU8sQ0FBQyxDQUFDO0lBd0NwQyxDQUFDOzhCQXZGWSxxQkFBcUI7SUE2QmhDLHNCQUFJLDJDQUFRO2FBQVosY0FBaUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN6QyxVQUFjLEVBQVUsSUFBSyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBRSxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7OztPQURwQjtJQU0xQyxtQ0FBbUM7SUFFbkMsMENBQVUsR0FBVixVQUFZLEtBQVM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FB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bXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcblxyXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICByZXF1aXJlKCAnZmxhdHBpY2tyJyApO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxyXG5cdHRlbXBsYXRlOiBgXHJcblx0XHQ8ZGl2IGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dC1jb250YWluZXJcIiAjZmxhdHBpY2tyPlxyXG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCIhaGlkZUJ1dHRvblwiIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiIHR5cGU9XCJ0ZXh0XCIgZGF0YS1pbnB1dD5cclxuXHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cdFx0PC9kaXY+XHJcblx0XHRgLFxyXG5cdHByb3ZpZGVyczogW1xyXG5cdFx0e1xyXG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoICgpID0+IE5nMkZsYXRwaWNrckNvbXBvbmVudCApLFxyXG5cdFx0XHRtdWx0aTogdHJ1ZVxyXG5cdFx0fVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xyXG5cclxuICBwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3Q7XHJcbiAgcHJpdmF0ZSBfdGFiaW5kZXggPSAwO1xyXG5cclxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xyXG5cdFx0d3JhcDogdHJ1ZSxcclxuXHRcdGNsaWNrT3BlbnM6IHRydWUsXHJcblx0XHRvbkNoYW5nZTogKCBzZWxlY3RlZERhdGVzOiBhbnkgKSA9PiB7IHRoaXMud3JpdGVWYWx1ZSggc2VsZWN0ZWREYXRlcyApOyB9XHJcblx0fTtcclxuXHJcblx0QFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xyXG5cdFx0c3RhdGljOiB0cnVlXHJcblx0fSlcclxuXHRmbGF0cGlja3JFbGVtZW50OiBhbnk7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0Y29uZmlnOiBGbGF0cGlja3JPcHRpb25zO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICBASW5wdXQoKVxyXG5cdGFkZENsYXNzOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHNldERhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRhYmluZGV4KCkgeyByZXR1cm4gdGhpcy5fdGFiaW5kZXg7IH1cclxuICBzZXQgdGFiaW5kZXgoIHRpOiBudW1iZXIgKSB7IHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKCB0aSApOyB9XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0aGlkZUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHR3cml0ZVZhbHVlKCB2YWx1ZTphbnkgKSB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSggdmFsdWUgKTtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyT25DaGFuZ2UoIGZuOiBhbnkgKSB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJPblRvdWNoZWQoKSB7fVxyXG5cclxuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoIF86IGFueSApID0+IHt9O1xyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRzZXREYXRlRnJvbUlucHV0KCBkYXRlOiBhbnkgKSB7XHJcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLnNldERhdGUoIGRhdGUsIHRydWUgKTtcclxuXHR9XHJcblxyXG5cdHNldEFsdElucHV0UGxhY2Vob2xkZXIoIHBsYWNlaG9sZGVyOiBzdHJpbmcgKSB7XHJcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIgKTtcclxuXHR9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdGlmKCB0aGlzLmNvbmZpZyApIHtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucywgdGhpcy5jb25maWcgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IgKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyID0gdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5zZXREYXRlICkge1xyXG5cdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIHRoaXMuc2V0RGF0ZSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XHJcblx0XHRpZiggdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgXHJcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IgKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdzZXREYXRlJyApIFxyXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3NldERhdGUnIF0uY3VycmVudFZhbHVlICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIGNoYW5nZXNbICdzZXREYXRlJyBdLmN1cnJlbnRWYWx1ZSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiggdGhpcy5jb25maWcuYWx0SW5wdXRcclxuXHRcdFx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdwbGFjZWhvbGRlcicgKSBcclxuXHRcdFx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWx0SW5wdXRQbGFjZWhvbGRlciggY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==