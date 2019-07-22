import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
var Ng2FlatpickrDirective = /** @class */ (function () {
    function Ng2FlatpickrDirective(parent, ngControl, element, renderer) {
        this.parent = parent;
        this.ngControl = ngControl;
        this.element = element;
        this.renderer = renderer;
        /**
         * onChange gets triggered when the user selects a date, or changes the time on a selected date.
         *
         * Default:  null
         */
        this.flatpickrOnChange = new EventEmitter();
        /**
         * onClose gets triggered when the calendar is closed.
         *
         * Default:  null
         */
        this.flatpickrOnClose = new EventEmitter();
        /**
         * onOpen gets triggered when the calendar is opened.
         *
         * Default:  null
         */
        this.flatpickrOnOpen = new EventEmitter();
        /**
         * onReady gets triggered once the calendar is in a ready state.
         *
         * Default:  null
         */
        this.flatpickrOnReady = new EventEmitter();
    }
    /** Allow double-clicking on the control to open/close it. */
    Ng2FlatpickrDirective.prototype.onClick = function () {
        this.flatpickr.toggle();
    };
    Object.defineProperty(Ng2FlatpickrDirective.prototype, "control", {
        get: function () {
            return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
        },
        enumerable: true,
        configurable: true
    });
    Ng2FlatpickrDirective.prototype.ngAfterViewInit = function () {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        var nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setElementAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    };
    Ng2FlatpickrDirective.prototype.ngOnChanges = function (changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    };
    Ng2FlatpickrDirective.prototype.ngOnDestroy = function () {
        if (this.flatpickr) {
            this.flatpickr.destroy();
        }
        if (this.formControlListener) {
            this.formControlListener.unsubscribe();
            this.formControlListener = undefined;
        }
        this.flatpickrOnChange = undefined;
        this.flatpickrOnClose = undefined;
        this.flatpickrOnOpen = undefined;
        this.flatpickrOnReady = undefined;
    };
    Ng2FlatpickrDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.globalOnChange = this.flatpickrOptions.onChange;
        this.globalOnClose = this.flatpickrOptions.onClose;
        this.globalOnOpen = this.flatpickrOptions.onOpen;
        this.globalOnReady = this.flatpickrOptions.onReady;
        this.flatpickrOptions = {
            altFormat: this.getOption('altFormat'),
            altInput: this.getOption('altInput'),
            altInputClass: this.getOption('altInputClass'),
            allowInput: this.getOption('allowInput'),
            appendTo: this.getOption('appendTo'),
            clickOpens: this.getOption('clickOpens', true),
            dateFormat: this.getOption('dateFormat'),
            defaultDate: this.getOption('defaultDate'),
            disable: this.getOption('disable'),
            disableMobile: this.getOption('disableMobile'),
            enable: this.getOption('enable'),
            enableTime: this.getOption('enableTime'),
            enableSeconds: this.getOption('enableSeconds'),
            hourIncrement: this.getOption('hourIncrement'),
            inline: this.getOption('inline'),
            locale: this.getOption('locale'),
            maxDate: this.getOption('maxDate'),
            minDate: this.getOption('minDate'),
            minuteIncrement: this.getOption('minuteIncrement'),
            mode: this.getOption('mode'),
            nextArrow: this.getOption('nextArrow'),
            noCalendar: this.getOption('noCalendar'),
            onChange: this.eventOnChange,
            onClose: this.eventOnClose,
            onOpen: this.eventOnOpen,
            onReady: this.eventOnReady,
            parseDate: this.getOption('parseDate'),
            prevArrow: this.getOption('prevArrow'),
            shorthandCurrentMonth: this.getOption('shorthandCurrentMonth'),
            static: this.getOption('static'),
            time_24hr: this.getOption('time_24hr'),
            utc: this.getOption('utc'),
            weekNumbers: this.getOption('weekNumbers'),
            wrap: this.getOption('wrap', true),
        };
        // Remove unset properties
        Object.keys(this.flatpickrOptions).forEach(function (key) {
            (_this.flatpickrOptions[key] === undefined) &&
                delete _this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe(function (value) {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    _this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnChange = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnChange) {
            this.flatpickrOnChange.emit(event);
        }
        if (this.globalOnChange) {
            this.globalOnChange(event);
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnClose = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnClose) {
            this.flatpickrOnClose.emit(event);
        }
        if (this.globalOnClose) {
            this.globalOnClose(event);
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnOpen = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnOpen) {
            this.flatpickrOnOpen.emit(event);
        }
        if (this.globalOnOpen) {
            this.globalOnOpen(event);
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnReady = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnReady) {
            this.flatpickrOnReady.emit(event);
        }
        if (this.globalOnReady) {
            this.globalOnReady(event);
        }
    };
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    Ng2FlatpickrDirective.prototype.getOption = function (option, defaultValue) {
        var localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
            + option.substring(1);
        if (typeof this[localName] !== 'undefined') {
            return this[localName];
        }
        else if (typeof this.flatpickrOptions[option] !== 'undefined') {
            return this.flatpickrOptions[option];
        }
        else {
            return defaultValue;
        }
    };
    tslib_1.__decorate([
        Input('flatpickr'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
    tslib_1.__decorate([
        Input('placeholder'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input('altFormat'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
    tslib_1.__decorate([
        Input('altInput'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
    tslib_1.__decorate([
        Input('altInputClass'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
    tslib_1.__decorate([
        Input('allowInput'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
    tslib_1.__decorate([
        Input('appendTo'),
        tslib_1.__metadata("design:type", HTMLElement)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
    tslib_1.__decorate([
        Input('clickOpens'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
    tslib_1.__decorate([
        Input('dateFormat'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
    tslib_1.__decorate([
        Input('defaultDate'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
    tslib_1.__decorate([
        Input('disable'),
        tslib_1.__metadata("design:type", Array)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
    tslib_1.__decorate([
        Input('disableMobile'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
    tslib_1.__decorate([
        Input('enable'),
        tslib_1.__metadata("design:type", Array)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
    tslib_1.__decorate([
        Input('enableTime'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
    tslib_1.__decorate([
        Input('enableSeconds'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
    tslib_1.__decorate([
        Input('hourIncrement'),
        tslib_1.__metadata("design:type", Number)
    ], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
    tslib_1.__decorate([
        Input('inline'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
    tslib_1.__decorate([
        Input('locale'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
    tslib_1.__decorate([
        Input('maxDate'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
    tslib_1.__decorate([
        Input('minDate'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
    tslib_1.__decorate([
        Input('minuteIncrement'),
        tslib_1.__metadata("design:type", Number)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
    tslib_1.__decorate([
        Input('mode'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
    tslib_1.__decorate([
        Input('nextArrow'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
    tslib_1.__decorate([
        Input('noCalendar'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
    tslib_1.__decorate([
        Input('parseDate'),
        tslib_1.__metadata("design:type", Function)
    ], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
    tslib_1.__decorate([
        Input('prevArrow'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
    tslib_1.__decorate([
        Input('shorthandCurrentMonth'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
    tslib_1.__decorate([
        Input('static'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
    tslib_1.__decorate([
        Input('time_24hr'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
    tslib_1.__decorate([
        Input('utc'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
    tslib_1.__decorate([
        Input('weekNumbers'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
    tslib_1.__decorate([
        Input('wrap'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
    tslib_1.__decorate([
        Output('onChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
    tslib_1.__decorate([
        Output('onClose'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
    tslib_1.__decorate([
        Output('onOpen'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
    tslib_1.__decorate([
        Output('onReady'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
    tslib_1.__decorate([
        HostListener('dblclick'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Ng2FlatpickrDirective.prototype, "onClick", null);
    Ng2FlatpickrDirective = tslib_1.__decorate([
        Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }),
        tslib_1.__metadata("design:paramtypes", [ControlContainer,
            NgControl,
            ElementRef,
            Renderer])
    ], Ng2FlatpickrDirective);
    return Ng2FlatpickrDirective;
}());
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFDbkMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFlLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFO0lBMlJDLCtCQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELHVDQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsc0JBQUksMENBQU87YUFBWDtZQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENB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RTs7cUVBQW1DO0lBUWpDO1FBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7O3NFQUFxQztJQU9yQztRQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFOzBDQUE0QixRQUFRO3FFQUFDO0lBT3BDO1FBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7O3FFQUFtQztJQU90QjtRQUFqQyxLQUFLLENBQUUsdUJBQXVCLENBQUU7O2lGQUFnRDtJQVE5RDtRQUFsQixLQUFLLENBQUUsUUFBUSxDQUFFOztrRUFBaUM7SUFPN0I7UUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTs7cUVBQW9DO0lBRXpDO1FBQWYsS0FBSyxDQUFFLEtBQUssQ0FBRTs7K0RBQThCO0lBT3JCO1FBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7O3VFQUFzQztJQU81QztRQUFoQixLQUFLLENBQUUsTUFBTSxDQUFFOztnRUFBK0I7SUFPekI7UUFBckIsTUFBTSxDQUFFLFVBQVUsQ0FBRTswQ0FBMkIsWUFBWTtvRUFBc0M7SUFPN0U7UUFBcEIsTUFBTSxDQUFFLFNBQVMsQ0FBRTswQ0FBMEIsWUFBWTttRUFBc0M7SUFPNUU7UUFBbkIsTUFBTSxDQUFFLFFBQVEsQ0FBRTswQ0FBeUIsWUFBWTtrRUFBc0M7SUFPekU7UUFBcEIsTUFBTSxDQUFFLFNBQVMsQ0FBRTswQ0FBMEIsWUFBWTttRUFBc0M7SUFJaEc7UUFEQyxZQUFZLENBQUUsVUFBVSxDQUFFOzs7O3dEQUcxQjtJQTlRVyxxQkFBcUI7UUFEakMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUM7aURBNlI5QyxnQkFBZ0I7WUFDYixTQUFTO1lBQ1gsVUFBVTtZQUNULFFBQVE7T0EvUmpCLHFCQUFxQixDQTZlakM7SUFBRCw0QkFBQztDQUFBLEFBN2VELElBNmVDO1NBN2VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXHJcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmxhdHBpY2tyRXZlbnQgfSBmcm9tICcuL2ZsYXRwaWNrci1ldmVudC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGbGF0cGlja3JJbnN0YW5jZSB9IGZyb20gJy4vZmxhdHBpY2tyLWluc3RhbmNlJztcclxuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tmbGF0cGlja3JdJywgZXhwb3J0QXM6ICduZzItZmxhdHBpY2tyJyB9KVxyXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcblx0LyoqXHJcblx0ICogVGhlIGZsYXRwaWNrciBjb25maWd1cmF0aW9uIGFzIGEgc2luZ2xlIG9iamVjdCBvZiB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL29wdGlvbnMvIGZvciBmdWxsIGxpc3QuXHJcblx0ICovXHJcblx0QElucHV0KCAnZmxhdHBpY2tyJyApIHB1YmxpYyBmbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zO1xyXG5cclxuXHQvKipcclxuXHQgKiBQbGFjZWhvbGRlciBmb3IgaW5wdXQgZmllbGQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3BsYWNlaG9sZGVyJyApIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGFjdGx5IHRoZSBzYW1lIGFzIGRhdGUgZm9ybWF0LCBidXQgZm9yIHRoZSBhbHRJbnB1dCBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXHJcblx0ICovXHJcblx0QElucHV0KCAnYWx0Rm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRGb3JtYXQ6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogU2hvdyB0aGUgdXNlciBhIHJlYWRhYmxlIGRhdGUgKGFzIHBlciBhbHRGb3JtYXQpLCBidXQgcmV0dXJuIHNvbWV0aGluZ1xyXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdhbHRJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXQ6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoaXMgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5wdXQgZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBhbHRJbnB1dFxyXG5cdCAqIG9wdGlvbi5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIlwiXHJcblx0ICovXHJcblx0QElucHV0KCAnYWx0SW5wdXRDbGFzcycgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcclxuXHQgKiBkZWZhdWx0LCBkaXJlY3QgZW50cnkgaXMgZGlzYWJsZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdhbGxvd0lucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbGxvd0lucHV0OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnN0ZWFkIG9mIGJvZHksIGFwcGVuZHMgdGhlIGNhbGVuZGFyIHRvIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnN0ZWFkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdhcHBlbmRUbycgKSBwdWJsaWMgZmxhdHBpY2tyQXBwZW5kVG86IEhUTUxFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxyXG5cdCAqIFlvdSBjb3VsZCBkaXNhYmxlIHRoaXMgaWYgeW91IHdpc2ggdG8gb3BlbiB0aGUgY2FsZW5kYXIgbWFudWFsbHlcclxuXHQgKiB3aXRoLm9wZW4oKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICB0cnVlXHJcblx0ICovXHJcblx0QElucHV0KCAnY2xpY2tPcGVucycgKSBwdWJsaWMgZmxhdHBpY2tyQ2xpY2tPcGVuczogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBzdHJpbmcgb2YgY2hhcmFjdGVycyB3aGljaCBhcmUgdXNlZCB0byBkZWZpbmUgaG93IHRoZSBkYXRlIHdpbGwgYmVcclxuXHQgKiBkaXNwbGF5ZWQgaW4gdGhlIGlucHV0IGJveC5cclxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwiWS1tLWRcIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2RhdGVGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaW5pdGlhbCBzZWxlY3RlZCBkYXRlKHMpLlxyXG5cdCAqXHJcblx0ICogSWYgeW91J3JlIHVzaW5nIHttb2RlOiBcIm11bHRpcGxlXCJ9IG9yIGEgcmFuZ2UgY2FsZW5kYXIgc3VwcGx5IGFuIEFycmF5IG9mXHJcblx0ICogRGF0ZSBvYmplY3RzIG9yIGFuIEFycmF5IG9mIGRhdGUgc3RyaW5ncyB3aGljaCBmb2xsb3cgeW91ciBkYXRlRm9ybWF0LlxyXG5cdCAqXHJcblx0ICogT3RoZXJ3aXNlLCB5b3UgY2FuIHN1cHBseSBhIHNpbmdsZSBEYXRlIG9iamVjdCBvciBhIGRhdGUgc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdkZWZhdWx0RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc2FibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZGlzYWJsZVxyXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctc3BlY2lmaWMtZGF0ZXNcclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBbXVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2Rpc2FibGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgZGlzYWJsZU1vYmlsZSB0byB0cnVlIHRvIGFsd2F5cyB1c2UgdGhlIG5vbi1uYXRpdmUgcGlja2VyLiBCeVxyXG5cdCAqIGRlZmF1bHQsIEZsYXRwaWNrciB1dGlsaXplcyBuYXRpdmUgZGF0ZXRpbWUgd2lkZ2V0cyB1bmxlc3MgY2VydGFpblxyXG5cdCAqIG9wdGlvbnMgKGUuZy4gZGlzYWJsZSkgYXJlIHVzZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdkaXNhYmxlTW9iaWxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXHJcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBbXVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2VuYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyB0aW1lIHBpY2tlci5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2VuYWJsZVRpbWUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdlbmFibGVTZWNvbmRzJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVTZWNvbmRzOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgaG91ciBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICAxXHJcblx0ICovXHJcblx0QElucHV0KCAnaG91ckluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tySG91ckluY3JlbWVudDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5cyB0aGUgY2FsZW5kYXIgaW5saW5lLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnaW5saW5lJyApIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnbG9jYWxlJyApIHB1YmxpYyBmbGF0cGlja3JMb2NhbGU6IE9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gcGljayB0byAoaW5jbHVzaXZlKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnbWF4RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWF4RGF0ZTogc3RyaW5nIHwgRGF0ZTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gc3RhcnQgcGlja2luZyBmcm9tIChpbmNsdXNpdmUpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdtaW5EYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlO1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIDVcclxuXHQgKi9cclxuXHRASW5wdXQoICdtaW51dGVJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrck1pbnV0ZUluY3JlbWVudDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBcInNpbmdsZVwiLCBcIm11bHRpcGxlXCIsIG9yIFwicmFuZ2VcIlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwic2luZ2xlXCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdtb2RlJyApIHB1YmxpYyBmbGF0cGlja3JNb2RlOiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhUTUwgZm9yIHRoZSBhcnJvdyBpY29uLCB1c2VkIHRvIHN3aXRjaCBtb250aHMuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCI+XCJcclxuXHQgKi9cclxuXHRASW5wdXQoICduZXh0QXJyb3cnICkgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xyXG5cdCAqIGNyZWF0ZSBhIHRpbWUgcGlja2VyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnbm9DYWxlbmRhcicgKSBwdWJsaWMgZmxhdHBpY2tyTm9DYWxlbmRhcjogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRnVuY3Rpb24gdGhhdCBleHBlY3RzIGEgZGF0ZSBzdHJpbmcgYW5kIG11c3QgcmV0dXJuIGEgRGF0ZSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdwYXJzZURhdGUnICkgcHVibGljIGZsYXRwaWNrclBhcnNlRGF0ZTogRnVuY3Rpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhUTUwgZm9yIHRoZSBsZWZ0IGFycm93IGljb24uXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCI8XCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdwcmV2QXJyb3cnICkgcHVibGljIGZsYXRwaWNrclByZXZBcnJvdzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG93IHRoZSBtb250aCB1c2luZyB0aGUgc2hvcnRoYW5kIHZlcnNpb24gKGllLCBTZXAgaW5zdGVhZCBvZiBTZXB0ZW1iZXIpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnc2hvcnRoYW5kQ3VycmVudE1vbnRoJyApIHB1YmxpYyBmbGF0cGlja3JTaG9ydGhhbmRDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBvc2l0aW9uIHRoZSBjYWxlbmRhciBpbnNpZGUgdGhlIHdyYXBwZXIgYW5kIG5leHQgdG8gdGhlIGlucHV0IGVsZW1lbnRcclxuXHQgKiAoTGVhdmUgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3N0YXRpYycgKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAndGltZV8yNGhyJyApIHB1YmxpYyBmbGF0cGlja3JUaW1lXzI0aHI6IGJvb2xlYW47XHJcblxyXG5cdEBJbnB1dCggJ3V0YycgKSBwdWJsaWMgZmxhdHBpY2tyVXRjOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzIGRpc3BsYXkgb2Ygd2VlayBudW1iZXJzIGluIGNhbGVuZGFyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnd2Vla051bWJlcnMnICkgcHVibGljIGZsYXRwaWNrcldlZWtOdW1iZXJzOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXN0b20gZWxlbWVudHMgYW5kIGlucHV0IGdyb3Vwcy5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3dyYXAnICkgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRAT3V0cHV0KCAnb25DaGFuZ2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHQvKipcclxuXHQgKiBvbkNsb3NlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIGNsb3NlZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QE91dHB1dCggJ29uQ2xvc2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIG9uT3BlbiBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBPdXRwdXQoICdvbk9wZW4nICkgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0LyoqXHJcblx0ICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRAT3V0cHV0KCAnb25SZWFkeScgKSBwdWJsaWMgZmxhdHBpY2tyT25SZWFkeTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0LyoqIEFsbG93IGRvdWJsZS1jbGlja2luZyBvbiB0aGUgY29udHJvbCB0byBvcGVuL2Nsb3NlIGl0LiAqL1xyXG5cdEBIb3N0TGlzdGVuZXIoICdkYmxjbGljaycgKVxyXG5cdHB1YmxpYyBvbkNsaWNrKCkge1xyXG5cdFx0dGhpcy5mbGF0cGlja3IudG9nZ2xlKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DaGFuZ2U6IEZ1bmN0aW9uO1xyXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbjtcclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25PcGVuOiBGdW5jdGlvbjtcclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25SZWFkeTogRnVuY3Rpb247XHJcblxyXG5cdHByb3RlY3RlZCBmbGF0cGlja3I6IEZsYXRwaWNrckluc3RhbmNlO1xyXG5cdHByb3RlY3RlZCBmb3JtQ29udHJvbExpc3RlbmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG5cdC8qKiBBbGxvdyBhY2Nlc3MgcHJvcGVydGllcyB1c2luZyBpbmRleCBub3RhdGlvbiAqL1xyXG5cdFtrZXk6c3RyaW5nXTogYW55O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXHJcblx0XHRwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXHJcblx0XHRwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcclxuXHRcdHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXJcclxuXHQpIHt9XHJcblxyXG5cdGdldCBjb250cm9sKCk6IEZvcm1Db250cm9sIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxyXG5cdFx0XHRyYW5kb21pemUgdGhlIGRhdGUgd2hlbiB0aGUgZm9ybSBjb250cm9sIGluaXRpYWxpemVzLiAqL1xyXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuXHJcblx0XHRpZiAodHlwZW9mIG5hdGl2ZUVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IG5hdGl2ZUVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2RhdGEtaW5wdXQnLCAnJyApO1xyXG5cdFx0XHRuYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZmxhdHBpY2tyID0gPEZsYXRwaWNrckluc3RhbmNlPm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKTtcclxuXHR9XHJcblxyXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xyXG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyXHJcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyQWx0SW5wdXRcclxuXHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxyXG5cdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xyXG5cdFx0XHRcdHRoaXMuZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xyXG5cdFx0XHR9XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrci5kZXN0cm95KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lcikge1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZsYXRwaWNrck9uT3BlbiA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNoYW5nZTtcclxuXHRcdHRoaXMuZ2xvYmFsT25DbG9zZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNsb3NlO1xyXG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xyXG5cdFx0dGhpcy5nbG9iYWxPblJlYWR5ID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uUmVhZHk7XHJcblxyXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xyXG5cdFx0XHRhbHRGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRGb3JtYXQnKSxcclxuXHRcdFx0YWx0SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dCcpLFxyXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxyXG5cdFx0XHRhbGxvd0lucHV0OiB0aGlzLmdldE9wdGlvbignYWxsb3dJbnB1dCcpLFxyXG5cdFx0XHRhcHBlbmRUbzogdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJyksXHJcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXHJcblx0XHRcdGRhdGVGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdkYXRlRm9ybWF0JyksXHJcblx0XHRcdGRlZmF1bHREYXRlOiB0aGlzLmdldE9wdGlvbignZGVmYXVsdERhdGUnKSxcclxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcclxuXHRcdFx0ZGlzYWJsZU1vYmlsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGVNb2JpbGUnKSxcclxuXHRcdFx0ZW5hYmxlOiB0aGlzLmdldE9wdGlvbignZW5hYmxlJyksXHJcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXHJcblx0XHRcdGVuYWJsZVNlY29uZHM6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVTZWNvbmRzJyksXHJcblx0XHRcdGhvdXJJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdob3VySW5jcmVtZW50JyksXHJcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxyXG5cdFx0XHRsb2NhbGU6IHRoaXMuZ2V0T3B0aW9uKCdsb2NhbGUnKSxcclxuXHRcdFx0bWF4RGF0ZTogdGhpcy5nZXRPcHRpb24oJ21heERhdGUnKSxcclxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcclxuXHRcdFx0bWludXRlSW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignbWludXRlSW5jcmVtZW50JyksXHJcblx0XHRcdG1vZGU6IHRoaXMuZ2V0T3B0aW9uKCdtb2RlJyksXHJcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxyXG5cdFx0XHRub0NhbGVuZGFyOiB0aGlzLmdldE9wdGlvbignbm9DYWxlbmRhcicpLFxyXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5ldmVudE9uQ2hhbmdlLFxyXG5cdFx0XHRvbkNsb3NlOiB0aGlzLmV2ZW50T25DbG9zZSxcclxuXHRcdFx0b25PcGVuOiB0aGlzLmV2ZW50T25PcGVuLFxyXG5cdFx0XHRvblJlYWR5OiB0aGlzLmV2ZW50T25SZWFkeSxcclxuXHRcdFx0cGFyc2VEYXRlOiB0aGlzLmdldE9wdGlvbigncGFyc2VEYXRlJyksXHJcblx0XHRcdHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxyXG5cdFx0XHRzaG9ydGhhbmRDdXJyZW50TW9udGg6IHRoaXMuZ2V0T3B0aW9uKCdzaG9ydGhhbmRDdXJyZW50TW9udGgnKSxcclxuXHRcdFx0c3RhdGljOiB0aGlzLmdldE9wdGlvbignc3RhdGljJyksXHJcblx0XHRcdHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxyXG5cdFx0XHR1dGM6IHRoaXMuZ2V0T3B0aW9uKCd1dGMnKSxcclxuXHRcdFx0d2Vla051bWJlcnM6IHRoaXMuZ2V0T3B0aW9uKCd3ZWVrTnVtYmVycycpLFxyXG5cdFx0XHR3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xyXG5cdFx0T2JqZWN0LmtleXMoIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyApLmZvckVhY2goICgga2V5OiBzdHJpbmcgKSA9PiB7XHJcblx0XHRcdCh0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSAmJlxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XTtcclxuXHRcdH0gKTtcclxuXHJcblx0XHRpZiAodGhpcy5jb250cm9sKSB7XHJcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lciA9IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXNcclxuXHRcdFx0XHQuc3Vic2NyaWJlKCAoIHZhbHVlOiBhbnkgKSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoICEoIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSApICkge1xyXG5cdFx0XHRcdFx0XHQvLyBRdWlldGx5IHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gY29udHJvbCB0byBiZSBhXHJcblx0XHRcdFx0XHRcdC8vIERhdGUgb2JqZWN0LiBUaGlzIGF2b2lkcyBhbnkgZXh0ZXJuYWwgc3Vic2NyaWJlcnNcclxuXHRcdFx0XHRcdFx0Ly8gZnJvbSBiZWluZyBub3RpZmllZCBhIHNlY29uZCB0aW1lIChvbmNlIGZvciB0aGUgdXNlclxyXG5cdFx0XHRcdFx0XHQvLyBpbml0aWF0ZWQgZXZlbnQsIGFuZCBvbmNlIGZvciBvdXIgY29udmVyc2lvbiB0b1xyXG5cdFx0XHRcdFx0XHQvLyBEYXRlKCkpLlxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRyb2wuc2V0VmFsdWUoIG5ldyBEYXRlKCAnJyArIHZhbHVlICksIHtcclxuXHRcdFx0XHRcdFx0XHRvbmx5U2VsZjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRlbWl0RXZlbnQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0ZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxyXG5cdFx0XHRcdFx0XHR9ICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxyXG5cdCAqIGdsb2JhbCBvbkNoYW5nZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XHJcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xyXG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxyXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxyXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2VcclxuXHRcdH07XHJcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UuZW1pdCggZXZlbnQgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2hhbmdlICkge1xyXG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2hhbmdlKCBldmVudCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxyXG5cdCAqIGdsb2JhbCBvbkNsb3NlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBldmVudE9uQ2xvc2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xyXG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcclxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXHJcblx0XHR9O1xyXG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2xvc2UgKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25DbG9zZS5lbWl0KCBldmVudCApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DbG9zZSApIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxPbkNsb3NlKCBldmVudCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxyXG5cdCAqIGdsb2JhbCBvbk9wZW4gY2FsbGJhY2ssIGlmIGRlZmluZWQuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGV2ZW50T25PcGVuKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcclxuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXHJcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxyXG5cdFx0fTtcclxuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbk9wZW4gKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuLmVtaXQoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5nbG9iYWxPbk9wZW4gKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsT25PcGVuKCBldmVudCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxyXG5cdCAqIGdsb2JhbCBvblJlYWR5IGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBldmVudE9uUmVhZHkoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xyXG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcclxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXHJcblx0XHR9O1xyXG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uUmVhZHkgKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeS5lbWl0KCBldmVudCApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25SZWFkeSApIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxPblJlYWR5KCBldmVudCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XHJcblx0ICogZG9lc24ndCBleGlzdC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZ2V0T3B0aW9uKCBvcHRpb246IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55ICk6IGFueSB7XHJcblx0XHRsZXQgbG9jYWxOYW1lID0gJ2ZsYXRwaWNrcicgKyBvcHRpb24uc3Vic3RyaW5nKCAwLCAxICkudG9VcHBlckNhc2UoKVxyXG5cdFx0XHQrIG9wdGlvbi5zdWJzdHJpbmcoIDEgKTtcclxuXHJcblx0XHRpZiAoIHR5cGVvZiB0aGlzW2xvY2FsTmFtZV0gIT09ICd1bmRlZmluZWQnICkge1xyXG5cdFx0XHRyZXR1cm4gdGhpc1tsb2NhbE5hbWVdO1xyXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dICE9PSAndW5kZWZpbmVkJyApIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19