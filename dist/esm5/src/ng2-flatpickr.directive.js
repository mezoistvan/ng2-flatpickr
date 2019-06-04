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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFDbkMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFlLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFO0lBMlJDLCtCQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELHVDQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsc0JBQUksMENBQU87YUFBWDtZQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENB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RTs7cUVBQW1DO0lBUWpDO1FBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7O3NFQUFxQztJQU9yQztRQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFOzBDQUE0QixRQUFRO3FFQUFDO0lBT3BDO1FBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7O3FFQUFtQztJQU90QjtRQUFqQyxLQUFLLENBQUUsdUJBQXVCLENBQUU7O2lGQUFnRDtJQVE5RDtRQUFsQixLQUFLLENBQUUsUUFBUSxDQUFFOztrRUFBaUM7SUFPN0I7UUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTs7cUVBQW9DO0lBRXpDO1FBQWYsS0FBSyxDQUFFLEtBQUssQ0FBRTs7K0RBQThCO0lBT3JCO1FBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7O3VFQUFzQztJQU81QztRQUFoQixLQUFLLENBQUUsTUFBTSxDQUFFOztnRUFBK0I7SUFPekI7UUFBckIsTUFBTSxDQUFFLFVBQVUsQ0FBRTswQ0FBMkIsWUFBWTtvRUFBc0M7SUFPN0U7UUFBcEIsTUFBTSxDQUFFLFNBQVMsQ0FBRTswQ0FBMEIsWUFBWTttRUFBc0M7SUFPNUU7UUFBbkIsTUFBTSxDQUFFLFFBQVEsQ0FBRTswQ0FBeUIsWUFBWTtrRUFBc0M7SUFPekU7UUFBcEIsTUFBTSxDQUFFLFNBQVMsQ0FBRTswQ0FBMEIsWUFBWTttRUFBc0M7SUFJaEc7UUFEQyxZQUFZLENBQUUsVUFBVSxDQUFFOzs7O3dEQUcxQjtJQTlRVyxxQkFBcUI7UUFEakMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUM7aURBNlI5QyxnQkFBZ0I7WUFDYixTQUFTO1lBQ1gsVUFBVTtZQUNULFFBQVE7T0EvUmpCLHFCQUFxQixDQTZlakM7SUFBRCw0QkFBQztDQUFBLEFBN2VELElBNmVDO1NBN2VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuXHRPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlciwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbnRhaW5lciwgRm9ybUNvbnRyb2wsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyRXZlbnQgfSBmcm9tICcuL2ZsYXRwaWNrci1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tySW5zdGFuY2UgfSBmcm9tICcuL2ZsYXRwaWNrci1pbnN0YW5jZSc7XG5pbXBvcnQgeyBGbGF0cGlja3JPcHRpb25zIH0gZnJvbSAnLi9mbGF0cGlja3Itb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbZmxhdHBpY2tyXScsIGV4cG9ydEFzOiAnbmcyLWZsYXRwaWNrcicgfSlcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT25DaGFuZ2VzIHtcblx0LyoqXG5cdCAqIFRoZSBmbGF0cGlja3IgY29uZmlndXJhdGlvbiBhcyBhIHNpbmdsZSBvYmplY3Qgb2YgdmFsdWVzLlxuXHQgKlxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL29wdGlvbnMvIGZvciBmdWxsIGxpc3QuXG5cdCAqL1xuXHRASW5wdXQoICdmbGF0cGlja3InICkgcHVibGljIGZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnM7XG5cblx0LyoqXG5cdCAqIFBsYWNlaG9sZGVyIGZvciBpbnB1dCBmaWVsZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ3BsYWNlaG9sZGVyJyApIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBFeGFjdGx5IHRoZSBzYW1lIGFzIGRhdGUgZm9ybWF0LCBidXQgZm9yIHRoZSBhbHRJbnB1dCBmaWVsZC5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiRiBqLCBZXCJcblx0ICovXG5cdEBJbnB1dCggJ2FsdEZvcm1hdCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0Rm9ybWF0OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNob3cgdGhlIHVzZXIgYSByZWFkYWJsZSBkYXRlIChhcyBwZXIgYWx0Rm9ybWF0KSwgYnV0IHJldHVybiBzb21ldGhpbmdcblx0ICogdG90YWxseSBkaWZmZXJlbnQgdG8gdGhlIHNlcnZlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdhbHRJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoaXMgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5wdXQgZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBhbHRJbnB1dFxuXHQgKiBvcHRpb24uXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlwiXG5cdCAqL1xuXHRASW5wdXQoICdhbHRJbnB1dENsYXNzJyApIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dENsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0aGUgdXNlciB0byBlbnRlciBhIGRhdGUgZGlyZWN0bHkgaW5wdXQgdGhlIGlucHV0IGZpZWxkLiBCeVxuXHQgKiBkZWZhdWx0LCBkaXJlY3QgZW50cnkgaXMgZGlzYWJsZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnYWxsb3dJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWxsb3dJbnB1dDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSW5zdGVhZCBvZiBib2R5LCBhcHBlbmRzIHRoZSBjYWxlbmRhciB0byB0aGUgc3BlY2lmaWVkIG5vZGUgaW5zdGVhZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2FwcGVuZFRvJyApIHB1YmxpYyBmbGF0cGlja3JBcHBlbmRUbzogSFRNTEVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgY2xpY2tpbmcgb24gdGhlIGlucHV0IHNob3VsZCBvcGVuIHRoZSBwaWNrZXIuXG5cdCAqIFlvdSBjb3VsZCBkaXNhYmxlIHRoaXMgaWYgeW91IHdpc2ggdG8gb3BlbiB0aGUgY2FsZW5kYXIgbWFudWFsbHlcblx0ICogd2l0aC5vcGVuKCkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICB0cnVlXG5cdCAqL1xuXHRASW5wdXQoICdjbGlja09wZW5zJyApIHB1YmxpYyBmbGF0cGlja3JDbGlja09wZW5zOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBIHN0cmluZyBvZiBjaGFyYWN0ZXJzIHdoaWNoIGFyZSB1c2VkIHRvIGRlZmluZSBob3cgdGhlIGRhdGUgd2lsbCBiZVxuXHQgKiBkaXNwbGF5ZWQgaW4gdGhlIGlucHV0IGJveC5cblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9mb3JtYXR0aW5nLyBmb3Igc3VwcG9ydGVkIHRva2Vucy5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiWS1tLWRcIlxuXHQgKi9cblx0QElucHV0KCAnZGF0ZUZvcm1hdCcgKSBwdWJsaWMgZmxhdHBpY2tyRGF0ZUZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBpbml0aWFsIHNlbGVjdGVkIGRhdGUocykuXG5cdCAqXG5cdCAqIElmIHlvdSdyZSB1c2luZyB7bW9kZTogXCJtdWx0aXBsZVwifSBvciBhIHJhbmdlIGNhbGVuZGFyIHN1cHBseSBhbiBBcnJheSBvZlxuXHQgKiBEYXRlIG9iamVjdHMgb3IgYW4gQXJyYXkgb2YgZGF0ZSBzdHJpbmdzIHdoaWNoIGZvbGxvdyB5b3VyIGRhdGVGb3JtYXQuXG5cdCAqXG5cdCAqIE90aGVyd2lzZSwgeW91IGNhbiBzdXBwbHkgYSBzaW5nbGUgRGF0ZSBvYmplY3Qgb3IgYSBkYXRlIHN0cmluZy5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2RlZmF1bHREYXRlJyApIHB1YmxpYyBmbGF0cGlja3JEZWZhdWx0RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogRGlzYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBkaXNhYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctc3BlY2lmaWMtZGF0ZXNcblx0ICpcblx0ICogRGVmYXVsdDogIFtdXG5cdCAqL1xuXHRASW5wdXQoICdkaXNhYmxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcblxuXHQvKipcblx0ICogU2V0IGRpc2FibGVNb2JpbGUgdG8gdHJ1ZSB0byBhbHdheXMgdXNlIHRoZSBub24tbmF0aXZlIHBpY2tlci4gQnlcblx0ICogZGVmYXVsdCwgRmxhdHBpY2tyIHV0aWxpemVzIG5hdGl2ZSBkYXRldGltZSB3aWRnZXRzIHVubGVzcyBjZXJ0YWluXG5cdCAqIG9wdGlvbnMgKGUuZy4gZGlzYWJsZSkgYXJlIHVzZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZGlzYWJsZU1vYmlsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZU1vYmlsZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGVuYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLWFsbC1kYXRlcy1leGNlcHQtc2VsZWN0LWZld1xuXHQgKlxuXHQgKiBEZWZhdWx0OiAgW11cblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcblxuXHQvKipcblx0ICogRW5hYmxlcyB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGVUaW1lJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVUaW1lOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIHNlY29uZHMgaW4gdGhlIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZVNlY29uZHMnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVNlY29uZHM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBob3VyIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgMVxuXHQgKi9cblx0QElucHV0KCAnaG91ckluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tySG91ckluY3JlbWVudDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aGUgY2FsZW5kYXIgaW5saW5lLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2lubGluZScgKSBwdWJsaWMgZmxhdHBpY2tySW5saW5lOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBVc2UgYSBzcGVjaWZpYyBsb2NhbGUgZm9yIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdsb2NhbGUnICkgcHVibGljIGZsYXRwaWNrckxvY2FsZTogT2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBwaWNrIHRvIChpbmNsdXNpdmUpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbWF4RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWF4RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gc3RhcnQgcGlja2luZyBmcm9tIChpbmNsdXNpdmUpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbWluRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWluRGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIG1pbnV0ZSBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIDVcblx0ICovXG5cdEBJbnB1dCggJ21pbnV0ZUluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tyTWludXRlSW5jcmVtZW50OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiwgb3IgXCJyYW5nZVwiXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcInNpbmdsZVwiXG5cdCAqL1xuXHRASW5wdXQoICdtb2RlJyApIHB1YmxpYyBmbGF0cGlja3JNb2RlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhUTUwgZm9yIHRoZSBhcnJvdyBpY29uLCB1c2VkIHRvIHN3aXRjaCBtb250aHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIj5cIlxuXHQgKi9cblx0QElucHV0KCAnbmV4dEFycm93JyApIHB1YmxpYyBmbGF0cGlja3JOZXh0QXJyb3c6IHN0cmluZztcblxuXHQvKipcblx0ICogSGlkZXMgdGhlIGRheSBzZWxlY3Rpb24gaW4gY2FsZW5kYXIuIFVzZSBpdCBhbG9uZyB3aXRoIGVuYWJsZVRpbWUgdG9cblx0ICogY3JlYXRlIGEgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnbm9DYWxlbmRhcicgKSBwdWJsaWMgZmxhdHBpY2tyTm9DYWxlbmRhcjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRnVuY3Rpb24gdGhhdCBleHBlY3RzIGEgZGF0ZSBzdHJpbmcgYW5kIG11c3QgcmV0dXJuIGEgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAncGFyc2VEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JQYXJzZURhdGU6IEZ1bmN0aW9uO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgbGVmdCBhcnJvdyBpY29uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI8XCJcblx0ICovXG5cdEBJbnB1dCggJ3ByZXZBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyUHJldkFycm93OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNob3cgdGhlIG1vbnRoIHVzaW5nIHRoZSBzaG9ydGhhbmQgdmVyc2lvbiAoaWUsIFNlcCBpbnN0ZWFkIG9mIFNlcHRlbWJlcikuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnc2hvcnRoYW5kQ3VycmVudE1vbnRoJyApIHB1YmxpYyBmbGF0cGlja3JTaG9ydGhhbmRDdXJyZW50TW9udGg6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFBvc2l0aW9uIHRoZSBjYWxlbmRhciBpbnNpZGUgdGhlIHdyYXBwZXIgYW5kIG5leHQgdG8gdGhlIGlucHV0IGVsZW1lbnRcblx0ICogKExlYXZlIGZhbHNlIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnc3RhdGljJyApIHB1YmxpYyBmbGF0cGlja3JTdGF0aWM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIERpc3BsYXlzIHRpbWUgcGlja2VyIGluIDI0IGhvdXIgbW9kZSB3aXRob3V0IEFNL1BNIHNlbGVjdGlvbiB3aGVuIGVuYWJsZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAndGltZV8yNGhyJyApIHB1YmxpYyBmbGF0cGlja3JUaW1lXzI0aHI6IGJvb2xlYW47XG5cblx0QElucHV0KCAndXRjJyApIHB1YmxpYyBmbGF0cGlja3JVdGM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgZGlzcGxheSBvZiB3ZWVrIG51bWJlcnMgaW4gY2FsZW5kYXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnd2Vla051bWJlcnMnICkgcHVibGljIGZsYXRwaWNrcldlZWtOdW1iZXJzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDdXN0b20gZWxlbWVudHMgYW5kIGlucHV0IGdyb3Vwcy5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd3cmFwJyApIHB1YmxpYyBmbGF0cGlja3JXcmFwOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBvbkNoYW5nZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlLCBvciBjaGFuZ2VzIHRoZSB0aW1lIG9uIGEgc2VsZWN0ZWQgZGF0ZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbkNoYW5nZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uQ2xvc2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uQ2xvc2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uT3BlbiBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25PcGVuJyApIHB1YmxpYyBmbGF0cGlja3JPbk9wZW46IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uUmVhZHkgZ2V0cyB0cmlnZ2VyZWQgb25jZSB0aGUgY2FsZW5kYXIgaXMgaW4gYSByZWFkeSBzdGF0ZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvblJlYWR5JyApIHB1YmxpYyBmbGF0cGlja3JPblJlYWR5OiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKiBBbGxvdyBkb3VibGUtY2xpY2tpbmcgb24gdGhlIGNvbnRyb2wgdG8gb3Blbi9jbG9zZSBpdC4gKi9cblx0QEhvc3RMaXN0ZW5lciggJ2RibGNsaWNrJyApXG5cdHB1YmxpYyBvbkNsaWNrKCkge1xuXHRcdHRoaXMuZmxhdHBpY2tyLnRvZ2dsZSgpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2xvc2U6IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25PcGVuOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uUmVhZHk6IEZ1bmN0aW9uO1xuXG5cdHByb3RlY3RlZCBmbGF0cGlja3I6IEZsYXRwaWNrckluc3RhbmNlO1xuXHRwcm90ZWN0ZWQgZm9ybUNvbnRyb2xMaXN0ZW5lcjogU3Vic2NyaXB0aW9uO1xuXG5cdC8qKiBBbGxvdyBhY2Nlc3MgcHJvcGVydGllcyB1c2luZyBpbmRleCBub3RhdGlvbiAqL1xuXHRba2V5OnN0cmluZ106IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcm90ZWN0ZWQgcGFyZW50OiBDb250cm9sQ29udGFpbmVyLFxuXHRcdHByb3RlY3RlZCBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcblx0XHRwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcblx0XHRwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyXG5cdCkge31cblxuXHRnZXQgY29udHJvbCgpOiBGb3JtQ29udHJvbCB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZS5nZXRDb250cm9sKHRoaXMubmdDb250cm9sKSA6IG51bGw7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxuXHRcdFx0cmFuZG9taXplIHRoZSBkYXRlIHdoZW4gdGhlIGZvcm0gY29udHJvbCBpbml0aWFsaXplcy4gKi9cblx0XHRsZXQgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHR5cGVvZiBuYXRpdmVFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBuYXRpdmVFbGVtZW50ID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyAnRXJyb3I6IGludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWQnO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9wdGlvbnMud3JhcCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2RhdGEtaW5wdXQnLCAnJyApO1xuXHRcdFx0bmF0aXZlRWxlbWVudCA9IG5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHR0aGlzLmZsYXRwaWNrciA9IDxGbGF0cGlja3JJbnN0YW5jZT5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciggdGhpcy5mbGF0cGlja3JPcHRpb25zICk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyggY2hhbmdlczogU2ltcGxlQ2hhbmdlcyApIHtcblx0XHRpZiggdGhpcy5mbGF0cGlja3Jcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyQWx0SW5wdXRcblx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdwbGFjZWhvbGRlcicgKSBcblx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XG5cdFx0XHRcdHRoaXMuZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xuXHRcdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrci5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4gPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5ID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNoYW5nZTtcblx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DbG9zZTtcblx0XHR0aGlzLmdsb2JhbE9uT3BlbiA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbk9wZW47XG5cdFx0dGhpcy5nbG9iYWxPblJlYWR5ID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uUmVhZHk7XG5cblx0XHR0aGlzLmZsYXRwaWNrck9wdGlvbnMgPSB7XG5cdFx0XHRhbHRGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRGb3JtYXQnKSxcblx0XHRcdGFsdElucHV0OiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXQnKSxcblx0XHRcdGFsdElucHV0Q2xhc3M6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dENsYXNzJyksXG5cdFx0XHRhbGxvd0lucHV0OiB0aGlzLmdldE9wdGlvbignYWxsb3dJbnB1dCcpLFxuXHRcdFx0YXBwZW5kVG86IHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpLFxuXHRcdFx0Y2xpY2tPcGVuczogdGhpcy5nZXRPcHRpb24oJ2NsaWNrT3BlbnMnLCB0cnVlKSxcblx0XHRcdGRhdGVGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdkYXRlRm9ybWF0JyksXG5cdFx0XHRkZWZhdWx0RGF0ZTogdGhpcy5nZXRPcHRpb24oJ2RlZmF1bHREYXRlJyksXG5cdFx0XHRkaXNhYmxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZScpLFxuXHRcdFx0ZGlzYWJsZU1vYmlsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGVNb2JpbGUnKSxcblx0XHRcdGVuYWJsZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZScpLFxuXHRcdFx0ZW5hYmxlVGltZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVRpbWUnKSxcblx0XHRcdGVuYWJsZVNlY29uZHM6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVTZWNvbmRzJyksXG5cdFx0XHRob3VySW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignaG91ckluY3JlbWVudCcpLFxuXHRcdFx0aW5saW5lOiB0aGlzLmdldE9wdGlvbignaW5saW5lJyksXG5cdFx0XHRsb2NhbGU6IHRoaXMuZ2V0T3B0aW9uKCdsb2NhbGUnKSxcblx0XHRcdG1heERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtYXhEYXRlJyksXG5cdFx0XHRtaW5EYXRlOiB0aGlzLmdldE9wdGlvbignbWluRGF0ZScpLFxuXHRcdFx0bWludXRlSW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignbWludXRlSW5jcmVtZW50JyksXG5cdFx0XHRtb2RlOiB0aGlzLmdldE9wdGlvbignbW9kZScpLFxuXHRcdFx0bmV4dEFycm93OiB0aGlzLmdldE9wdGlvbignbmV4dEFycm93JyksXG5cdFx0XHRub0NhbGVuZGFyOiB0aGlzLmdldE9wdGlvbignbm9DYWxlbmRhcicpLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuZXZlbnRPbkNoYW5nZSxcblx0XHRcdG9uQ2xvc2U6IHRoaXMuZXZlbnRPbkNsb3NlLFxuXHRcdFx0b25PcGVuOiB0aGlzLmV2ZW50T25PcGVuLFxuXHRcdFx0b25SZWFkeTogdGhpcy5ldmVudE9uUmVhZHksXG5cdFx0XHRwYXJzZURhdGU6IHRoaXMuZ2V0T3B0aW9uKCdwYXJzZURhdGUnKSxcblx0XHRcdHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXG5cdFx0XHRzdGF0aWM6IHRoaXMuZ2V0T3B0aW9uKCdzdGF0aWMnKSxcblx0XHRcdHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXG5cdFx0XHR3ZWVrTnVtYmVyczogdGhpcy5nZXRPcHRpb24oJ3dlZWtOdW1iZXJzJyksXG5cdFx0XHR3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxuXHRcdH07XG5cblx0XHQvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xuXHRcdE9iamVjdC5rZXlzKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKS5mb3JFYWNoKCAoIGtleTogc3RyaW5nICkgPT4ge1xuXHRcdFx0KHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpICYmXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XTtcblx0XHR9ICk7XG5cblx0XHRpZiAodGhpcy5jb250cm9sKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXG5cdFx0XHRcdC5zdWJzY3JpYmUoICggdmFsdWU6IGFueSApID0+IHtcblx0XHRcdFx0XHRpZiAoICEoIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSApICkge1xuXHRcdFx0XHRcdFx0Ly8gUXVpZXRseSB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgdG8gYmUgYVxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSBvYmplY3QuIFRoaXMgYXZvaWRzIGFueSBleHRlcm5hbCBzdWJzY3JpYmVyc1xuXHRcdFx0XHRcdFx0Ly8gZnJvbSBiZWluZyBub3RpZmllZCBhIHNlY29uZCB0aW1lIChvbmNlIGZvciB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8gaW5pdGlhdGVkIGV2ZW50LCBhbmQgb25jZSBmb3Igb3VyIGNvbnZlcnNpb24gdG9cblx0XHRcdFx0XHRcdC8vIERhdGUoKSkuXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRyb2wuc2V0VmFsdWUoIG5ldyBEYXRlKCAnJyArIHZhbHVlICksIHtcblx0XHRcdFx0XHRcdFx0b25seVNlbGY6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGVtaXRFdmVudDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2Vcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2xvc2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DbG9zZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DbG9zZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25PcGVuKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uT3BlbiggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uUmVhZHkoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25SZWFkeSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25SZWFkeSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XG5cdCAqIGRvZXNuJ3QgZXhpc3QuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZ2V0T3B0aW9uKCBvcHRpb246IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55ICk6IGFueSB7XG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZyggMCwgMSApLnRvVXBwZXJDYXNlKClcblx0XHRcdCsgb3B0aW9uLnN1YnN0cmluZyggMSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgdGhpc1tsb2NhbE5hbWVdICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzW2xvY2FsTmFtZV07XG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==