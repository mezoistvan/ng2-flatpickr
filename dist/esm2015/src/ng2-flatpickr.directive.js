import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
let Ng2FlatpickrDirective = class Ng2FlatpickrDirective {
    constructor(parent, ngControl, element, renderer) {
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
    onClick() {
        this.flatpickr.toggle();
    }
    get control() {
        return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
    }
    ngAfterViewInit() {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        let nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setElementAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    }
    ngOnChanges(changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    }
    ngOnDestroy() {
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
    }
    ngOnInit() {
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
        Object.keys(this.flatpickrOptions).forEach((key) => {
            (this.flatpickrOptions[key] === undefined) &&
                delete this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe((value) => {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    eventOnChange(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    eventOnClose(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    eventOnOpen(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    eventOnReady(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    getOption(option, defaultValue) {
        let localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
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
    tslib_1.__metadata("design:type", Object)
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
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFDbkMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFlLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBMlJqQyxZQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMs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cUM7QUFPckM7SUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtzQ0FBNEIsUUFBUTtpRUFBQztBQU9wQztJQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFOztpRUFBbUM7QUFPdEI7SUFBakMsS0FBSyxDQUFFLHVCQUF1QixDQUFFOzs2RUFBZ0Q7QUFROUQ7SUFBbEIsS0FBSyxDQUFFLFFBQVEsQ0FBRTs7OERBQWlDO0FBTzdCO0lBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7O2lFQUFvQztBQUV6QztJQUFmLEtBQUssQ0FBRSxLQUFLLENBQUU7OzJEQUE4QjtBQU9yQjtJQUF2QixLQUFLLENBQUUsYUFBYSxDQUFFOzttRUFBc0M7QUFPNUM7SUFBaEIsS0FBSyxDQUFFLE1BQU0sQ0FBRTs7NERBQStCO0FBT3pCO0lBQXJCLE1BQU0sQ0FBRSxVQUFVLENBQUU7c0NBQTJCLFlBQVk7Z0VBQXNDO0FBTzdFO0lBQXBCLE1BQU0sQ0FBRSxTQUFTLENBQUU7c0NBQTBCLFlBQVk7K0RBQXNDO0FBTzVFO0lBQW5CLE1BQU0sQ0FBRSxRQUFRLENBQUU7c0NBQXlCLFlBQVk7OERBQXNDO0FBT3pFO0lBQXBCLE1BQU0sQ0FBRSxTQUFTLENBQUU7c0NBQTBCLFlBQVk7K0RBQXNDO0FBSWhHO0lBREMsWUFBWSxDQUFFLFVBQVUsQ0FBRTs7OztvREFHMUI7QUE5UVcscUJBQXFCO0lBRGpDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDOzZDQTZSOUMsZ0JBQWdCO1FBQ2IsU0FBUztRQUNYLFVBQVU7UUFDVCxRQUFRO0dBL1JqQixxQkFBcUIsQ0E2ZWpDO1NBN2VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXHJcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmxhdHBpY2tyRXZlbnQgfSBmcm9tICcuL2ZsYXRwaWNrci1ldmVudC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGbGF0cGlja3JJbnN0YW5jZSB9IGZyb20gJy4vZmxhdHBpY2tyLWluc3RhbmNlJztcclxuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tmbGF0cGlja3JdJywgZXhwb3J0QXM6ICduZzItZmxhdHBpY2tyJyB9KVxyXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcblx0LyoqXHJcblx0ICogVGhlIGZsYXRwaWNrciBjb25maWd1cmF0aW9uIGFzIGEgc2luZ2xlIG9iamVjdCBvZiB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL29wdGlvbnMvIGZvciBmdWxsIGxpc3QuXHJcblx0ICovXHJcblx0QElucHV0KCAnZmxhdHBpY2tyJyApIHB1YmxpYyBmbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zO1xyXG5cclxuXHQvKipcclxuXHQgKiBQbGFjZWhvbGRlciBmb3IgaW5wdXQgZmllbGQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3BsYWNlaG9sZGVyJyApIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGFjdGx5IHRoZSBzYW1lIGFzIGRhdGUgZm9ybWF0LCBidXQgZm9yIHRoZSBhbHRJbnB1dCBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXHJcblx0ICovXHJcblx0QElucHV0KCAnYWx0Rm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRGb3JtYXQ6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogU2hvdyB0aGUgdXNlciBhIHJlYWRhYmxlIGRhdGUgKGFzIHBlciBhbHRGb3JtYXQpLCBidXQgcmV0dXJuIHNvbWV0aGluZ1xyXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdhbHRJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXQ6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoaXMgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5wdXQgZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBhbHRJbnB1dFxyXG5cdCAqIG9wdGlvbi5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIlwiXHJcblx0ICovXHJcblx0QElucHV0KCAnYWx0SW5wdXRDbGFzcycgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcclxuXHQgKiBkZWZhdWx0LCBkaXJlY3QgZW50cnkgaXMgZGlzYWJsZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdhbGxvd0lucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbGxvd0lucHV0OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnN0ZWFkIG9mIGJvZHksIGFwcGVuZHMgdGhlIGNhbGVuZGFyIHRvIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnN0ZWFkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdhcHBlbmRUbycgKSBwdWJsaWMgZmxhdHBpY2tyQXBwZW5kVG86IGFueTsgLy8gSFRNTEVsZW1lbnRcclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciBjbGlja2luZyBvbiB0aGUgaW5wdXQgc2hvdWxkIG9wZW4gdGhlIHBpY2tlci5cclxuXHQgKiBZb3UgY291bGQgZGlzYWJsZSB0aGlzIGlmIHlvdSB3aXNoIHRvIG9wZW4gdGhlIGNhbGVuZGFyIG1hbnVhbGx5XHJcblx0ICogd2l0aC5vcGVuKCkuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgdHJ1ZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2NsaWNrT3BlbnMnICkgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXHJcblx0ICogZGlzcGxheWVkIGluIHRoZSBpbnB1dCBib3guXHJcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9mb3JtYXR0aW5nLyBmb3Igc3VwcG9ydGVkIHRva2Vucy5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIlktbS1kXCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdkYXRlRm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JEYXRlRm9ybWF0OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGluaXRpYWwgc2VsZWN0ZWQgZGF0ZShzKS5cclxuXHQgKlxyXG5cdCAqIElmIHlvdSdyZSB1c2luZyB7bW9kZTogXCJtdWx0aXBsZVwifSBvciBhIHJhbmdlIGNhbGVuZGFyIHN1cHBseSBhbiBBcnJheSBvZlxyXG5cdCAqIERhdGUgb2JqZWN0cyBvciBhbiBBcnJheSBvZiBkYXRlIHN0cmluZ3Mgd2hpY2ggZm9sbG93IHlvdXIgZGF0ZUZvcm1hdC5cclxuXHQgKlxyXG5cdCAqIE90aGVyd2lzZSwgeW91IGNhbiBzdXBwbHkgYSBzaW5nbGUgRGF0ZSBvYmplY3Qgb3IgYSBkYXRlIHN0cmluZy5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnZGVmYXVsdERhdGUnICkgcHVibGljIGZsYXRwaWNrckRlZmF1bHREYXRlOiBzdHJpbmcgfCBEYXRlO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNhYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGRpc2FibGVcclxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLXNwZWNpZmljLWRhdGVzXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgW11cclxuXHQgKi9cclxuXHRASW5wdXQoICdkaXNhYmxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGRpc2FibGVNb2JpbGUgdG8gdHJ1ZSB0byBhbHdheXMgdXNlIHRoZSBub24tbmF0aXZlIHBpY2tlci4gQnlcclxuXHQgKiBkZWZhdWx0LCBGbGF0cGlja3IgdXRpbGl6ZXMgbmF0aXZlIGRhdGV0aW1lIHdpZGdldHMgdW5sZXNzIGNlcnRhaW5cclxuXHQgKiBvcHRpb25zIChlLmcuIGRpc2FibGUpIGFyZSB1c2VkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnZGlzYWJsZU1vYmlsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZU1vYmlsZTogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGVuYWJsZVxyXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctYWxsLWRhdGVzLWV4Y2VwdC1zZWxlY3QtZmV3XHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgW11cclxuXHQgKi9cclxuXHRASW5wdXQoICdlbmFibGUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZTogc3RyaW5nW10gfCBEYXRlW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZXMgdGltZSBwaWNrZXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdlbmFibGVUaW1lJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVUaW1lOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzIHNlY29uZHMgaW4gdGhlIHRpbWUgcGlja2VyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnZW5hYmxlU2Vjb25kcycgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlU2Vjb25kczogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIGhvdXIgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgMVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2hvdXJJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrckhvdXJJbmNyZW1lbnQ6IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGxheXMgdGhlIGNhbGVuZGFyIGlubGluZS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2lubGluZScgKSBwdWJsaWMgZmxhdHBpY2tySW5saW5lOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBVc2UgYSBzcGVjaWZpYyBsb2NhbGUgZm9yIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2xvY2FsZScgKSBwdWJsaWMgZmxhdHBpY2tyTG9jYWxlOiBPYmplY3Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHBpY2sgdG8gKGluY2x1c2l2ZSkuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ21heERhdGUnICkgcHVibGljIGZsYXRwaWNrck1heERhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHN0YXJ0IHBpY2tpbmcgZnJvbSAoaW5jbHVzaXZlKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnbWluRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWluRGF0ZTogc3RyaW5nIHwgRGF0ZTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIG1pbnV0ZSBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICA1XHJcblx0ICovXHJcblx0QElucHV0KCAnbWludXRlSW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JNaW51dGVJbmNyZW1lbnQ6IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogXCJzaW5nbGVcIiwgXCJtdWx0aXBsZVwiLCBvciBcInJhbmdlXCJcclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcInNpbmdsZVwiXHJcblx0ICovXHJcblx0QElucHV0KCAnbW9kZScgKSBwdWJsaWMgZmxhdHBpY2tyTW9kZTogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBIVE1MIGZvciB0aGUgYXJyb3cgaWNvbiwgdXNlZCB0byBzd2l0Y2ggbW9udGhzLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwiPlwiXHJcblx0ICovXHJcblx0QElucHV0KCAnbmV4dEFycm93JyApIHB1YmxpYyBmbGF0cGlja3JOZXh0QXJyb3c6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGRheSBzZWxlY3Rpb24gaW4gY2FsZW5kYXIuIFVzZSBpdCBhbG9uZyB3aXRoIGVuYWJsZVRpbWUgdG9cclxuXHQgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ25vQ2FsZW5kYXInICkgcHVibGljIGZsYXRwaWNrck5vQ2FsZW5kYXI6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRoYXQgZXhwZWN0cyBhIGRhdGUgc3RyaW5nIGFuZCBtdXN0IHJldHVybiBhIERhdGUgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAncGFyc2VEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JQYXJzZURhdGU6IEZ1bmN0aW9uO1xyXG5cclxuXHQvKipcclxuXHQgKiBIVE1MIGZvciB0aGUgbGVmdCBhcnJvdyBpY29uLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwiPFwiXHJcblx0ICovXHJcblx0QElucHV0KCAncHJldkFycm93JyApIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcgKSBwdWJsaWMgZmxhdHBpY2tyU2hvcnRoYW5kQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBQb3NpdGlvbiB0aGUgY2FsZW5kYXIgaW5zaWRlIHRoZSB3cmFwcGVyIGFuZCBuZXh0IHRvIHRoZSBpbnB1dCBlbGVtZW50XHJcblx0ICogKExlYXZlIGZhbHNlIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZykuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdzdGF0aWMnICkgcHVibGljIGZsYXRwaWNrclN0YXRpYzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGxheXMgdGltZSBwaWNrZXIgaW4gMjQgaG91ciBtb2RlIHdpdGhvdXQgQU0vUE0gc2VsZWN0aW9uIHdoZW4gZW5hYmxlZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3RpbWVfMjRocicgKSBwdWJsaWMgZmxhdHBpY2tyVGltZV8yNGhyOiBib29sZWFuO1xyXG5cclxuXHRASW5wdXQoICd1dGMnICkgcHVibGljIGZsYXRwaWNrclV0YzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyBkaXNwbGF5IG9mIHdlZWsgbnVtYmVycyBpbiBjYWxlbmRhci5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3dlZWtOdW1iZXJzJyApIHB1YmxpYyBmbGF0cGlja3JXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogQ3VzdG9tIGVsZW1lbnRzIGFuZCBpbnB1dCBncm91cHMuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICd3cmFwJyApIHB1YmxpYyBmbGF0cGlja3JXcmFwOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBvbkNoYW5nZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlLCBvciBjaGFuZ2VzIHRoZSB0aW1lIG9uIGEgc2VsZWN0ZWQgZGF0ZS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QE91dHB1dCggJ29uQ2hhbmdlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNoYW5nZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0LyoqXHJcblx0ICogb25DbG9zZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBjbG9zZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBPdXRwdXQoICdvbkNsb3NlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNsb3NlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHQvKipcclxuXHQgKiBvbk9wZW4gZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRAT3V0cHV0KCAnb25PcGVuJyApIHB1YmxpYyBmbGF0cGlja3JPbk9wZW46IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIG9uUmVhZHkgZ2V0cyB0cmlnZ2VyZWQgb25jZSB0aGUgY2FsZW5kYXIgaXMgaW4gYSByZWFkeSBzdGF0ZS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QE91dHB1dCggJ29uUmVhZHknICkgcHVibGljIGZsYXRwaWNrck9uUmVhZHk6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdC8qKiBBbGxvdyBkb3VibGUtY2xpY2tpbmcgb24gdGhlIGNvbnRyb2wgdG8gb3Blbi9jbG9zZSBpdC4gKi9cclxuXHRASG9zdExpc3RlbmVyKCAnZGJsY2xpY2snIClcclxuXHRwdWJsaWMgb25DbGljaygpIHtcclxuXHRcdHRoaXMuZmxhdHBpY2tyLnRvZ2dsZSgpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2hhbmdlOiBGdW5jdGlvbjtcclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DbG9zZTogRnVuY3Rpb247XHJcblx0cHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb247XHJcblx0cHJvdGVjdGVkIGdsb2JhbE9uUmVhZHk6IEZ1bmN0aW9uO1xyXG5cclxuXHRwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZTtcclxuXHRwcm90ZWN0ZWQgZm9ybUNvbnRyb2xMaXN0ZW5lcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHQvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cclxuXHRba2V5OnN0cmluZ106IGFueTtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcm90ZWN0ZWQgcGFyZW50OiBDb250cm9sQ29udGFpbmVyLFxyXG5cdFx0cHJvdGVjdGVkIG5nQ29udHJvbDogTmdDb250cm9sLFxyXG5cdFx0cHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcblx0XHRwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyXHJcblx0KSB7fVxyXG5cclxuXHRnZXQgY29udHJvbCgpOiBGb3JtQ29udHJvbCB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5mb3JtRGlyZWN0aXZlLmdldENvbnRyb2wodGhpcy5uZ0NvbnRyb2wpIDogbnVsbDtcclxuXHR9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdC8qKiBXZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZmxhdHBpY2tyIGluc3RhbmNlIGluIG5nT25Jbml0KCk7IGl0IHdpbGxcclxuXHRcdFx0cmFuZG9taXplIHRoZSBkYXRlIHdoZW4gdGhlIGZvcm0gY29udHJvbCBpbml0aWFsaXplcy4gKi9cclxuXHRcdGxldCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBuYXRpdmVFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBuYXRpdmVFbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93ICdFcnJvcjogaW52YWxpZCBpbnB1dCBlbGVtZW50IHNwZWNpZmllZCc7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyT3B0aW9ucy53cmFwKSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYXRhLWlucHV0JywgJycgKTtcclxuXHRcdFx0bmF0aXZlRWxlbWVudCA9IG5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZsYXRwaWNrciA9IDxGbGF0cGlja3JJbnN0YW5jZT5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciggdGhpcy5mbGF0cGlja3JPcHRpb25zICk7XHJcblx0fVxyXG5cclxuXHRuZ09uQ2hhbmdlcyggY2hhbmdlczogU2ltcGxlQ2hhbmdlcyApIHtcclxuXHRcdGlmKCB0aGlzLmZsYXRwaWNrclxyXG5cdFx0XHQmJiB0aGlzLmZsYXRwaWNrckFsdElucHV0XHJcblx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdwbGFjZWhvbGRlcicgKSBcclxuXHRcdFx0JiYgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApIHtcclxuXHRcdFx0XHR0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcclxuXHRcdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHRpZiAodGhpcy5mbGF0cGlja3IpIHtcclxuXHRcdFx0dGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XHJcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lciA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4gPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkgPSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2U7XHJcblx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DbG9zZTtcclxuXHRcdHRoaXMuZ2xvYmFsT25PcGVuID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uT3BlbjtcclxuXHRcdHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5O1xyXG5cclxuXHRcdHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA9IHtcclxuXHRcdFx0YWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXHJcblx0XHRcdGFsdElucHV0OiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXQnKSxcclxuXHRcdFx0YWx0SW5wdXRDbGFzczogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0Q2xhc3MnKSxcclxuXHRcdFx0YWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcclxuXHRcdFx0YXBwZW5kVG86IHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpLFxyXG5cdFx0XHRjbGlja09wZW5zOiB0aGlzLmdldE9wdGlvbignY2xpY2tPcGVucycsIHRydWUpLFxyXG5cdFx0XHRkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxyXG5cdFx0XHRkZWZhdWx0RGF0ZTogdGhpcy5nZXRPcHRpb24oJ2RlZmF1bHREYXRlJyksXHJcblx0XHRcdGRpc2FibGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlJyksXHJcblx0XHRcdGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXHJcblx0XHRcdGVuYWJsZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZScpLFxyXG5cdFx0XHRlbmFibGVUaW1lOiB0aGlzLmdldE9wdGlvbignZW5hYmxlVGltZScpLFxyXG5cdFx0XHRlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxyXG5cdFx0XHRob3VySW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignaG91ckluY3JlbWVudCcpLFxyXG5cdFx0XHRpbmxpbmU6IHRoaXMuZ2V0T3B0aW9uKCdpbmxpbmUnKSxcclxuXHRcdFx0bG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXHJcblx0XHRcdG1heERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtYXhEYXRlJyksXHJcblx0XHRcdG1pbkRhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtaW5EYXRlJyksXHJcblx0XHRcdG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxyXG5cdFx0XHRtb2RlOiB0aGlzLmdldE9wdGlvbignbW9kZScpLFxyXG5cdFx0XHRuZXh0QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCduZXh0QXJyb3cnKSxcclxuXHRcdFx0bm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcclxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuZXZlbnRPbkNoYW5nZSxcclxuXHRcdFx0b25DbG9zZTogdGhpcy5ldmVudE9uQ2xvc2UsXHJcblx0XHRcdG9uT3BlbjogdGhpcy5ldmVudE9uT3BlbixcclxuXHRcdFx0b25SZWFkeTogdGhpcy5ldmVudE9uUmVhZHksXHJcblx0XHRcdHBhcnNlRGF0ZTogdGhpcy5nZXRPcHRpb24oJ3BhcnNlRGF0ZScpLFxyXG5cdFx0XHRwcmV2QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCdwcmV2QXJyb3cnKSxcclxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXHJcblx0XHRcdHN0YXRpYzogdGhpcy5nZXRPcHRpb24oJ3N0YXRpYycpLFxyXG5cdFx0XHR0aW1lXzI0aHI6IHRoaXMuZ2V0T3B0aW9uKCd0aW1lXzI0aHInKSxcclxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXHJcblx0XHRcdHdlZWtOdW1iZXJzOiB0aGlzLmdldE9wdGlvbignd2Vla051bWJlcnMnKSxcclxuXHRcdFx0d3JhcDogdGhpcy5nZXRPcHRpb24oJ3dyYXAnLCB0cnVlKSxcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIHVuc2V0IHByb3BlcnRpZXNcclxuXHRcdE9iamVjdC5rZXlzKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKS5mb3JFYWNoKCAoIGtleTogc3RyaW5nICkgPT4ge1xyXG5cdFx0XHQodGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkgJiZcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XHJcblx0XHR9ICk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXHJcblx0XHRcdFx0LnN1YnNjcmliZSggKCB2YWx1ZTogYW55ICkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCAhKCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgKSApIHtcclxuXHRcdFx0XHRcdFx0Ly8gUXVpZXRseSB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgdG8gYmUgYVxyXG5cdFx0XHRcdFx0XHQvLyBEYXRlIG9iamVjdC4gVGhpcyBhdm9pZHMgYW55IGV4dGVybmFsIHN1YnNjcmliZXJzXHJcblx0XHRcdFx0XHRcdC8vIGZyb20gYmVpbmcgbm90aWZpZWQgYSBzZWNvbmQgdGltZSAob25jZSBmb3IgdGhlIHVzZXJcclxuXHRcdFx0XHRcdFx0Ly8gaW5pdGlhdGVkIGV2ZW50LCBhbmQgb25jZSBmb3Igb3VyIGNvbnZlcnNpb24gdG9cclxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSgpKS5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb250cm9sLnNldFZhbHVlKCBuZXcgRGF0ZSggJycgKyB2YWx1ZSApLCB7XHJcblx0XHRcdFx0XHRcdFx0b25seVNlbGY6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0ZW1pdEV2ZW50OiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2VcclxuXHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGV2ZW50T25DaGFuZ2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xyXG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcclxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXHJcblx0XHR9O1xyXG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2hhbmdlICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5nbG9iYWxPbkNoYW5nZSApIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZXZlbnRPbkNsb3NlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcclxuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXHJcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxyXG5cdFx0fTtcclxuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNsb3NlICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UuZW1pdCggZXZlbnQgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2xvc2UgKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsT25DbG9zZSggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBldmVudE9uT3Blbiggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XHJcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xyXG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxyXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxyXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2VcclxuXHRcdH07XHJcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25PcGVuICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KCBldmVudCApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25PcGVuICkge1xyXG5cdFx0XHR0aGlzLmdsb2JhbE9uT3BlbiggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZXZlbnRPblJlYWR5KCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcclxuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXHJcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxyXG5cdFx0fTtcclxuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPblJlYWR5ICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdCggZXZlbnQgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uUmVhZHkgKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsT25SZWFkeSggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3Igb3B0aW9uIHtvcHRpb259LCBvciB7ZGVmYXVsdFZhbHVlfSBpZiBpdFxyXG5cdCAqIGRvZXNuJ3QgZXhpc3QuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGdldE9wdGlvbiggb3B0aW9uOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSApOiBhbnkge1xyXG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZyggMCwgMSApLnRvVXBwZXJDYXNlKClcclxuXHRcdFx0KyBvcHRpb24uc3Vic3RyaW5nKCAxICk7XHJcblxyXG5cdFx0aWYgKCB0eXBlb2YgdGhpc1tsb2NhbE5hbWVdICE9PSAndW5kZWZpbmVkJyApIHtcclxuXHRcdFx0cmV0dXJuIHRoaXNbbG9jYWxOYW1lXTtcclxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==