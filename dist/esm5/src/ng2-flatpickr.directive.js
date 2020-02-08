import * as tslib_1 from "tslib";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, OnChanges } from '@angular/core';
import { ControlContainer, FormControl, NgControl } from '@angular/forms';
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
            this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
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
    Ng2FlatpickrDirective.ctorParameters = function () { return [
        { type: ControlContainer },
        { type: NgControl },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return Ng2FlatpickrDirective;
}());
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ04sYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQ3ZFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUM5RCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFO0lBMlJDLCtCQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQW1CO1FBSG5CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakQ5Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELHVDQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsc0JBQUksMENBQU87YUFBWDtZQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xGLENBQUM7OztPQUFBO0lBRUQsK0NBQWUsR0FBZjtRQUNDO29FQUN5RDtRQUN6RCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUUvQyxJQUFJLE9BQU8sYUFBYSxLQUFLLFdBQVcsSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQ25FLE1BQU0sd0NBQXdDLENBQUM7U0FDL0M7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBRSxDQUFDO1lBQzNFLGFBQWEsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBc0IsYUFBYSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztJQUN0RixDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFhLE9BQXNCO1FBQ2xDLElBQUksSUFBSSxDQUFDLFNBQVM7ZUFDZCxJQUFJLENBQUMsaUJBQWlCO2VBQ3RCLE9BQU8sQ0FBQyxjQUFjLENBQUUsYUFBYSxDQUFFO2VBQ3ZDLE9BQU8sQ0FBRSxhQUFhLENBQUUsQ0FBQyxZQUFZLEVBQUc7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFFLGFBQWEsRUFBRSxPQUFPLENBQUUsYUFBYSxDQUFFLENBQUMsWUFBWSxDQUFFLENBQUM7U0FDN0Y7SUFDSCxDQUFDO0lBRUQsMkNBQVcsR0FBWDtRQUNDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQW1FQztRQWxFQSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFFbkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN0QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDcEMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO1lBQzlDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN4QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDcEMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztZQUM5QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFDeEMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUNsQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7WUFDOUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ2hDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN4QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7WUFDOUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDaEMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUNsQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztZQUNsRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDNUIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ3RDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN4QyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdEMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztZQUM5RCxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDaEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ3RDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUMxQixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztTQUNsQyxDQUFDO1FBRUYsMEJBQTBCO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFFLENBQUMsT0FBTyxDQUFFLFVBQUUsR0FBVztZQUMxRCxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQ3pDLE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBRSxDQUFDO1FBRUosSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVk7aUJBQ2xELFNBQVMsQ0FBRSxVQUFFLEtBQVU7Z0JBQ3ZCLElBQUssQ0FBQyxDQUFFLEtBQUssWUFBWSxJQUFJLENBQUUsRUFBRztvQkFDakMsdURBQXVEO29CQUN2RCxvREFBb0Q7b0JBQ3BELHVEQUF1RDtvQkFDdkQsa0RBQWtEO29CQUNsRCxXQUFXO29CQUNYLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFFLElBQUksSUFBSSxDQUFFLEVBQUUsR0FBRyxLQUFLLENBQUUsRUFBRTt3QkFDOUMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsU0FBUyxFQUFFLEtBQUs7d0JBQ2hCLHFCQUFxQixFQUFFLEtBQUs7d0JBQzVCLHFCQUFxQixFQUFFLEtBQUs7cUJBQzVCLENBQUUsQ0FBQztpQkFDSjtZQUNGLENBQUMsQ0FBRSxDQUFDO1NBQ0w7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sNkNBQWEsR0FBdkIsVUFBeUIsYUFBcUIsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDaEYsSUFBSSxLQUFLLEdBQW1CO1lBQzNCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUM7UUFDRixJQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRztZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFHO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDN0I7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sNENBQVksR0FBdEIsVUFBd0IsYUFBcUIsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDL0UsSUFBSSxLQUFLLEdBQW1CO1lBQzNCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUM7UUFDRixJQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFHO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDNUI7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sMkNBQVcsR0FBckIsVUFBdUIsYUFBcUIsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDOUUsSUFBSSxLQUFLLEdBQW1CO1lBQzNCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUM7UUFDRixJQUFLLElBQUksQ0FBQyxlQUFlLEVBQUc7WUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDbkM7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUc7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBRSxLQUFLLENBQUUsQ0FBQztTQUMzQjtJQUNGLENBQUM7SUFFRDs7O09BR0c7SUFDTyw0Q0FBWSxHQUF0QixVQUF3QixhQUFxQixFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQUMvRSxJQUFJLEtBQUssR0FBbUI7WUFDM0IsYUFBYSxFQUFFLGFBQWE7WUFDNUIsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLFFBQVE7U0FDbEIsQ0FBQztRQUNGLElBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFHO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDcEM7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUc7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBRSxLQUFLLENBQUUsQ0FBQztTQUM1QjtJQUNGLENBQUM7SUFFRDs7O09BR0c7SUFDTyx5Q0FBUyxHQUFuQixVQUFxQixNQUFjLEVBQUUsWUFBa0I7UUFDdEQsSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDLFdBQVcsRUFBRTtjQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBRSxDQUFDO1FBRXpCLElBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssV0FBVyxFQUFHO1lBQzdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUc7WUFDbEUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNOLE9BQU8sWUFBWSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQzs7Z0JBaE5rQixnQkFBZ0I7Z0JBQ2IsU0FBUztnQkFDWCxVQUFVO2dCQUNULFNBQVM7O0lBelJSO1FBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7bUVBQTJDO0lBT3hDO1FBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7OERBQTRCO0lBTzdCO1FBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7cUVBQW1DO0lBUW5DO1FBQXBCLEtBQUssQ0FBRSxVQUFVLENBQUU7b0VBQW1DO0lBUTdCO1FBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7eUVBQXVDO0lBUXpDO1FBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7c0VBQXFDO0lBT3RDO1FBQXBCLEtBQUssQ0FBRSxVQUFVLENBQUU7b0VBQStCO0lBUzVCO1FBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7c0VBQXFDO0lBU3BDO1FBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7c0VBQW9DO0lBWWxDO1FBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7dUVBQTRDO0lBUS9DO1FBQW5CLEtBQUssQ0FBRSxTQUFTLENBQUU7bUVBQTRDO0lBU3JDO1FBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7eUVBQXdDO0lBUTlDO1FBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7a0VBQTJDO0lBT3RDO1FBQXRCLEtBQUssQ0FBRSxZQUFZLENBQUU7c0VBQXFDO0lBT2pDO1FBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7eUVBQXdDO0lBT3ZDO1FBQXpCLEtBQUssQ0FBRSxlQUFlLENBQUU7eUVBQXVDO0lBTzdDO1FBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7a0VBQWlDO0lBT2hDO1FBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7a0VBQWdDO0lBTzlCO1FBQW5CLEtBQUssQ0FBRSxTQUFTLENBQUU7bUVBQXdDO0lBT3ZDO1FBQW5CLEtBQUssQ0FBRSxTQUFTLENBQUU7bUVBQXdDO0lBTy9CO1FBQTNCLEtBQUssQ0FBRSxpQkFBaUIsQ0FBRTsyRUFBeUM7SUFPbkQ7UUFBaEIsS0FBSyxDQUFFLE1BQU0sQ0FBRTtnRUFBOEI7SUFPeEI7UUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtxRUFBbUM7SUFRakM7UUFBdEIsS0FBSyxDQUFFLFlBQVksQ0FBRTtzRUFBcUM7SUFPckM7UUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtxRUFBcUM7SUFPcEM7UUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTtxRUFBbUM7SUFPdEI7UUFBakMsS0FBSyxDQUFFLHVCQUF1QixDQUFFO2lGQUFnRDtJQVE5RDtRQUFsQixLQUFLLENBQUUsUUFBUSxDQUFFO2tFQUFpQztJQU83QjtRQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFO3FFQUFvQztJQUV6QztRQUFmLEtBQUssQ0FBRSxLQUFLLENBQUU7K0RBQThCO0lBT3JCO1FBQXZCLEtBQUssQ0FBRSxhQUFhLENBQUU7dUVBQXNDO0lBTzVDO1FBQWhCLEtBQUssQ0FBRSxNQUFNLENBQUU7Z0VBQStCO0lBT3pCO1FBQXJCLE1BQU0sQ0FBRSxVQUFVLENBQUU7b0VBQTZFO0lBTzdFO1FBQXBCLE1BQU0sQ0FBRSxTQUFTLENBQUU7bUVBQTRFO0lBTzVFO1FBQW5CLE1BQU0sQ0FBRSxRQUFRLENBQUU7a0VBQTJFO0lBT3pFO1FBQXBCLE1BQU0sQ0FBRSxTQUFTLENBQUU7bUVBQTRFO0lBSWhHO1FBREMsWUFBWSxDQUFFLFVBQVUsQ0FBRTt3REFHMUI7SUE5UVcscUJBQXFCO1FBRGpDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO09BQ3JELHFCQUFxQixDQTZlakM7SUFBRCw0QkFBQztDQUFBLEFBN2VELElBNmVDO1NBN2VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXHJcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbENvbnRhaW5lciwgRm9ybUNvbnRyb2wsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRmxhdHBpY2tySW5zdGFuY2UgfSBmcm9tICcuL2ZsYXRwaWNrci1pbnN0YW5jZSc7XHJcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbZmxhdHBpY2tyXScsIGV4cG9ydEFzOiAnbmcyLWZsYXRwaWNrcicgfSlcclxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cdC8qKlxyXG5cdCAqIFRoZSBmbGF0cGlja3IgY29uZmlndXJhdGlvbiBhcyBhIHNpbmdsZSBvYmplY3Qgb2YgdmFsdWVzLlxyXG5cdCAqXHJcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2ZsYXRwaWNrcicgKSBwdWJsaWMgZmxhdHBpY2tyT3B0aW9uczogRmxhdHBpY2tyT3B0aW9ucztcclxuXHJcblx0LyoqXHJcblx0ICogUGxhY2Vob2xkZXIgZm9yIGlucHV0IGZpZWxkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdwbGFjZWhvbGRlcicgKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCJGIGosIFlcIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2FsdEZvcm1hdCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0Rm9ybWF0OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3cgdGhlIHVzZXIgYSByZWFkYWJsZSBkYXRlIChhcyBwZXIgYWx0Rm9ybWF0KSwgYnV0IHJldHVybiBzb21ldGhpbmdcclxuXHQgKiB0b3RhbGx5IGRpZmZlcmVudCB0byB0aGUgc2VydmVyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnYWx0SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0OiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGlzIGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgY3JlYXRlZCBieSB0aGUgYWx0SW5wdXRcclxuXHQgKiBvcHRpb24uXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCJcIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2FsdElucHV0Q2xhc3MnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0Q2xhc3M6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogQWxsb3dzIHRoZSB1c2VyIHRvIGVudGVyIGEgZGF0ZSBkaXJlY3RseSBpbnB1dCB0aGUgaW5wdXQgZmllbGQuIEJ5XHJcblx0ICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnYWxsb3dJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWxsb3dJbnB1dDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5zdGVhZCBvZiBib2R5LCBhcHBlbmRzIHRoZSBjYWxlbmRhciB0byB0aGUgc3BlY2lmaWVkIG5vZGUgaW5zdGVhZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QElucHV0KCAnYXBwZW5kVG8nICkgcHVibGljIGZsYXRwaWNrckFwcGVuZFRvOiBhbnk7IC8vIEhUTUxFbGVtZW50XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZXRoZXIgY2xpY2tpbmcgb24gdGhlIGlucHV0IHNob3VsZCBvcGVuIHRoZSBwaWNrZXIuXHJcblx0ICogWW91IGNvdWxkIGRpc2FibGUgdGhpcyBpZiB5b3Ugd2lzaCB0byBvcGVuIHRoZSBjYWxlbmRhciBtYW51YWxseVxyXG5cdCAqIHdpdGgub3BlbigpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIHRydWVcclxuXHQgKi9cclxuXHRASW5wdXQoICdjbGlja09wZW5zJyApIHB1YmxpYyBmbGF0cGlja3JDbGlja09wZW5zOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIHN0cmluZyBvZiBjaGFyYWN0ZXJzIHdoaWNoIGFyZSB1c2VkIHRvIGRlZmluZSBob3cgdGhlIGRhdGUgd2lsbCBiZVxyXG5cdCAqIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQgYm94LlxyXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8gZm9yIHN1cHBvcnRlZCB0b2tlbnMuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCJZLW0tZFwiXHJcblx0ICovXHJcblx0QElucHV0KCAnZGF0ZUZvcm1hdCcgKSBwdWJsaWMgZmxhdHBpY2tyRGF0ZUZvcm1hdDogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBpbml0aWFsIHNlbGVjdGVkIGRhdGUocykuXHJcblx0ICpcclxuXHQgKiBJZiB5b3UncmUgdXNpbmcge21vZGU6IFwibXVsdGlwbGVcIn0gb3IgYSByYW5nZSBjYWxlbmRhciBzdXBwbHkgYW4gQXJyYXkgb2ZcclxuXHQgKiBEYXRlIG9iamVjdHMgb3IgYW4gQXJyYXkgb2YgZGF0ZSBzdHJpbmdzIHdoaWNoIGZvbGxvdyB5b3VyIGRhdGVGb3JtYXQuXHJcblx0ICpcclxuXHQgKiBPdGhlcndpc2UsIHlvdSBjYW4gc3VwcGx5IGEgc2luZ2xlIERhdGUgb2JqZWN0IG9yIGEgZGF0ZSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2RlZmF1bHREYXRlJyApIHB1YmxpYyBmbGF0cGlja3JEZWZhdWx0RGF0ZTogc3RyaW5nIHwgRGF0ZTtcclxuXHJcblx0LyoqXHJcblx0ICogRGlzYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBkaXNhYmxlXHJcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1zcGVjaWZpYy1kYXRlc1xyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFtdXHJcblx0ICovXHJcblx0QElucHV0KCAnZGlzYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZTogc3RyaW5nW10gfCBEYXRlW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBkaXNhYmxlTW9iaWxlIHRvIHRydWUgdG8gYWx3YXlzIHVzZSB0aGUgbm9uLW5hdGl2ZSBwaWNrZXIuIEJ5XHJcblx0ICogZGVmYXVsdCwgRmxhdHBpY2tyIHV0aWxpemVzIG5hdGl2ZSBkYXRldGltZSB3aWRnZXRzIHVubGVzcyBjZXJ0YWluXHJcblx0ICogb3B0aW9ucyAoZS5nLiBkaXNhYmxlKSBhcmUgdXNlZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2Rpc2FibGVNb2JpbGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGVNb2JpbGU6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBlbmFibGVcclxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLWFsbC1kYXRlcy1leGNlcHQtc2VsZWN0LWZld1xyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIFtdXHJcblx0ICovXHJcblx0QElucHV0KCAnZW5hYmxlJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzIHRpbWUgcGlja2VyLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnZW5hYmxlVGltZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlVGltZTogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyBzZWNvbmRzIGluIHRoZSB0aW1lIHBpY2tlci5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ2VuYWJsZVNlY29uZHMnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVNlY29uZHM6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBob3VyIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIDFcclxuXHQgKi9cclxuXHRASW5wdXQoICdob3VySW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JIb3VySW5jcmVtZW50OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXlzIHRoZSBjYWxlbmRhciBpbmxpbmUuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdpbmxpbmUnICkgcHVibGljIGZsYXRwaWNrcklubGluZTogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVXNlIGEgc3BlY2lmaWMgbG9jYWxlIGZvciB0aGUgZmxhdHBpY2tyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdsb2NhbGUnICkgcHVibGljIGZsYXRwaWNrckxvY2FsZTogT2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBwaWNrIHRvIChpbmNsdXNpdmUpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRASW5wdXQoICdtYXhEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNYXhEYXRlOiBzdHJpbmcgfCBEYXRlO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBzdGFydCBwaWNraW5nIGZyb20gKGluY2x1c2l2ZSkuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ21pbkRhdGUnICkgcHVibGljIGZsYXRwaWNrck1pbkRhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBtaW51dGUgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgNVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ21pbnV0ZUluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tyTWludXRlSW5jcmVtZW50OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiwgb3IgXCJyYW5nZVwiXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgXCJzaW5nbGVcIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ21vZGUnICkgcHVibGljIGZsYXRwaWNrck1vZGU6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogSFRNTCBmb3IgdGhlIGFycm93IGljb24sIHVzZWQgdG8gc3dpdGNoIG1vbnRocy5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIj5cIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ25leHRBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyTmV4dEFycm93OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBkYXkgc2VsZWN0aW9uIGluIGNhbGVuZGFyLiBVc2UgaXQgYWxvbmcgd2l0aCBlbmFibGVUaW1lIHRvXHJcblx0ICogY3JlYXRlIGEgdGltZSBwaWNrZXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdub0NhbGVuZGFyJyApIHB1YmxpYyBmbGF0cGlja3JOb0NhbGVuZGFyOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBGdW5jdGlvbiB0aGF0IGV4cGVjdHMgYSBkYXRlIHN0cmluZyBhbmQgbXVzdCByZXR1cm4gYSBEYXRlIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3BhcnNlRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyUGFyc2VEYXRlOiBGdW5jdGlvbjtcclxuXHJcblx0LyoqXHJcblx0ICogSFRNTCBmb3IgdGhlIGxlZnQgYXJyb3cgaWNvbi5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBcIjxcIlxyXG5cdCAqL1xyXG5cdEBJbnB1dCggJ3ByZXZBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyUHJldkFycm93OiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3cgdGhlIG1vbnRoIHVzaW5nIHRoZSBzaG9ydGhhbmQgdmVyc2lvbiAoaWUsIFNlcCBpbnN0ZWFkIG9mIFNlcHRlbWJlcikuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICdzaG9ydGhhbmRDdXJyZW50TW9udGgnICkgcHVibGljIGZsYXRwaWNrclNob3J0aGFuZEN1cnJlbnRNb250aDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogUG9zaXRpb24gdGhlIGNhbGVuZGFyIGluc2lkZSB0aGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxyXG5cdCAqIChMZWF2ZSBmYWxzZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcpLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnc3RhdGljJyApIHB1YmxpYyBmbGF0cGlja3JTdGF0aWM6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXlzIHRpbWUgcGlja2VyIGluIDI0IGhvdXIgbW9kZSB3aXRob3V0IEFNL1BNIHNlbGVjdGlvbiB3aGVuIGVuYWJsZWQuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICd0aW1lXzI0aHInICkgcHVibGljIGZsYXRwaWNrclRpbWVfMjRocjogYm9vbGVhbjtcclxuXHJcblx0QElucHV0KCAndXRjJyApIHB1YmxpYyBmbGF0cGlja3JVdGM6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZXMgZGlzcGxheSBvZiB3ZWVrIG51bWJlcnMgaW4gY2FsZW5kYXIuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgZmFsc2VcclxuXHQgKi9cclxuXHRASW5wdXQoICd3ZWVrTnVtYmVycycgKSBwdWJsaWMgZmxhdHBpY2tyV2Vla051bWJlcnM6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1c3RvbSBlbGVtZW50cyBhbmQgaW5wdXQgZ3JvdXBzLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIGZhbHNlXHJcblx0ICovXHJcblx0QElucHV0KCAnd3JhcCcgKSBwdWJsaWMgZmxhdHBpY2tyV3JhcDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogb25DaGFuZ2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSwgb3IgY2hhbmdlcyB0aGUgdGltZSBvbiBhIHNlbGVjdGVkIGRhdGUuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBPdXRwdXQoICdvbkNoYW5nZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIG9uQ2xvc2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxyXG5cdCAqXHJcblx0ICogRGVmYXVsdDogIG51bGxcclxuXHQgKi9cclxuXHRAT3V0cHV0KCAnb25DbG9zZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DbG9zZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0LyoqXHJcblx0ICogb25PcGVuIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZC5cclxuXHQgKlxyXG5cdCAqIERlZmF1bHQ6ICBudWxsXHJcblx0ICovXHJcblx0QE91dHB1dCggJ29uT3BlbicgKSBwdWJsaWMgZmxhdHBpY2tyT25PcGVuOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHQvKipcclxuXHQgKiBvblJlYWR5IGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIGNhbGVuZGFyIGlzIGluIGEgcmVhZHkgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBEZWZhdWx0OiAgbnVsbFxyXG5cdCAqL1xyXG5cdEBPdXRwdXQoICdvblJlYWR5JyApIHB1YmxpYyBmbGF0cGlja3JPblJlYWR5OiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHQvKiogQWxsb3cgZG91YmxlLWNsaWNraW5nIG9uIHRoZSBjb250cm9sIHRvIG9wZW4vY2xvc2UgaXQuICovXHJcblx0QEhvc3RMaXN0ZW5lciggJ2RibGNsaWNrJyApXHJcblx0cHVibGljIG9uQ2xpY2soKSB7XHJcblx0XHR0aGlzLmZsYXRwaWNrci50b2dnbGUoKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNoYW5nZTogRnVuY3Rpb247XHJcblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2xvc2U6IEZ1bmN0aW9uO1xyXG5cdHByb3RlY3RlZCBnbG9iYWxPbk9wZW46IEZ1bmN0aW9uO1xyXG5cdHByb3RlY3RlZCBnbG9iYWxPblJlYWR5OiBGdW5jdGlvbjtcclxuXHJcblx0cHJvdGVjdGVkIGZsYXRwaWNrcjogRmxhdHBpY2tySW5zdGFuY2U7XHJcblx0cHJvdGVjdGVkIGZvcm1Db250cm9sTGlzdGVuZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcblx0LyoqIEFsbG93IGFjY2VzcyBwcm9wZXJ0aWVzIHVzaW5nIGluZGV4IG5vdGF0aW9uICovXHJcblx0W2tleTpzdHJpbmddOiBhbnk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJvdGVjdGVkIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcclxuXHRcdHByb3RlY3RlZCBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcclxuXHRcdHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG5cdFx0cHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuXHQpIHt9XHJcblxyXG5cdGdldCBjb250cm9sKCk6IEZvcm1Db250cm9sIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxyXG5cdFx0XHRyYW5kb21pemUgdGhlIGRhdGUgd2hlbiB0aGUgZm9ybSBjb250cm9sIGluaXRpYWxpemVzLiAqL1xyXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuXHJcblx0XHRpZiAodHlwZW9mIG5hdGl2ZUVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IG5hdGl2ZUVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGF0YS1pbnB1dCcsICcnICk7XHJcblx0XHRcdG5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mbGF0cGlja3IgPSA8RmxhdHBpY2tySW5zdGFuY2U+bmF0aXZlRWxlbWVudC5mbGF0cGlja3IoIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyApO1xyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XHJcblx0XHRpZiggdGhpcy5mbGF0cGlja3JcclxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JBbHRJbnB1dFxyXG5cdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAncGxhY2Vob2xkZXInICkgXHJcblx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XHJcblx0XHRcdFx0dGhpcy5mbGF0cGlja3IuYWx0SW5wdXQuc2V0QXR0cmlidXRlKCAncGxhY2Vob2xkZXInLCBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICk7XHJcblx0XHRcdH1cclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyKSB7XHJcblx0XHRcdHRoaXMuZmxhdHBpY2tyLmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5mb3JtQ29udHJvbExpc3RlbmVyKSB7XHJcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZSA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuZmxhdHBpY2tyT25DbG9zZSA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5ID0gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbE9uQ2hhbmdlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2hhbmdlO1xyXG5cdFx0dGhpcy5nbG9iYWxPbkNsb3NlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2xvc2U7XHJcblx0XHR0aGlzLmdsb2JhbE9uT3BlbiA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbk9wZW47XHJcblx0XHR0aGlzLmdsb2JhbE9uUmVhZHkgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25SZWFkeTtcclxuXHJcblx0XHR0aGlzLmZsYXRwaWNrck9wdGlvbnMgPSB7XHJcblx0XHRcdGFsdEZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2FsdEZvcm1hdCcpLFxyXG5cdFx0XHRhbHRJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0JyksXHJcblx0XHRcdGFsdElucHV0Q2xhc3M6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dENsYXNzJyksXHJcblx0XHRcdGFsbG93SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbGxvd0lucHV0JyksXHJcblx0XHRcdGFwcGVuZFRvOiB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSxcclxuXHRcdFx0Y2xpY2tPcGVuczogdGhpcy5nZXRPcHRpb24oJ2NsaWNrT3BlbnMnLCB0cnVlKSxcclxuXHRcdFx0ZGF0ZUZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2RhdGVGb3JtYXQnKSxcclxuXHRcdFx0ZGVmYXVsdERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdkZWZhdWx0RGF0ZScpLFxyXG5cdFx0XHRkaXNhYmxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZScpLFxyXG5cdFx0XHRkaXNhYmxlTW9iaWxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZU1vYmlsZScpLFxyXG5cdFx0XHRlbmFibGU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGUnKSxcclxuXHRcdFx0ZW5hYmxlVGltZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVRpbWUnKSxcclxuXHRcdFx0ZW5hYmxlU2Vjb25kczogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVNlY29uZHMnKSxcclxuXHRcdFx0aG91ckluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ2hvdXJJbmNyZW1lbnQnKSxcclxuXHRcdFx0aW5saW5lOiB0aGlzLmdldE9wdGlvbignaW5saW5lJyksXHJcblx0XHRcdGxvY2FsZTogdGhpcy5nZXRPcHRpb24oJ2xvY2FsZScpLFxyXG5cdFx0XHRtYXhEYXRlOiB0aGlzLmdldE9wdGlvbignbWF4RGF0ZScpLFxyXG5cdFx0XHRtaW5EYXRlOiB0aGlzLmdldE9wdGlvbignbWluRGF0ZScpLFxyXG5cdFx0XHRtaW51dGVJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdtaW51dGVJbmNyZW1lbnQnKSxcclxuXHRcdFx0bW9kZTogdGhpcy5nZXRPcHRpb24oJ21vZGUnKSxcclxuXHRcdFx0bmV4dEFycm93OiB0aGlzLmdldE9wdGlvbignbmV4dEFycm93JyksXHJcblx0XHRcdG5vQ2FsZW5kYXI6IHRoaXMuZ2V0T3B0aW9uKCdub0NhbGVuZGFyJyksXHJcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmV2ZW50T25DaGFuZ2UuYmluZCh0aGlzKSxcclxuXHRcdFx0b25DbG9zZTogdGhpcy5ldmVudE9uQ2xvc2UuYmluZCh0aGlzKSxcclxuXHRcdFx0b25PcGVuOiB0aGlzLmV2ZW50T25PcGVuLmJpbmQodGhpcyksXHJcblx0XHRcdG9uUmVhZHk6IHRoaXMuZXZlbnRPblJlYWR5LmJpbmQodGhpcyksXHJcblx0XHRcdHBhcnNlRGF0ZTogdGhpcy5nZXRPcHRpb24oJ3BhcnNlRGF0ZScpLFxyXG5cdFx0XHRwcmV2QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCdwcmV2QXJyb3cnKSxcclxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXHJcblx0XHRcdHN0YXRpYzogdGhpcy5nZXRPcHRpb24oJ3N0YXRpYycpLFxyXG5cdFx0XHR0aW1lXzI0aHI6IHRoaXMuZ2V0T3B0aW9uKCd0aW1lXzI0aHInKSxcclxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXHJcblx0XHRcdHdlZWtOdW1iZXJzOiB0aGlzLmdldE9wdGlvbignd2Vla051bWJlcnMnKSxcclxuXHRcdFx0d3JhcDogdGhpcy5nZXRPcHRpb24oJ3dyYXAnLCB0cnVlKSxcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIHVuc2V0IHByb3BlcnRpZXNcclxuXHRcdE9iamVjdC5rZXlzKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKS5mb3JFYWNoKCAoIGtleTogc3RyaW5nICkgPT4ge1xyXG5cdFx0XHQodGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkgJiZcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XHJcblx0XHR9ICk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXHJcblx0XHRcdFx0LnN1YnNjcmliZSggKCB2YWx1ZTogYW55ICkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCAhKCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgKSApIHtcclxuXHRcdFx0XHRcdFx0Ly8gUXVpZXRseSB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgdG8gYmUgYVxyXG5cdFx0XHRcdFx0XHQvLyBEYXRlIG9iamVjdC4gVGhpcyBhdm9pZHMgYW55IGV4dGVybmFsIHN1YnNjcmliZXJzXHJcblx0XHRcdFx0XHRcdC8vIGZyb20gYmVpbmcgbm90aWZpZWQgYSBzZWNvbmQgdGltZSAob25jZSBmb3IgdGhlIHVzZXJcclxuXHRcdFx0XHRcdFx0Ly8gaW5pdGlhdGVkIGV2ZW50LCBhbmQgb25jZSBmb3Igb3VyIGNvbnZlcnNpb24gdG9cclxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSgpKS5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb250cm9sLnNldFZhbHVlKCBuZXcgRGF0ZSggJycgKyB2YWx1ZSApLCB7XHJcblx0XHRcdFx0XHRcdFx0b25seVNlbGY6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0ZW1pdEV2ZW50OiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2VcclxuXHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGV2ZW50T25DaGFuZ2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xyXG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcclxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXHJcblx0XHR9O1xyXG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2hhbmdlICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoIGV2ZW50ICk7XHJcblx0XHR9XHJcblx0XHRpZiggdGhpcy5nbG9iYWxPbkNoYW5nZSApIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZXZlbnRPbkNsb3NlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcclxuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXHJcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxyXG5cdFx0fTtcclxuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNsb3NlICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UuZW1pdCggZXZlbnQgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2xvc2UgKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsT25DbG9zZSggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBldmVudE9uT3Blbiggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XHJcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xyXG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxyXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxyXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2VcclxuXHRcdH07XHJcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25PcGVuICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KCBldmVudCApO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25PcGVuICkge1xyXG5cdFx0XHR0aGlzLmdsb2JhbE9uT3BlbiggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZXZlbnRPblJlYWR5KCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcclxuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXHJcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxyXG5cdFx0fTtcclxuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPblJlYWR5ICkge1xyXG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdCggZXZlbnQgKTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uUmVhZHkgKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsT25SZWFkeSggZXZlbnQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3Igb3B0aW9uIHtvcHRpb259LCBvciB7ZGVmYXVsdFZhbHVlfSBpZiBpdFxyXG5cdCAqIGRvZXNuJ3QgZXhpc3QuXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGdldE9wdGlvbiggb3B0aW9uOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSApOiBhbnkge1xyXG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZyggMCwgMSApLnRvVXBwZXJDYXNlKClcclxuXHRcdFx0KyBvcHRpb24uc3Vic3RyaW5nKCAxICk7XHJcblxyXG5cdFx0aWYgKCB0eXBlb2YgdGhpc1tsb2NhbE5hbWVdICE9PSAndW5kZWZpbmVkJyApIHtcclxuXHRcdFx0cmV0dXJuIHRoaXNbbG9jYWxOYW1lXTtcclxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==