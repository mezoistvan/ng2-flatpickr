import * as tslib_1 from "tslib";
var Ng2FlatpickrComponent_1;
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
if (typeof window !== 'undefined') {
    require('flatpickr');
}
let Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = class Ng2FlatpickrComponent {
    constructor() {
        this._tabindex = 0;
        this.onTouchedFn = () => { };
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => { this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = (_) => { };
    }
    get tabindex() { return this._tabindex; }
    set tabindex(ti) { this._tabindex = Number(ti); }
    ///////////////////////////////////
    writeValue(value) {
        this.propagateChange(value);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    ///////////////////////////////////
    setDateFromInput(date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
    setAltInputPlaceholder(placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        if (this.flatpickrElement.nativeElement.flatpickr) {
            this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        }
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    ngOnChanges(changes) {
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
    }
    onFocus(event) {
        this.onTouchedFn();
    }
};
tslib_1.__decorate([
    ViewChild('flatpickr', {
        static: true
    })
], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
tslib_1.__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "config", void 0);
tslib_1.__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "addClass", void 0);
tslib_1.__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "setDate", void 0);
tslib_1.__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "tabindex", null);
tslib_1.__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ng2-flatpickr',
        template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" (focus)="onFocus($event)" data-input>
			<ng-content></ng-content>
		</div>
		`,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => Ng2FlatpickrComponent_1),
                multi: true
            }
        ]
    })
], Ng2FlatpickrComponent);
export { Ng2FlatpickrComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWlCLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt6RSxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBQztJQUM3QixPQUFPLENBQUUsV0FBVyxDQUFFLENBQUM7Q0FDMUI7QUFrQkQsSUFBYSxxQkFBcUIsNkJBQWxDLE1BQWEscUJBQXFCO0lBaEJsQztRQW1CVyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLGdCQUFXLEdBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLDRCQUF1QixHQUFxQjtZQUNuRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxDQUFFLGFBQWtCLEVBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsYUFBYSxDQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pFLENBQUM7UUFXRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBVXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFnQm5CLG9CQUFlLEdBQUcsQ0FBRSxDQUFNLEVBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQTRDcEMsQ0FBQztJQWhFQSxJQUFJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLElBQUksUUFBUSxDQUFFLEVBQVUsSUFBSyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBRSxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7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QUN0RCxLQUFLLEVBQUUsSUFBSTthQUNYO1NBQ0Q7S0FDRCxDQUFDO0dBQ1cscUJBQXFCLENBOEZqQztTQTlGWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcblxyXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICByZXF1aXJlKCAnZmxhdHBpY2tyJyApO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxyXG5cdHRlbXBsYXRlOiBgXHJcblx0XHQ8ZGl2IGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dC1jb250YWluZXJcIiAjZmxhdHBpY2tyPlxyXG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCIhaGlkZUJ1dHRvblwiIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiIHR5cGU9XCJ0ZXh0XCIgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIGRhdGEtaW5wdXQ+XHJcblx0XHRcdDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuXHRcdDwvZGl2PlxyXG5cdFx0YCxcclxuXHRwcm92aWRlcnM6IFtcclxuXHRcdHtcclxuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCAoKSA9PiBOZzJGbGF0cGlja3JDb21wb25lbnQgKSxcclxuXHRcdFx0bXVsdGk6IHRydWVcclxuXHRcdH1cclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcclxuXHJcbiAgXHRwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3Q7XHJcbiAgXHRwcml2YXRlIF90YWJpbmRleCA9IDA7XHJcblx0b25Ub3VjaGVkRm46IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xyXG5cdFx0d3JhcDogdHJ1ZSxcclxuXHRcdGNsaWNrT3BlbnM6IHRydWUsXHJcblx0XHRvbkNoYW5nZTogKCBzZWxlY3RlZERhdGVzOiBhbnkgKSA9PiB7IHRoaXMud3JpdGVWYWx1ZSggc2VsZWN0ZWREYXRlcyApOyB9XHJcblx0fTtcclxuXHJcblx0QFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xyXG5cdFx0c3RhdGljOiB0cnVlXHJcblx0fSlcclxuXHRmbGF0cGlja3JFbGVtZW50OiBhbnk7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0Y29uZmlnOiBGbGF0cGlja3JPcHRpb25zO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuIFx0QElucHV0KClcclxuXHRhZGRDbGFzczogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0QElucHV0KClcclxuXHRzZXREYXRlOiBzdHJpbmcgfCBEYXRlO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdGdldCB0YWJpbmRleCgpIHsgcmV0dXJuIHRoaXMuX3RhYmluZGV4OyB9XHJcblx0c2V0IHRhYmluZGV4KCB0aTogbnVtYmVyICkgeyB0aGlzLl90YWJpbmRleCA9IE51bWJlciggdGkgKTsgfVxyXG5cclxuXHRASW5wdXQoKVxyXG5cdGhpZGVCdXR0b24gPSBmYWxzZTtcclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0d3JpdGVWYWx1ZSggdmFsdWU6YW55ICkge1xyXG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UoIHZhbHVlICk7XHJcblx0fVxyXG5cclxuXHRyZWdpc3Rlck9uQ2hhbmdlKCBmbjogYW55ICkge1xyXG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuXHRcdHRoaXMub25Ub3VjaGVkRm4gPSBmbjtcclxuXHR9XHJcblxyXG5cdHByb3BhZ2F0ZUNoYW5nZSA9ICggXzogYW55ICkgPT4ge307XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdHNldERhdGVGcm9tSW5wdXQoIGRhdGU6IGFueSApIHtcclxuXHRcdHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3Iuc2V0RGF0ZSggZGF0ZSwgdHJ1ZSApO1xyXG5cdH1cclxuXHJcblx0c2V0QWx0SW5wdXRQbGFjZWhvbGRlciggcGxhY2Vob2xkZXI6IHN0cmluZyApIHtcclxuXHRcdHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IuYWx0SW5wdXQuc2V0QXR0cmlidXRlKCAncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlciApO1xyXG5cdH1cclxuXHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0aWYoIHRoaXMuY29uZmlnICkge1xyXG5cdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zLCB0aGlzLmNvbmZpZyApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciApIHtcclxuXHRcdFx0dGhpcy5mbGF0cGlja3IgPSB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IoIHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLnNldERhdGUgKSB7XHJcblx0XHRcdHRoaXMuc2V0RGF0ZUZyb21JbnB1dCggdGhpcy5zZXREYXRlICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRuZ09uQ2hhbmdlcyggY2hhbmdlczogU2ltcGxlQ2hhbmdlcyApIHtcclxuXHRcdGlmKCB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudCBcclxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrciApIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiggY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3NldERhdGUnICkgXHJcblx0XHRcdFx0XHQmJiBjaGFuZ2VzWyAnc2V0RGF0ZScgXS5jdXJyZW50VmFsdWUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0RGF0ZUZyb21JbnB1dCggY2hhbmdlc1sgJ3NldERhdGUnIF0uY3VycmVudFZhbHVlICk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKCB0aGlzLmNvbmZpZy5hbHRJbnB1dFxyXG5cdFx0XHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxyXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRBbHRJbnB1dFBsYWNlaG9sZGVyKCBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHR9XHJcblx0XHJcblx0b25Gb2N1cyhldmVudDogYW55KSB7XHJcblx0XHR0aGlzLm9uVG91Y2hlZEZuKCk7XHJcblx0fVxyXG59XHJcbiJdfQ==