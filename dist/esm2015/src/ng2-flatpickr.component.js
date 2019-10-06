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
    registerOnTouched() { }
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
};
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
        template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" data-input>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWlCLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt6RSxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBQztJQUM3QixPQUFPLENBQUUsV0FBVyxDQUFFLENBQUM7Q0FDMUI7QUFrQkQsSUFBYSxxQkFBcUIsNkJBQWxDLE1BQWEscUJBQXFCO0lBaEJsQztRQW1CVSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWYsNEJBQXVCLEdBQXFCO1lBQ25ELElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLENBQUUsYUFBa0IsRUFBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxhQUFhLENBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekUsQ0FBQztRQVdGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFVdEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWNuQixvQkFBZSxHQUFHLENBQUUsQ0FBTSxFQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUF3Q3BDLENBQUM7SUExREMsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLFFBQVEsQ0FBRSxFQUFVLElBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO0lBSzlELG1DQUFtQztJQUVuQyxVQUFVLENBQUUsS0FBUztRQUNwQixJQUFJLENBQUMsZUFBZSxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0IsQ0FBRSxFQUFPO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUIsS0FBSSxDQUFDO0lBSXRCLG1DQUFtQztJQUVuQyxnQkFBZ0IsQ0FBRSxJQUFTO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxJQUFJLEVBQUUsSUFBSSxDQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELHNCQUFzQixDQUFFLFdBQW1CO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBRSxDQUFDO0lBQ3BHLENBQUM7SUFFRCxlQUFlO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFHO1lBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUMzRDtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUc7WUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsdUJBQXVCLENBQUUsQ0FBQztTQUMvRjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRztZQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1NBQ3RDO0lBQ0YsQ0FBQztJQUVELFdBQVcsQ0FBRSxPQUFzQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhO2VBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFHO1lBRW5ELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBRSxTQUFTLENBQUU7bUJBQ25DLE9BQU8sQ0FBRSxTQUFTLENBQUUsQ0FBQyxZQUFZLEVBQUc7Z0JBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxPQUFPLENBQUUsU0FBUyxDQUFFLENBQUMsWUFBWSxDQUFFLENBQUM7YUFDM0Q7WUFFRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTttQkFDcEIsT0FBTyxDQUFDLGNBQWMsQ0FBRSxhQUFhLENBQUU7bUJBQ3ZDLE9BQU8sQ0FBRSxhQUFhLENBQUUsQ0FBQyxZQUFZLEVBQUc7Z0JBQzFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBRSxPQUFPLENBQUUsYUFBYSxDQUFFLENBQUMsWUFBWSxDQUFFLENBQUM7YUFDckU7U0FDRjtJQUNILENBQUM7Q0FDRCxDQUFBO0FBekVBO0lBSEMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUN2QixNQUFNLEVBQUUsSUFBSTtLQUNaLENBQUM7OytEQUNvQjtBQUd0QjtJQURDLEtBQUssRUFBRTs7cURBQ2lCO0FBR3pCO0lBREMsS0FBSyxFQUFFOzswREFDaUI7QUFHekI7SUFERSxLQUFLLEVBQUU7O3VEQUNhO0FBR3RCO0lBREMsS0FBSyxFQUFFOztzREFDZTtBQUd0QjtJQURDLEtBQUssRUFBRTs7O3FEQUNpQztBQUkxQztJQURDLEtBQUssRUFBRTs7eURBQ1c7QUFqQ1AscUJBQXFCO0lBaEJqQyxTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7O0dBS1I7UUFDRixTQUFTLEVBQUU7WUFDVjtnQkFDQyxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFFLEdBQUcsRUFBRSxDQUFDLHVCQUFxQixDQUFFO2dCQUN0RCxLQUFLLEVBQUUsSUFBSTthQUNYO1NBQ0Q7S0FDRCxDQUFDO0dBQ1cscUJBQXFCLENBdUZqQztTQXZGWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcblxyXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICByZXF1aXJlKCAnZmxhdHBpY2tyJyApO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxyXG5cdHRlbXBsYXRlOiBgXHJcblx0XHQ8ZGl2IGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dC1jb250YWluZXJcIiAjZmxhdHBpY2tyPlxyXG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCIhaGlkZUJ1dHRvblwiIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiIHR5cGU9XCJ0ZXh0XCIgZGF0YS1pbnB1dD5cclxuXHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cdFx0PC9kaXY+XHJcblx0XHRgLFxyXG5cdHByb3ZpZGVyczogW1xyXG5cdFx0e1xyXG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoICgpID0+IE5nMkZsYXRwaWNrckNvbXBvbmVudCApLFxyXG5cdFx0XHRtdWx0aTogdHJ1ZVxyXG5cdFx0fVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xyXG5cclxuICBwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3Q7XHJcbiAgcHJpdmF0ZSBfdGFiaW5kZXggPSAwO1xyXG5cclxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xyXG5cdFx0d3JhcDogdHJ1ZSxcclxuXHRcdGNsaWNrT3BlbnM6IHRydWUsXHJcblx0XHRvbkNoYW5nZTogKCBzZWxlY3RlZERhdGVzOiBhbnkgKSA9PiB7IHRoaXMud3JpdGVWYWx1ZSggc2VsZWN0ZWREYXRlcyApOyB9XHJcblx0fTtcclxuXHJcblx0QFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xyXG5cdFx0c3RhdGljOiB0cnVlXHJcblx0fSlcclxuXHRmbGF0cGlja3JFbGVtZW50OiBhbnk7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0Y29uZmlnOiBGbGF0cGlja3JPcHRpb25zO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICBASW5wdXQoKVxyXG5cdGFkZENsYXNzOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHNldERhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRhYmluZGV4KCkgeyByZXR1cm4gdGhpcy5fdGFiaW5kZXg7IH1cclxuICBzZXQgdGFiaW5kZXgoIHRpOiBudW1iZXIgKSB7IHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKCB0aSApOyB9XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0aGlkZUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHR3cml0ZVZhbHVlKCB2YWx1ZTphbnkgKSB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSggdmFsdWUgKTtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyT25DaGFuZ2UoIGZuOiBhbnkgKSB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJPblRvdWNoZWQoKSB7fVxyXG5cclxuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoIF86IGFueSApID0+IHt9O1xyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRzZXREYXRlRnJvbUlucHV0KCBkYXRlOiBhbnkgKSB7XHJcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLnNldERhdGUoIGRhdGUsIHRydWUgKTtcclxuXHR9XHJcblxyXG5cdHNldEFsdElucHV0UGxhY2Vob2xkZXIoIHBsYWNlaG9sZGVyOiBzdHJpbmcgKSB7XHJcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIgKTtcclxuXHR9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdGlmKCB0aGlzLmNvbmZpZyApIHtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucywgdGhpcy5jb25maWcgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IgKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyID0gdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5zZXREYXRlICkge1xyXG5cdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIHRoaXMuc2V0RGF0ZSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XHJcblx0XHRpZiggdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgXHJcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IgKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdzZXREYXRlJyApIFxyXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3NldERhdGUnIF0uY3VycmVudFZhbHVlICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIGNoYW5nZXNbICdzZXREYXRlJyBdLmN1cnJlbnRWYWx1ZSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiggdGhpcy5jb25maWcuYWx0SW5wdXRcclxuXHRcdFx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdwbGFjZWhvbGRlcicgKSBcclxuXHRcdFx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWx0SW5wdXRQbGFjZWhvbGRlciggY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==