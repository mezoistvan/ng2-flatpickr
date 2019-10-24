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
        this.onTouchedFn = function () { };
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
    Ng2FlatpickrComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedFn = fn;
    };
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
    Ng2FlatpickrComponent.prototype.onFocus = function (event) {
        this.onTouchedFn();
    };
    var Ng2FlatpickrComponent_1;
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
            template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3pFLElBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0lBQzdCLE9BQU8sQ0FBRSxXQUFXLENBQUUsQ0FBQztDQUMxQjtBQWtCRDtJQWhCQTtRQUFBLGlCQThHQztRQTNGVSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLGdCQUFXLEdBQWEsY0FBUSxDQUFDLENBQUM7UUFFMUIsNEJBQXVCLEdBQXFCO1lBQ25ELElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLFVBQUUsYUFBa0IsSUFBUSxLQUFJLENBQUMsVUFBVSxDQUFFLGFBQWEsQ0FBRSxDQUFDLENBQUMsQ0FBQztTQUN6RSxDQUFDO1FBV0YsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFHekIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVV0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBZ0JuQixvQkFBZSxHQUFHLFVBQUUsQ0FBTSxJQUFPLENBQUMsQ0FBQztJQTRDcEMsQ0FBQzs4QkE5RlkscUJBQXFCO0lBOEJqQyxzQkFBSSwyQ0FBUTthQUFaLGNBQWlCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDekMsVUFBYyxFQUFVLElBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FEcEI7SUFNekMsbUNBQW1DO0lBRW5DLDBDQUFVLEdBQVYsVUFBWSxLQUFTO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUUsS0FBSyxDQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELGdEQUFnQixHQUFoQixVQUFrQixFQUFPO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpREFBaUIsR0FBakIsVUFBa0IsRUFBTztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBSUQsbUNBQW1DO0lBRW5DLGdEQUFnQixHQUFoQixVQUFrQixJQUFTO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxJQUFJLEVBQUUsSUFBSSxDQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELHNEQUFzQixHQUF0QixVQUF3QixXQUFtQjtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFFLGFBQWEsRUFBRSxXQUFXLENBQUUsQ0FBQztJQUNwRyxDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUNDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRztZQUNqQixNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUM7U0FDM0Q7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFHO1lBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFFLENBQUM7U0FDL0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUc7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztTQUN0QztJQUNGLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQWEsT0FBc0I7UUFDbEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYTtlQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRztZQUVuRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUUsU0FBUyxDQUFFO21CQUNuQyxPQUFPLENBQUUsU0FBUyxDQUFFLENBQUMsWUFBWSxFQUFHO2dCQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxDQUFFLFNBQVMsQ0FBRSxDQUFDLFlBQVksQ0FBRSxDQUFDO2FBQzNEO1lBRUYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7bUJBQ3BCLE9BQU8sQ0FBQyxjQUFjLENBQUUsYUFBYSxDQUFFO21CQUN2QyxPQUFPLENBQUUsYUFBYSxDQUFFLENBQUMsWUFBWSxFQUFHO2dCQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUUsT0FBTyxDQUFFLGFBQWEsQ0FBRSxDQUFDLFlBQVksQ0FBRSxDQUFDO2FBQ3JFO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsdUNBQU8sR0FBUCxVQUFRLEtBQVU7UUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7O0lBOUVEO1FBSEMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUN2QixNQUFNLEVBQUUsSUFBSTtTQUNaLENBQUM7bUVBQ29CO0lBR3RCO1FBREMsS0FBSyxFQUFFO3lEQUNpQjtJQUd6QjtRQURDLEtBQUssRUFBRTs4REFDaUI7SUFHekI7UUFERSxLQUFLLEVBQUU7MkRBQ2E7SUFHdEI7UUFEQyxLQUFLLEVBQUU7MERBQ2U7SUFHdkI7UUFEQyxLQUFLLEVBQUU7eURBQ2lDO0lBSXpDO1FBREMsS0FBSyxFQUFFOzZEQUNXO0lBbENQLHFCQUFxQjtRQWhCakMsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLGdUQUtSO1lBQ0YsU0FBUyxFQUFFO2dCQUNWO29CQUNDLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUUsY0FBTSxPQUFBLHVCQUFxQixFQUFyQixDQUFxQixDQUFFO29CQUN0RCxLQUFLLEVBQUUsSUFBSTtpQkFDWDthQUNEO1NBQ0QsQ0FBQztPQUNXLHFCQUFxQixDQThGakM7SUFBRCw0QkFBQztDQUFBLEFBOUZELElBOEZDO1NBOUZZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuXHJcbmlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKXtcclxuICAgIHJlcXVpcmUoICdmbGF0cGlja3InICk7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbmcyLWZsYXRwaWNrcicsXHJcblx0dGVtcGxhdGU6IGBcclxuXHRcdDxkaXYgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0LWNvbnRhaW5lclwiICNmbGF0cGlja3I+XHJcblx0XHRcdDxpbnB1dCAqbmdJZj1cIiFoaWRlQnV0dG9uXCIgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0IHt7IGFkZENsYXNzIH19XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW3RhYmluZGV4XT1cInRhYmluZGV4XCIgdHlwZT1cInRleHRcIiAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgZGF0YS1pbnB1dD5cclxuXHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cdFx0PC9kaXY+XHJcblx0XHRgLFxyXG5cdHByb3ZpZGVyczogW1xyXG5cdFx0e1xyXG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoICgpID0+IE5nMkZsYXRwaWNrckNvbXBvbmVudCApLFxyXG5cdFx0XHRtdWx0aTogdHJ1ZVxyXG5cdFx0fVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xyXG5cclxuICBcdHB1YmxpYyBmbGF0cGlja3I6IE9iamVjdDtcclxuICBcdHByaXZhdGUgX3RhYmluZGV4ID0gMDtcclxuXHRvblRvdWNoZWRGbjogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG5cdHByaXZhdGUgZGVmYXVsdEZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnMgPSB7XHJcblx0XHR3cmFwOiB0cnVlLFxyXG5cdFx0Y2xpY2tPcGVuczogdHJ1ZSxcclxuXHRcdG9uQ2hhbmdlOiAoIHNlbGVjdGVkRGF0ZXM6IGFueSApID0+IHsgdGhpcy53cml0ZVZhbHVlKCBzZWxlY3RlZERhdGVzICk7IH1cclxuXHR9O1xyXG5cclxuXHRAVmlld0NoaWxkKCdmbGF0cGlja3InLCB7XHJcblx0XHRzdGF0aWM6IHRydWVcclxuXHR9KVxyXG5cdGZsYXRwaWNrckVsZW1lbnQ6IGFueTtcclxuXHJcblx0QElucHV0KClcclxuXHRjb25maWc6IEZsYXRwaWNrck9wdGlvbnM7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gXHRASW5wdXQoKVxyXG5cdGFkZENsYXNzOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHNldERhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0Z2V0IHRhYmluZGV4KCkgeyByZXR1cm4gdGhpcy5fdGFiaW5kZXg7IH1cclxuXHRzZXQgdGFiaW5kZXgoIHRpOiBudW1iZXIgKSB7IHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKCB0aSApOyB9XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0aGlkZUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHR3cml0ZVZhbHVlKCB2YWx1ZTphbnkgKSB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSggdmFsdWUgKTtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyT25DaGFuZ2UoIGZuOiBhbnkgKSB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG5cdFx0dGhpcy5vblRvdWNoZWRGbiA9IGZuO1xyXG5cdH1cclxuXHJcblx0cHJvcGFnYXRlQ2hhbmdlID0gKCBfOiBhbnkgKSA9PiB7fTtcclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0c2V0RGF0ZUZyb21JbnB1dCggZGF0ZTogYW55ICkge1xyXG5cdFx0dGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrci5zZXREYXRlKCBkYXRlLCB0cnVlICk7XHJcblx0fVxyXG5cclxuXHRzZXRBbHRJbnB1dFBsYWNlaG9sZGVyKCBwbGFjZWhvbGRlcjogc3RyaW5nICkge1xyXG5cdFx0dGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyICk7XHJcblx0fVxyXG5cclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHRpZiggdGhpcy5jb25maWcgKSB7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24oIHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMsIHRoaXMuY29uZmlnICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrciA9IHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciggdGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucyApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuc2V0RGF0ZSApIHtcclxuXHRcdFx0dGhpcy5zZXREYXRlRnJvbUlucHV0KCB0aGlzLnNldERhdGUgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xyXG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50IFxyXG5cdFx0XHQmJiB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyICkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKCBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAnc2V0RGF0ZScgKSBcclxuXHRcdFx0XHRcdCYmIGNoYW5nZXNbICdzZXREYXRlJyBdLmN1cnJlbnRWYWx1ZSApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXREYXRlRnJvbUlucHV0KCBjaGFuZ2VzWyAnc2V0RGF0ZScgXS5jdXJyZW50VmFsdWUgKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoIHRoaXMuY29uZmlnLmFsdElucHV0XHJcblx0XHRcdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAncGxhY2Vob2xkZXInICkgXHJcblx0XHRcdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEFsdElucHV0UGxhY2Vob2xkZXIoIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdH1cclxuXHRcclxuXHRvbkZvY3VzKGV2ZW50OiBhbnkpIHtcclxuXHRcdHRoaXMub25Ub3VjaGVkRm4oKTtcclxuXHR9XHJcbn1cclxuIl19