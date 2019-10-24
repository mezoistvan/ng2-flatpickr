import * as tslib_1 from "tslib";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer, SimpleChanges, OnChanges } from '@angular/core';
import { ControlContainer, FormControl, NgControl } from '@angular/forms';
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
            onChange: this.eventOnChange.bind(this),
            onClose: this.eventOnClose.bind(this),
            onOpen: this.eventOnOpen.bind(this),
            onReady: this.eventOnReady.bind(this),
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
Ng2FlatpickrDirective.ctorParameters = () => [
    { type: ControlContainer },
    { type: NgControl },
    { type: ElementRef },
    { type: Renderer }
];
tslib_1.__decorate([
    Input('flatpickr')
], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
tslib_1.__decorate([
    Input('placeholder')
], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input('altFormat')
], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
tslib_1.__decorate([
    Input('altInput')
], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
tslib_1.__decorate([
    Input('altInputClass')
], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
tslib_1.__decorate([
    Input('allowInput')
], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
tslib_1.__decorate([
    Input('appendTo')
], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
tslib_1.__decorate([
    Input('clickOpens')
], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
tslib_1.__decorate([
    Input('dateFormat')
], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
tslib_1.__decorate([
    Input('defaultDate')
], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
tslib_1.__decorate([
    Input('disable')
], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
tslib_1.__decorate([
    Input('disableMobile')
], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
tslib_1.__decorate([
    Input('enable')
], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
tslib_1.__decorate([
    Input('enableTime')
], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
tslib_1.__decorate([
    Input('enableSeconds')
], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
tslib_1.__decorate([
    Input('hourIncrement')
], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
tslib_1.__decorate([
    Input('inline')
], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
tslib_1.__decorate([
    Input('locale')
], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
tslib_1.__decorate([
    Input('maxDate')
], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
tslib_1.__decorate([
    Input('minDate')
], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
tslib_1.__decorate([
    Input('minuteIncrement')
], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
tslib_1.__decorate([
    Input('mode')
], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
tslib_1.__decorate([
    Input('nextArrow')
], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
tslib_1.__decorate([
    Input('noCalendar')
], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
tslib_1.__decorate([
    Input('parseDate')
], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
tslib_1.__decorate([
    Input('prevArrow')
], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
tslib_1.__decorate([
    Input('shorthandCurrentMonth')
], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
tslib_1.__decorate([
    Input('static')
], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
tslib_1.__decorate([
    Input('time_24hr')
], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
tslib_1.__decorate([
    Input('utc')
], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
tslib_1.__decorate([
    Input('weekNumbers')
], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
tslib_1.__decorate([
    Input('wrap')
], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
tslib_1.__decorate([
    Output('onChange')
], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
tslib_1.__decorate([
    Output('onClose')
], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
tslib_1.__decorate([
    Output('onOpen')
], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
tslib_1.__decorate([
    Output('onReady')
], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
tslib_1.__decorate([
    HostListener('dblclick')
], Ng2FlatpickrDirective.prototype, "onClick", null);
Ng2FlatpickrDirective = tslib_1.__decorate([
    Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' })
], Ng2FlatpickrDirective);
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ04sYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQ3ZFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUM3RCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBMlJqQyxZQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEYsQ0FBQztJQUVELGVBQWU7UUFDZDtvRUFDeUQ7UUFDekQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFL0MsSUFBSSxPQUFPLGFBQWEsS0FBSyxXQUFXLElBQUksYUFBYSxLQUFLLElBQUksRUFBRTtZQUNuRSxNQUFNLHdDQUF3QyxDQUFDO1NBQy9DO1FBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBRSxDQUFDO1lBQ2xGLGFBQWEsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBc0IsYUFBYSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztJQUN0RixDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQXNCO1FBQ2xDLElBQUksSUFBSSxDQUFDLFNBQVM7ZUFDZCxJQUFJLENBQUMsaUJBQWlCO2VBQ3RCLE9BQU8sQ0FBQyxjQUFjLENBQUUsYUFBYSxDQUFFO2VBQ3ZDLE9BQU8sQ0FBRSxhQUFhLENBQUUsQ0FBQyxZQUFZLEVBQUc7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFFLGFBQWEsRUFBRSxPQUFPLENBQUUsYUFBYSxDQUFFLENBQUMsWUFBWSxDQUFFLENBQUM7U0FDN0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUVuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNwQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7WUFDOUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3hDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNwQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDO1lBQzlDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN4QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ2xDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDaEMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3hDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztZQUM5QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7WUFDOUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ2xDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDO1lBQ2xELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM1QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdEMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3hDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN0QyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO1lBQzlELE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdEMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQzFCLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1NBQ2xDLENBQUM7UUFFRiwwQkFBMEI7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxPQUFPLENBQUUsQ0FBRSxHQUFXLEVBQUcsRUFBRTtZQUMvRCxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBRSxDQUFDO1FBRUosSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVk7aUJBQ2xELFNBQVMsQ0FBRSxDQUFFLEtBQVUsRUFBRyxFQUFFO2dCQUM1QixJQUFLLENBQUMsQ0FBRSxLQUFLLFlBQVksSUFBSSxDQUFFLEVBQUc7b0JBQ2pDLHVEQUF1RDtvQkFDdkQsb0RBQW9EO29CQUNwRCx1REFBdUQ7b0JBQ3ZELGtEQUFrRDtvQkFDbEQsV0FBVztvQkFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBRSxJQUFJLElBQUksQ0FBRSxFQUFFLEdBQUcsS0FBSyxDQUFFLEVBQUU7d0JBQzlDLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxLQUFLO3dCQUNoQixxQkFBcUIsRUFBRSxLQUFLO3dCQUM1QixxQkFBcUIsRUFBRSxLQUFLO3FCQUM1QixDQUFFLENBQUM7aUJBQ0o7WUFDRixDQUFDLENBQUUsQ0FBQztTQUNMO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGFBQWEsQ0FBRSxhQUFxQixFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQUNoRixJQUFJLEtBQUssR0FBbUI7WUFDM0IsYUFBYSxFQUFFLGFBQWE7WUFDNUIsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLFFBQVE7U0FDbEIsQ0FBQztRQUNGLElBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFHO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDckM7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUc7WUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBRSxLQUFLLENBQUUsQ0FBQztTQUM3QjtJQUNGLENBQUM7SUFFRDs7O09BR0c7SUFDTyxZQUFZLENBQUUsYUFBcUIsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDL0UsSUFBSSxLQUFLLEdBQW1CO1lBQzNCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUM7UUFDRixJQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFHO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDNUI7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sV0FBVyxDQUFFLGFBQXFCLEVBQUUsT0FBZSxFQUFFLFFBQWdCO1FBQzlFLElBQUksS0FBSyxHQUFtQjtZQUMzQixhQUFhLEVBQUUsYUFBYTtZQUM1QixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsUUFBUTtTQUNsQixDQUFDO1FBQ0YsSUFBSyxJQUFJLENBQUMsZUFBZSxFQUFHO1lBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFHO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDM0I7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sWUFBWSxDQUFFLGFBQXFCLEVBQUUsT0FBZSxFQUFFLFFBQWdCO1FBQy9FLElBQUksS0FBSyxHQUFtQjtZQUMzQixhQUFhLEVBQUUsYUFBYTtZQUM1QixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsUUFBUTtTQUNsQixDQUFDO1FBQ0YsSUFBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUc7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBQztTQUNwQztRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRztZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFFLEtBQUssQ0FBRSxDQUFDO1NBQzVCO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNPLFNBQVMsQ0FBRSxNQUFjLEVBQUUsWUFBa0I7UUFDdEQsSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDLFdBQVcsRUFBRTtjQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBRSxDQUFDO1FBRXpCLElBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssV0FBVyxFQUFHO1lBQzdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUc7WUFDbEUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNOLE9BQU8sWUFBWSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztDQUNELENBQUE7O1lBak5tQixnQkFBZ0I7WUFDYixTQUFTO1lBQ1gsVUFBVTtZQUNULFFBQVE7O0FBelJQO0lBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7K0RBQTJDO0FBT3hDO0lBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7MERBQTRCO0FBTzdCO0lBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7aUVBQW1DO0FBUW5DO0lBQXBCLEtBQUssQ0FBRSxVQUFVLENBQUU7Z0VBQW1DO0FBUTdCO0lBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7cUVBQXVDO0FBUXpDO0lBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7a0VBQXFDO0FBT3RDO0lBQXBCLEtBQUssQ0FBRSxVQUFVLENBQUU7Z0VBQStCO0FBUzVCO0lBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7a0VBQXFDO0FBU3BDO0lBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7a0VBQW9DO0FBWWxDO0lBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7bUVBQTRDO0FBUS9DO0lBQW5CLEtBQUssQ0FBRSxTQUFTLENBQUU7K0RBQTRDO0FBU3JDO0lBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7cUVBQXdDO0FBUTlDO0lBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7OERBQTJDO0FBT3RDO0lBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7a0VBQXFDO0FBT2pDO0lBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7cUVBQXdDO0FBT3ZDO0lBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7cUVBQXVDO0FBTzdDO0lBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7OERBQWlDO0FBT2hDO0lBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7OERBQWdDO0FBTzlCO0lBQW5CLEtBQUssQ0FBRSxTQUFTLENBQUU7K0RBQXdDO0FBT3ZDO0lBQW5CLEtBQUssQ0FBRSxTQUFTLENBQUU7K0RBQXdDO0FBTy9CO0lBQTNCLEtBQUssQ0FBRSxpQkFBaUIsQ0FBRTt1RUFBeUM7QUFPbkQ7SUFBaEIsS0FBSyxDQUFFLE1BQU0sQ0FBRTs0REFBOEI7QUFPeEI7SUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtpRUFBbUM7QUFRakM7SUFBdEIsS0FBSyxDQUFFLFlBQVksQ0FBRTtrRUFBcUM7QUFPckM7SUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtpRUFBcUM7QUFPcEM7SUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtpRUFBbUM7QUFPdEI7SUFBakMsS0FBSyxDQUFFLHVCQUF1QixDQUFFOzZFQUFnRDtBQVE5RDtJQUFsQixLQUFLLENBQUUsUUFBUSxDQUFFOzhEQUFpQztBQU83QjtJQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFO2lFQUFvQztBQUV6QztJQUFmLEtBQUssQ0FBRSxLQUFLLENBQUU7MkRBQThCO0FBT3JCO0lBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7bUVBQXNDO0FBTzVDO0lBQWhCLEtBQUssQ0FBRSxNQUFNLENBQUU7NERBQStCO0FBT3pCO0lBQXJCLE1BQU0sQ0FBRSxVQUFVLENBQUU7Z0VBQTZFO0FBTzdFO0lBQXBCLE1BQU0sQ0FBRSxTQUFTLENBQUU7K0RBQTRFO0FBTzVFO0lBQW5CLE1BQU0sQ0FBRSxRQUFRLENBQUU7OERBQTJFO0FBT3pFO0lBQXBCLE1BQU0sQ0FBRSxTQUFTLENBQUU7K0RBQTRFO0FBSWhHO0lBREMsWUFBWSxDQUFFLFVBQVUsQ0FBRTtvREFHMUI7QUE5UVcscUJBQXFCO0lBRGpDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO0dBQ3JELHFCQUFxQixDQTZlakM7U0E3ZVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuXHRBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcclxuXHRPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlciwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGbGF0cGlja3JFdmVudCB9IGZyb20gJy4vZmxhdHBpY2tyLWV2ZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xyXG5pbXBvcnQgeyBGbGF0cGlja3JPcHRpb25zIH0gZnJvbSAnLi9mbGF0cGlja3Itb3B0aW9ucy5pbnRlcmZhY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2ZsYXRwaWNrcl0nLCBleHBvcnRBczogJ25nMi1mbGF0cGlja3InIH0pXHJcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHQvKipcclxuXHQgKiBUaGUgZmxhdHBpY2tyIGNvbmZpZ3VyYXRpb24gYXMgYSBzaW5nbGUgb2JqZWN0IG9mIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3Ivb3B0aW9ucy8gZm9yIGZ1bGwgbGlzdC5cclxuXHQgKi9cclxuXHRASW5wdXQoICdmbGF0cGlja3InICkgcHVibGljIGZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnM7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBsYWNlaG9sZGVyIGZvciBpbnB1dCBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAncGxhY2Vob2xkZXInICkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4YWN0bHkgdGhlIHNhbWUgYXMgZGF0ZSBmb3JtYXQsIGJ1dCBmb3IgdGhlIGFsdElucHV0IGZpZWxkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwiRiBqLCBZXCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdhbHRGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckFsdEZvcm1hdDogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG93IHRoZSB1c2VyIGEgcmVhZGFibGUgZGF0ZSAoYXMgcGVyIGFsdEZvcm1hdCksIGJ1dCByZXR1cm4gc29tZXRoaW5nXHJcblx0ICogdG90YWxseSBkaWZmZXJlbnQgdG8gdGhlIHNlcnZlci5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2FsdElucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhpcyBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGFsdElucHV0XHJcblx0ICogb3B0aW9uLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwiXCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdhbHRJbnB1dENsYXNzJyApIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dENsYXNzOiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsbG93cyB0aGUgdXNlciB0byBlbnRlciBhIGRhdGUgZGlyZWN0bHkgaW5wdXQgdGhlIGlucHV0IGZpZWxkLiBCeVxyXG5cdCAqIGRlZmF1bHQsIGRpcmVjdCBlbnRyeSBpcyBkaXNhYmxlZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2FsbG93SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsbG93SW5wdXQ6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluc3RlYWQgb2YgYm9keSwgYXBwZW5kcyB0aGUgY2FsZW5kYXIgdG8gdGhlIHNwZWNpZmllZCBub2RlIGluc3RlYWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2FwcGVuZFRvJyApIHB1YmxpYyBmbGF0cGlja3JBcHBlbmRUbzogYW55OyAvLyBIVE1MRWxlbWVudFxyXG5cclxuXHQvKipcclxuXHQgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxyXG5cdCAqIFlvdSBjb3VsZCBkaXNhYmxlIHRoaXMgaWYgeW91IHdpc2ggdG8gb3BlbiB0aGUgY2FsZW5kYXIgbWFudWFsbHlcclxuXHQgKiB3aXRoLm9wZW4oKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICB0cnVlXHJcblx0ICovXHJcblx0QElucHV0KCAnY2xpY2tPcGVucycgKSBwdWJsaWMgZmxhdHBpY2tyQ2xpY2tPcGVuczogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBzdHJpbmcgb2YgY2hhcmFjdGVycyB3aGljaCBhcmUgdXNlZCB0byBkZWZpbmUgaG93IHRoZSBkYXRlIHdpbGwgYmVcclxuXHQgKiBkaXNwbGF5ZWQgaW4gdGhlIGlucHV0IGJveC5cclxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwiWS1tLWRcIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2RhdGVGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaW5pdGlhbCBzZWxlY3RlZCBkYXRlKHMpLlxyXG5cdCAqXHJcblx0ICogSWYgeW91J3JlIHVzaW5nIHttb2RlOiBcIm11bHRpcGxlXCJ9IG9yIGEgcmFuZ2UgY2FsZW5kYXIgc3VwcGx5IGFuIEFycmF5IG9mXHJcblx0ICogRGF0ZSBvYmplY3RzIG9yIGFuIEFycmF5IG9mIGRhdGUgc3RyaW5ncyB3aGljaCBmb2xsb3cgeW91ciBkYXRlRm9ybWF0LlxyXG5cdCAqXHJcblx0ICogT3RoZXJ3aXNlLCB5b3UgY2FuIHN1cHBseSBhIHNpbmdsZSBEYXRlIG9iamVjdCBvciBhIGRhdGUgc3RyaW5nLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdkZWZhdWx0RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc2FibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZGlzYWJsZVxyXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctc3BlY2lmaWMtZGF0ZXNcclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBbXVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2Rpc2FibGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgZGlzYWJsZU1vYmlsZSB0byB0cnVlIHRvIGFsd2F5cyB1c2UgdGhlIG5vbi1uYXRpdmUgcGlja2VyLiBCeVxyXG5cdCAqIGRlZmF1bHQsIEZsYXRwaWNrciB1dGlsaXplcyBuYXRpdmUgZGF0ZXRpbWUgd2lkZ2V0cyB1bmxlc3MgY2VydGFpblxyXG5cdCAqIG9wdGlvbnMgKGUuZy4gZGlzYWJsZSkgYXJlIHVzZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdkaXNhYmxlTW9iaWxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXHJcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBbXVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2VuYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyB0aW1lIHBpY2tlci5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2VuYWJsZVRpbWUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdlbmFibGVTZWNvbmRzJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVTZWNvbmRzOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgaG91ciBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICAxXHJcblx0ICovXHJcblx0QElucHV0KCAnaG91ckluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tySG91ckluY3JlbWVudDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5cyB0aGUgY2FsZW5kYXIgaW5saW5lLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnaW5saW5lJyApIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnbG9jYWxlJyApIHB1YmxpYyBmbGF0cGlja3JMb2NhbGU6IE9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gcGljayB0byAoaW5jbHVzaXZlKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnbWF4RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWF4RGF0ZTogc3RyaW5nIHwgRGF0ZTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gc3RhcnQgcGlja2luZyBmcm9tIChpbmNsdXNpdmUpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdtaW5EYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlO1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIDVcclxuXHQgKi9cclxuXHRASW5wdXQoICdtaW51dGVJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrck1pbnV0ZUluY3JlbWVudDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBcInNpbmdsZVwiLCBcIm11bHRpcGxlXCIsIG9yIFwicmFuZ2VcIlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFwic2luZ2xlXCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdtb2RlJyApIHB1YmxpYyBmbGF0cGlja3JNb2RlOiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhUTUwgZm9yIHRoZSBhcnJvdyBpY29uLCB1c2VkIHRvIHN3aXRjaCBtb250aHMuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCI+XCJcclxuXHQgKi9cclxuXHRASW5wdXQoICduZXh0QXJyb3cnICkgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xyXG5cdCAqIGNyZWF0ZSBhIHRpbWUgcGlja2VyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnbm9DYWxlbmRhcicgKSBwdWJsaWMgZmxhdHBpY2tyTm9DYWxlbmRhcjogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRnVuY3Rpb24gdGhhdCBleHBlY3RzIGEgZGF0ZSBzdHJpbmcgYW5kIG11c3QgcmV0dXJuIGEgRGF0ZSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdwYXJzZURhdGUnICkgcHVibGljIGZsYXRwaWNrclBhcnNlRGF0ZTogRnVuY3Rpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhUTUwgZm9yIHRoZSBsZWZ0IGFycm93IGljb24uXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCI8XCJcclxuXHQgKi9cclxuXHRASW5wdXQoICdwcmV2QXJyb3cnICkgcHVibGljIGZsYXRwaWNrclByZXZBcnJvdzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG93IHRoZSBtb250aCB1c2luZyB0aGUgc2hvcnRoYW5kIHZlcnNpb24gKGllLCBTZXAgaW5zdGVhZCBvZiBTZXB0ZW1iZXIpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnc2hvcnRoYW5kQ3VycmVudE1vbnRoJyApIHB1YmxpYyBmbGF0cGlja3JTaG9ydGhhbmRDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBvc2l0aW9uIHRoZSBjYWxlbmRhciBpbnNpZGUgdGhlIHdyYXBwZXIgYW5kIG5leHQgdG8gdGhlIGlucHV0IGVsZW1lbnRcclxuXHQgKiAoTGVhdmUgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nKS5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3N0YXRpYycgKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAndGltZV8yNGhyJyApIHB1YmxpYyBmbGF0cGlja3JUaW1lXzI0aHI6IGJvb2xlYW47XHJcblxyXG5cdEBJbnB1dCggJ3V0YycgKSBwdWJsaWMgZmxhdHBpY2tyVXRjOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzIGRpc3BsYXkgb2Ygd2VlayBudW1iZXJzIGluIGNhbGVuZGFyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnd2Vla051bWJlcnMnICkgcHVibGljIGZsYXRwaWNrcldlZWtOdW1iZXJzOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXN0b20gZWxlbWVudHMgYW5kIGlucHV0IGdyb3Vwcy5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3dyYXAnICkgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRAT3V0cHV0KCAnb25DaGFuZ2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHQvKipcclxuXHQgKiBvbkNsb3NlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIGNsb3NlZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QE91dHB1dCggJ29uQ2xvc2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIG9uT3BlbiBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBPdXRwdXQoICdvbk9wZW4nICkgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0LyoqXHJcblx0ICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRAT3V0cHV0KCAnb25SZWFkeScgKSBwdWJsaWMgZmxhdHBpY2tyT25SZWFkeTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0LyoqIEFsbG93IGRvdWJsZS1jbGlja2luZyBvbiB0aGUgY29udHJvbCB0byBvcGVuL2Nsb3NlIGl0LiAqL1xyXG5cdEBIb3N0TGlzdGVuZXIoICdkYmxjbGljaycgKVxyXG5cdHB1YmxpYyBvbkNsaWNrKCkge1xyXG5cdFx0dGhpcy5mbGF0cGlja3IudG9nZ2xlKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DaGFuZ2U6IEZ1bmN0aW9uO1xyXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbjtcclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25PcGVuOiBGdW5jdGlvbjtcclxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25SZWFkeTogRnVuY3Rpb247XHJcblxyXG5cdHByb3RlY3RlZCBmbGF0cGlja3I6IEZsYXRwaWNrckluc3RhbmNlO1xyXG5cdHByb3RlY3RlZCBmb3JtQ29udHJvbExpc3RlbmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG5cdC8qKiBBbGxvdyBhY2Nlc3MgcHJvcGVydGllcyB1c2luZyBpbmRleCBub3RhdGlvbiAqL1xyXG5cdFtrZXk6c3RyaW5nXTogYW55O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXHJcblx0XHRwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXHJcblx0XHRwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcclxuXHRcdHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXJcclxuXHQpIHt9XHJcblxyXG5cdGdldCBjb250cm9sKCk6IEZvcm1Db250cm9sIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxyXG5cdFx0XHRyYW5kb21pemUgdGhlIGRhdGUgd2hlbiB0aGUgZm9ybSBjb250cm9sIGluaXRpYWxpemVzLiAqL1xyXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuXHJcblx0XHRpZiAodHlwZW9mIG5hdGl2ZUVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IG5hdGl2ZUVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2RhdGEtaW5wdXQnLCAnJyApO1xyXG5cdFx0XHRuYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZmxhdHBpY2tyID0gPEZsYXRwaWNrckluc3RhbmNlPm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKTtcclxuXHR9XHJcblxyXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xyXG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyXHJcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyQWx0SW5wdXRcclxuXHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxyXG5cdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xyXG5cdFx0XHRcdHRoaXMuZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xyXG5cdFx0XHR9XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrci5kZXN0cm95KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lcikge1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZsYXRwaWNrck9uT3BlbiA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNoYW5nZTtcclxuXHRcdHRoaXMuZ2xvYmFsT25DbG9zZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNsb3NlO1xyXG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xyXG5cdFx0dGhpcy5nbG9iYWxPblJlYWR5ID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uUmVhZHk7XHJcblxyXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xyXG5cdFx0XHRhbHRGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRGb3JtYXQnKSxcclxuXHRcdFx0YWx0SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dCcpLFxyXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxyXG5cdFx0XHRhbGxvd0lucHV0OiB0aGlzLmdldE9wdGlvbignYWxsb3dJbnB1dCcpLFxyXG5cdFx0XHRhcHBlbmRUbzogdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJyksXHJcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXHJcblx0XHRcdGRhdGVGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdkYXRlRm9ybWF0JyksXHJcblx0XHRcdGRlZmF1bHREYXRlOiB0aGlzLmdldE9wdGlvbignZGVmYXVsdERhdGUnKSxcclxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcclxuXHRcdFx0ZGlzYWJsZU1vYmlsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGVNb2JpbGUnKSxcclxuXHRcdFx0ZW5hYmxlOiB0aGlzLmdldE9wdGlvbignZW5hYmxlJyksXHJcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXHJcblx0XHRcdGVuYWJsZVNlY29uZHM6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVTZWNvbmRzJyksXHJcblx0XHRcdGhvdXJJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdob3VySW5jcmVtZW50JyksXHJcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxyXG5cdFx0XHRsb2NhbGU6IHRoaXMuZ2V0T3B0aW9uKCdsb2NhbGUnKSxcclxuXHRcdFx0bWF4RGF0ZTogdGhpcy5nZXRPcHRpb24oJ21heERhdGUnKSxcclxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcclxuXHRcdFx0bWludXRlSW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignbWludXRlSW5jcmVtZW50JyksXHJcblx0XHRcdG1vZGU6IHRoaXMuZ2V0T3B0aW9uKCdtb2RlJyksXHJcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxyXG5cdFx0XHRub0NhbGVuZGFyOiB0aGlzLmdldE9wdGlvbignbm9DYWxlbmRhcicpLFxyXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5ldmVudE9uQ2hhbmdlLmJpbmQodGhpcyksXHJcblx0XHRcdG9uQ2xvc2U6IHRoaXMuZXZlbnRPbkNsb3NlLmJpbmQodGhpcyksXHJcblx0XHRcdG9uT3BlbjogdGhpcy5ldmVudE9uT3Blbi5iaW5kKHRoaXMpLFxyXG5cdFx0XHRvblJlYWR5OiB0aGlzLmV2ZW50T25SZWFkeS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRwYXJzZURhdGU6IHRoaXMuZ2V0T3B0aW9uKCdwYXJzZURhdGUnKSxcclxuXHRcdFx0cHJldkFycm93OiB0aGlzLmdldE9wdGlvbigncHJldkFycm93JyksXHJcblx0XHRcdHNob3J0aGFuZEN1cnJlbnRNb250aDogdGhpcy5nZXRPcHRpb24oJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpLFxyXG5cdFx0XHRzdGF0aWM6IHRoaXMuZ2V0T3B0aW9uKCdzdGF0aWMnKSxcclxuXHRcdFx0dGltZV8yNGhyOiB0aGlzLmdldE9wdGlvbigndGltZV8yNGhyJyksXHJcblx0XHRcdHV0YzogdGhpcy5nZXRPcHRpb24oJ3V0YycpLFxyXG5cdFx0XHR3ZWVrTnVtYmVyczogdGhpcy5nZXRPcHRpb24oJ3dlZWtOdW1iZXJzJyksXHJcblx0XHRcdHdyYXA6IHRoaXMuZ2V0T3B0aW9uKCd3cmFwJywgdHJ1ZSksXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFJlbW92ZSB1bnNldCBwcm9wZXJ0aWVzXHJcblx0XHRPYmplY3Qua2V5cyggdGhpcy5mbGF0cGlja3JPcHRpb25zICkuZm9yRWFjaCggKCBrZXk6IHN0cmluZyApID0+IHtcclxuXHRcdFx0KHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpICYmXHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldO1xyXG5cdFx0fSApO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbnRyb2wpIHtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlc1xyXG5cdFx0XHRcdC5zdWJzY3JpYmUoICggdmFsdWU6IGFueSApID0+IHtcclxuXHRcdFx0XHRcdGlmICggISggdmFsdWUgaW5zdGFuY2VvZiBEYXRlICkgKSB7XHJcblx0XHRcdFx0XHRcdC8vIFF1aWV0bHkgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sIHRvIGJlIGFcclxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSBvYmplY3QuIFRoaXMgYXZvaWRzIGFueSBleHRlcm5hbCBzdWJzY3JpYmVyc1xyXG5cdFx0XHRcdFx0XHQvLyBmcm9tIGJlaW5nIG5vdGlmaWVkIGEgc2Vjb25kIHRpbWUgKG9uY2UgZm9yIHRoZSB1c2VyXHJcblx0XHRcdFx0XHRcdC8vIGluaXRpYXRlZCBldmVudCwgYW5kIG9uY2UgZm9yIG91ciBjb252ZXJzaW9uIHRvXHJcblx0XHRcdFx0XHRcdC8vIERhdGUoKSkuXHJcblx0XHRcdFx0XHRcdHRoaXMuY29udHJvbC5zZXRWYWx1ZSggbmV3IERhdGUoICcnICsgdmFsdWUgKSwge1xyXG5cdFx0XHRcdFx0XHRcdG9ubHlTZWxmOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdGVtaXRFdmVudDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0ZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXHJcblx0XHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXHJcblx0ICogZ2xvYmFsIG9uQ2hhbmdlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBldmVudE9uQ2hhbmdlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcclxuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXHJcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxyXG5cdFx0fTtcclxuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNoYW5nZSApIHtcclxuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZS5lbWl0KCBldmVudCApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DaGFuZ2UgKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXHJcblx0ICogZ2xvYmFsIG9uQ2xvc2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGV2ZW50T25DbG9zZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XHJcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xyXG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxyXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxyXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2VcclxuXHRcdH07XHJcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DbG9zZSApIHtcclxuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlLmVtaXQoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5nbG9iYWxPbkNsb3NlICkge1xyXG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXHJcblx0ICogZ2xvYmFsIG9uT3BlbiBjYWxsYmFjaywgaWYgZGVmaW5lZC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZXZlbnRPbk9wZW4oIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xyXG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcclxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXHJcblx0XHR9O1xyXG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uT3BlbiApIHtcclxuXHRcdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4uZW1pdCggZXZlbnQgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uT3BlbiApIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxPbk9wZW4oIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXHJcblx0ICogZ2xvYmFsIG9uUmVhZHkgY2FsbGJhY2ssIGlmIGRlZmluZWQuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGV2ZW50T25SZWFkeSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XHJcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xyXG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxyXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxyXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2VcclxuXHRcdH07XHJcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25SZWFkeSApIHtcclxuXHRcdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5LmVtaXQoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5nbG9iYWxPblJlYWR5ICkge1xyXG5cdFx0XHR0aGlzLmdsb2JhbE9uUmVhZHkoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm4gdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIG9wdGlvbiB7b3B0aW9ufSwgb3Ige2RlZmF1bHRWYWx1ZX0gaWYgaXRcclxuXHQgKiBkb2Vzbid0IGV4aXN0LlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRPcHRpb24oIG9wdGlvbjogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkgKTogYW55IHtcclxuXHRcdGxldCBsb2NhbE5hbWUgPSAnZmxhdHBpY2tyJyArIG9wdGlvbi5zdWJzdHJpbmcoIDAsIDEgKS50b1VwcGVyQ2FzZSgpXHJcblx0XHRcdCsgb3B0aW9uLnN1YnN0cmluZyggMSApO1xyXG5cclxuXHRcdGlmICggdHlwZW9mIHRoaXNbbG9jYWxOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRcdHJldHVybiB0aGlzW2xvY2FsTmFtZV07XHJcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl0gIT09ICd1bmRlZmluZWQnICkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=