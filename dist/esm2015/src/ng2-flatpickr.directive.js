import { __decorate } from "tslib";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
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
            this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
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
    { type: Renderer2 }
];
__decorate([
    Input('flatpickr')
], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
__decorate([
    Input('placeholder')
], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
__decorate([
    Input('altFormat')
], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
__decorate([
    Input('altInput')
], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
__decorate([
    Input('altInputClass')
], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
__decorate([
    Input('allowInput')
], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
__decorate([
    Input('appendTo')
], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
__decorate([
    Input('clickOpens')
], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
__decorate([
    Input('dateFormat')
], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
__decorate([
    Input('defaultDate')
], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
__decorate([
    Input('disable')
], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
__decorate([
    Input('disableMobile')
], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
__decorate([
    Input('enable')
], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
__decorate([
    Input('enableTime')
], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
__decorate([
    Input('enableSeconds')
], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
__decorate([
    Input('hourIncrement')
], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
__decorate([
    Input('inline')
], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
__decorate([
    Input('locale')
], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
__decorate([
    Input('maxDate')
], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
__decorate([
    Input('minDate')
], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
__decorate([
    Input('minuteIncrement')
], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
__decorate([
    Input('mode')
], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
__decorate([
    Input('nextArrow')
], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
__decorate([
    Input('noCalendar')
], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
__decorate([
    Input('parseDate')
], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
__decorate([
    Input('prevArrow')
], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
__decorate([
    Input('shorthandCurrentMonth')
], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
__decorate([
    Input('static')
], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
__decorate([
    Input('time_24hr')
], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
__decorate([
    Input('utc')
], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
__decorate([
    Input('weekNumbers')
], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
__decorate([
    Input('wrap')
], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
__decorate([
    Output('onChange')
], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
__decorate([
    Output('onClose')
], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
__decorate([
    Output('onOpen')
], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
__decorate([
    Output('onReady')
], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
__decorate([
    HostListener('dblclick')
], Ng2FlatpickrDirective.prototype, "onClick", null);
Ng2FlatpickrDirective = __decorate([
    Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' })
], Ng2FlatpickrDirective);
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEssT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8xRSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQTJSakMsWUFDVyxNQUF3QixFQUN4QixTQUFvQixFQUNwQixPQUFtQixFQUNuQixRQUFtQjtRQUhuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWpEOUI7Ozs7V0FJRztRQUMwQixzQkFBaUIsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRzs7OztXQUlHO1FBQ3lCLHFCQUFnQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhHOzs7O1dBSUc7UUFDd0Isb0JBQWUsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5Rjs7OztXQUlHO1FBQ3lCLHFCQUFnQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBd0I3RixDQUFDO0lBdEJKLDZEQUE2RDtJQUV0RCxPQUFPO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBb0JELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLE1B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Q0FBRTsrREFBd0M7QUFPL0I7SUFBM0IsS0FBSyxDQUFFLGlCQUFpQixDQUFFO3VFQUF5QztBQU9uRDtJQUFoQixLQUFLLENBQUUsTUFBTSxDQUFFOzREQUE4QjtBQU94QjtJQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFO2lFQUFtQztBQVFqQztJQUF0QixLQUFLLENBQUUsWUFBWSxDQUFFO2tFQUFxQztBQU9yQztJQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFO2lFQUFxQztBQU9wQztJQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFO2lFQUFtQztBQU90QjtJQUFqQyxLQUFLLENBQUUsdUJBQXVCLENBQUU7NkVBQWdEO0FBUTlEO0lBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7OERBQWlDO0FBTzdCO0lBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7aUVBQW9DO0FBRXpDO0lBQWYsS0FBSyxDQUFFLEtBQUssQ0FBRTsyREFBOEI7QUFPckI7SUFBdkIsS0FBSyxDQUFFLGFBQWEsQ0FBRTttRUFBc0M7QUFPNUM7SUFBaEIsS0FBSyxDQUFFLE1BQU0sQ0FBRTs0REFBK0I7QUFPekI7SUFBckIsTUFBTSxDQUFFLFVBQVUsQ0FBRTtnRUFBNkU7QUFPN0U7SUFBcEIsTUFBTSxDQUFFLFNBQVMsQ0FBRTsrREFBNEU7QUFPNUU7SUFBbkIsTUFBTSxDQUFFLFFBQVEsQ0FBRTs4REFBMkU7QUFPekU7SUFBcEIsTUFBTSxDQUFFLFNBQVMsQ0FBRTsrREFBNEU7QUFJaEc7SUFEQyxZQUFZLENBQUUsVUFBVSxDQUFFO29EQUcxQjtBQTlRVyxxQkFBcUI7SUFEakMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUM7R0FDckQscUJBQXFCLENBNmVqQztTQTdlWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2ZsYXRwaWNrcl0nLCBleHBvcnRBczogJ25nMi1mbGF0cGlja3InIH0pXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdC8qKlxuXHQgKiBUaGUgZmxhdHBpY2tyIGNvbmZpZ3VyYXRpb24gYXMgYSBzaW5nbGUgb2JqZWN0IG9mIHZhbHVlcy5cblx0ICpcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxuXHQgKi9cblx0QElucHV0KCAnZmxhdHBpY2tyJyApIHB1YmxpYyBmbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBQbGFjZWhvbGRlciBmb3IgaW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdwbGFjZWhvbGRlcicgKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXG5cdCAqL1xuXHRASW5wdXQoICdhbHRGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckFsdEZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB1c2VyIGEgcmVhZGFibGUgZGF0ZSAoYXMgcGVyIGFsdEZvcm1hdCksIGJ1dCByZXR1cm4gc29tZXRoaW5nXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGlzIGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgY3JlYXRlZCBieSB0aGUgYWx0SW5wdXRcblx0ICogb3B0aW9uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJcIlxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXRDbGFzcycgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcblx0ICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2FsbG93SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsbG93SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluc3RlYWQgb2YgYm9keSwgYXBwZW5kcyB0aGUgY2FsZW5kYXIgdG8gdGhlIHNwZWNpZmllZCBub2RlIGluc3RlYWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdhcHBlbmRUbycgKSBwdWJsaWMgZmxhdHBpY2tyQXBwZW5kVG86IGFueTsgLy8gSFRNTEVsZW1lbnRcblxuXHQvKipcblx0ICogV2hldGhlciBjbGlja2luZyBvbiB0aGUgaW5wdXQgc2hvdWxkIG9wZW4gdGhlIHBpY2tlci5cblx0ICogWW91IGNvdWxkIGRpc2FibGUgdGhpcyBpZiB5b3Ugd2lzaCB0byBvcGVuIHRoZSBjYWxlbmRhciBtYW51YWxseVxuXHQgKiB3aXRoLm9wZW4oKS5cblx0ICpcblx0ICogRGVmYXVsdDogIHRydWVcblx0ICovXG5cdEBJbnB1dCggJ2NsaWNrT3BlbnMnICkgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXG5cdCAqIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQgYm94LlxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJZLW0tZFwiXG5cdCAqL1xuXHRASW5wdXQoICdkYXRlRm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JEYXRlRm9ybWF0OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGluaXRpYWwgc2VsZWN0ZWQgZGF0ZShzKS5cblx0ICpcblx0ICogSWYgeW91J3JlIHVzaW5nIHttb2RlOiBcIm11bHRpcGxlXCJ9IG9yIGEgcmFuZ2UgY2FsZW5kYXIgc3VwcGx5IGFuIEFycmF5IG9mXG5cdCAqIERhdGUgb2JqZWN0cyBvciBhbiBBcnJheSBvZiBkYXRlIHN0cmluZ3Mgd2hpY2ggZm9sbG93IHlvdXIgZGF0ZUZvcm1hdC5cblx0ICpcblx0ICogT3RoZXJ3aXNlLCB5b3UgY2FuIHN1cHBseSBhIHNpbmdsZSBEYXRlIG9iamVjdCBvciBhIGRhdGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnZGVmYXVsdERhdGUnICkgcHVibGljIGZsYXRwaWNrckRlZmF1bHREYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGRpc2FibGVcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1zcGVjaWZpYy1kYXRlc1xuXHQgKlxuXHQgKiBEZWZhdWx0OiAgW11cblx0ICovXG5cdEBJbnB1dCggJ2Rpc2FibGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBTZXQgZGlzYWJsZU1vYmlsZSB0byB0cnVlIHRvIGFsd2F5cyB1c2UgdGhlIG5vbi1uYXRpdmUgcGlja2VyLiBCeVxuXHQgKiBkZWZhdWx0LCBGbGF0cGlja3IgdXRpbGl6ZXMgbmF0aXZlIGRhdGV0aW1lIHdpZGdldHMgdW5sZXNzIGNlcnRhaW5cblx0ICogb3B0aW9ucyAoZS5nLiBkaXNhYmxlKSBhcmUgdXNlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdkaXNhYmxlTW9iaWxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctYWxsLWRhdGVzLWV4Y2VwdC1zZWxlY3QtZmV3XG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZVRpbWUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlU2Vjb25kcycgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlU2Vjb25kczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIGhvdXIgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICAxXG5cdCAqL1xuXHRASW5wdXQoICdob3VySW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JIb3VySW5jcmVtZW50OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIERpc3BsYXlzIHRoZSBjYWxlbmRhciBpbmxpbmUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnaW5saW5lJyApIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2xvY2FsZScgKSBwdWJsaWMgZmxhdHBpY2tyTG9jYWxlOiBPYmplY3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHBpY2sgdG8gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdtYXhEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNYXhEYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBzdGFydCBwaWNraW5nIGZyb20gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdtaW5EYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgNVxuXHQgKi9cblx0QElucHV0KCAnbWludXRlSW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JNaW51dGVJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogXCJzaW5nbGVcIiwgXCJtdWx0aXBsZVwiLCBvciBcInJhbmdlXCJcblx0ICpcblx0ICogRGVmYXVsdDogIFwic2luZ2xlXCJcblx0ICovXG5cdEBJbnB1dCggJ21vZGUnICkgcHVibGljIGZsYXRwaWNrck1vZGU6IHN0cmluZztcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGFycm93IGljb24sIHVzZWQgdG8gc3dpdGNoIG1vbnRocy5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPlwiXG5cdCAqL1xuXHRASW5wdXQoICduZXh0QXJyb3cnICkgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xuXHQgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdub0NhbGVuZGFyJyApIHB1YmxpYyBmbGF0cGlja3JOb0NhbGVuZGFyOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0aGF0IGV4cGVjdHMgYSBkYXRlIHN0cmluZyBhbmQgbXVzdCByZXR1cm4gYSBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdwYXJzZURhdGUnICkgcHVibGljIGZsYXRwaWNrclBhcnNlRGF0ZTogRnVuY3Rpb247XG5cblx0LyoqXG5cdCAqIEhUTUwgZm9yIHRoZSBsZWZ0IGFycm93IGljb24uXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIjxcIlxuXHQgKi9cblx0QElucHV0KCAncHJldkFycm93JyApIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdzaG9ydGhhbmRDdXJyZW50TW9udGgnICkgcHVibGljIGZsYXRwaWNrclNob3J0aGFuZEN1cnJlbnRNb250aDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUG9zaXRpb24gdGhlIGNhbGVuZGFyIGluc2lkZSB0aGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxuXHQgKiAoTGVhdmUgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdzdGF0aWMnICkgcHVibGljIGZsYXRwaWNrclN0YXRpYzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGltZSBwaWNrZXIgaW4gMjQgaG91ciBtb2RlIHdpdGhvdXQgQU0vUE0gc2VsZWN0aW9uIHdoZW4gZW5hYmxlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd0aW1lXzI0aHInICkgcHVibGljIGZsYXRwaWNrclRpbWVfMjRocjogYm9vbGVhbjtcblxuXHRASW5wdXQoICd1dGMnICkgcHVibGljIGZsYXRwaWNrclV0YzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBkaXNwbGF5IG9mIHdlZWsgbnVtYmVycyBpbiBjYWxlbmRhci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd3ZWVrTnVtYmVycycgKSBwdWJsaWMgZmxhdHBpY2tyV2Vla051bWJlcnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEN1c3RvbSBlbGVtZW50cyBhbmQgaW5wdXQgZ3JvdXBzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3dyYXAnICkgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uQ2hhbmdlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNoYW5nZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25DbG9zZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBjbG9zZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25DbG9zZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DbG9zZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25PcGVuIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbk9wZW4nICkgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uUmVhZHknICkgcHVibGljIGZsYXRwaWNrck9uUmVhZHk6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqIEFsbG93IGRvdWJsZS1jbGlja2luZyBvbiB0aGUgY29udHJvbCB0byBvcGVuL2Nsb3NlIGl0LiAqL1xuXHRASG9zdExpc3RlbmVyKCAnZGJsY2xpY2snIClcblx0cHVibGljIG9uQ2xpY2soKSB7XG5cdFx0dGhpcy5mbGF0cGlja3IudG9nZ2xlKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DbG9zZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbk9wZW46IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25SZWFkeTogRnVuY3Rpb247XG5cblx0cHJvdGVjdGVkIGZsYXRwaWNrcjogRmxhdHBpY2tySW5zdGFuY2U7XG5cdHByb3RlY3RlZCBmb3JtQ29udHJvbExpc3RlbmVyOiBTdWJzY3JpcHRpb247XG5cblx0LyoqIEFsbG93IGFjY2VzcyBwcm9wZXJ0aWVzIHVzaW5nIGluZGV4IG5vdGF0aW9uICovXG5cdFtrZXk6c3RyaW5nXTogYW55O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG5cdFx0cHJvdGVjdGVkIG5nQ29udHJvbDogTmdDb250cm9sLFxuXHRcdHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxuXHRcdHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG5cdCkge31cblxuXHRnZXQgY29udHJvbCgpOiBGb3JtQ29udHJvbCB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZS5nZXRDb250cm9sKHRoaXMubmdDb250cm9sKSA6IG51bGw7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxuXHRcdFx0cmFuZG9taXplIHRoZSBkYXRlIHdoZW4gdGhlIGZvcm0gY29udHJvbCBpbml0aWFsaXplcy4gKi9cblx0XHRsZXQgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHR5cGVvZiBuYXRpdmVFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBuYXRpdmVFbGVtZW50ID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyAnRXJyb3I6IGludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWQnO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9wdGlvbnMud3JhcCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGF0YS1pbnB1dCcsICcnICk7XG5cdFx0XHRuYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyID0gPEZsYXRwaWNrckluc3RhbmNlPm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuXHRcdGlmKCB0aGlzLmZsYXRwaWNrclxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JBbHRJbnB1dFxuXHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApXG5cdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHR0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2U7XG5cdFx0dGhpcy5nbG9iYWxPbkNsb3NlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2xvc2U7XG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xuXHRcdHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5O1xuXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdFx0YWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXG5cdFx0XHRhbHRJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0JyksXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxuXHRcdFx0YWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcblx0XHRcdGFwcGVuZFRvOiB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSxcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXG5cdFx0XHRkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxuXHRcdFx0ZGVmYXVsdERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdkZWZhdWx0RGF0ZScpLFxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcblx0XHRcdGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXG5cdFx0XHRlbmFibGU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGUnKSxcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXG5cdFx0XHRlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxuXHRcdFx0aG91ckluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ2hvdXJJbmNyZW1lbnQnKSxcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxuXHRcdFx0bG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXG5cdFx0XHRtYXhEYXRlOiB0aGlzLmdldE9wdGlvbignbWF4RGF0ZScpLFxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcblx0XHRcdG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxuXHRcdFx0bW9kZTogdGhpcy5nZXRPcHRpb24oJ21vZGUnKSxcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxuXHRcdFx0bm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmV2ZW50T25DaGFuZ2UuYmluZCh0aGlzKSxcblx0XHRcdG9uQ2xvc2U6IHRoaXMuZXZlbnRPbkNsb3NlLmJpbmQodGhpcyksXG5cdFx0XHRvbk9wZW46IHRoaXMuZXZlbnRPbk9wZW4uYmluZCh0aGlzKSxcblx0XHRcdG9uUmVhZHk6IHRoaXMuZXZlbnRPblJlYWR5LmJpbmQodGhpcyksXG5cdFx0XHRwYXJzZURhdGU6IHRoaXMuZ2V0T3B0aW9uKCdwYXJzZURhdGUnKSxcblx0XHRcdHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXG5cdFx0XHRzdGF0aWM6IHRoaXMuZ2V0T3B0aW9uKCdzdGF0aWMnKSxcblx0XHRcdHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXG5cdFx0XHR3ZWVrTnVtYmVyczogdGhpcy5nZXRPcHRpb24oJ3dlZWtOdW1iZXJzJyksXG5cdFx0XHR3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxuXHRcdH07XG5cblx0XHQvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xuXHRcdE9iamVjdC5rZXlzKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKS5mb3JFYWNoKCAoIGtleTogc3RyaW5nICkgPT4ge1xuXHRcdFx0KHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpICYmXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XTtcblx0XHR9ICk7XG5cblx0XHRpZiAodGhpcy5jb250cm9sKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXG5cdFx0XHRcdC5zdWJzY3JpYmUoICggdmFsdWU6IGFueSApID0+IHtcblx0XHRcdFx0XHRpZiAoICEoIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSApICkge1xuXHRcdFx0XHRcdFx0Ly8gUXVpZXRseSB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgdG8gYmUgYVxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSBvYmplY3QuIFRoaXMgYXZvaWRzIGFueSBleHRlcm5hbCBzdWJzY3JpYmVyc1xuXHRcdFx0XHRcdFx0Ly8gZnJvbSBiZWluZyBub3RpZmllZCBhIHNlY29uZCB0aW1lIChvbmNlIGZvciB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8gaW5pdGlhdGVkIGV2ZW50LCBhbmQgb25jZSBmb3Igb3VyIGNvbnZlcnNpb24gdG9cblx0XHRcdFx0XHRcdC8vIERhdGUoKSkuXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRyb2wuc2V0VmFsdWUoIG5ldyBEYXRlKCAnJyArIHZhbHVlICksIHtcblx0XHRcdFx0XHRcdFx0b25seVNlbGY6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGVtaXRFdmVudDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2Vcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2xvc2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DbG9zZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DbG9zZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25PcGVuKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uT3BlbiggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uUmVhZHkoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25SZWFkeSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25SZWFkeSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XG5cdCAqIGRvZXNuJ3QgZXhpc3QuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZ2V0T3B0aW9uKCBvcHRpb246IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55ICk6IGFueSB7XG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZyggMCwgMSApLnRvVXBwZXJDYXNlKClcblx0XHRcdCsgb3B0aW9uLnN1YnN0cmluZyggMSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgdGhpc1tsb2NhbE5hbWVdICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzW2xvY2FsTmFtZV07XG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==