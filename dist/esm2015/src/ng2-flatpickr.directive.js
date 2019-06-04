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
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFDbkMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFlLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBMlJqQyxZQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMs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Q0FBRTs7a0VBQXFDO0FBT3JDO0lBQXJCLEtBQUssQ0FBRSxXQUFXLENBQUU7c0NBQTRCLFFBQVE7aUVBQUM7QUFPcEM7SUFBckIsS0FBSyxDQUFFLFdBQVcsQ0FBRTs7aUVBQW1DO0FBT3RCO0lBQWpDLEtBQUssQ0FBRSx1QkFBdUIsQ0FBRTs7NkVBQWdEO0FBUTlEO0lBQWxCLEtBQUssQ0FBRSxRQUFRLENBQUU7OzhEQUFpQztBQU83QjtJQUFyQixLQUFLLENBQUUsV0FBVyxDQUFFOztpRUFBb0M7QUFFekM7SUFBZixLQUFLLENBQUUsS0FBSyxDQUFFOzsyREFBOEI7QUFPckI7SUFBdkIsS0FBSyxDQUFFLGFBQWEsQ0FBRTs7bUVBQXNDO0FBTzVDO0lBQWhCLEtBQUssQ0FBRSxNQUFNLENBQUU7OzREQUErQjtBQU96QjtJQUFyQixNQUFNLENBQUUsVUFBVSxDQUFFO3NDQUEyQixZQUFZO2dFQUFzQztBQU83RTtJQUFwQixNQUFNLENBQUUsU0FBUyxDQUFFO3NDQUEwQixZQUFZOytEQUFzQztBQU81RTtJQUFuQixNQUFNLENBQUUsUUFBUSxDQUFFO3NDQUF5QixZQUFZOzhEQUFzQztBQU96RTtJQUFwQixNQUFNLENBQUUsU0FBUyxDQUFFO3NDQUEwQixZQUFZOytEQUFzQztBQUloRztJQURDLFlBQVksQ0FBRSxVQUFVLENBQUU7Ozs7b0RBRzFCO0FBOVFXLHFCQUFxQjtJQURqQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQzs2Q0E2UjlDLGdCQUFnQjtRQUNiLFNBQVM7UUFDWCxVQUFVO1FBQ1QsUUFBUTtHQS9SakIscUJBQXFCLENBNmVqQztTQTdlWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2ZsYXRwaWNrcl0nLCBleHBvcnRBczogJ25nMi1mbGF0cGlja3InIH0pXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdC8qKlxuXHQgKiBUaGUgZmxhdHBpY2tyIGNvbmZpZ3VyYXRpb24gYXMgYSBzaW5nbGUgb2JqZWN0IG9mIHZhbHVlcy5cblx0ICpcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxuXHQgKi9cblx0QElucHV0KCAnZmxhdHBpY2tyJyApIHB1YmxpYyBmbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBQbGFjZWhvbGRlciBmb3IgaW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdwbGFjZWhvbGRlcicgKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXG5cdCAqL1xuXHRASW5wdXQoICdhbHRGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckFsdEZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB1c2VyIGEgcmVhZGFibGUgZGF0ZSAoYXMgcGVyIGFsdEZvcm1hdCksIGJ1dCByZXR1cm4gc29tZXRoaW5nXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGlzIGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgY3JlYXRlZCBieSB0aGUgYWx0SW5wdXRcblx0ICogb3B0aW9uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJcIlxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXRDbGFzcycgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcblx0ICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2FsbG93SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsbG93SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluc3RlYWQgb2YgYm9keSwgYXBwZW5kcyB0aGUgY2FsZW5kYXIgdG8gdGhlIHNwZWNpZmllZCBub2RlIGluc3RlYWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdhcHBlbmRUbycgKSBwdWJsaWMgZmxhdHBpY2tyQXBwZW5kVG86IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxuXHQgKiBZb3UgY291bGQgZGlzYWJsZSB0aGlzIGlmIHlvdSB3aXNoIHRvIG9wZW4gdGhlIGNhbGVuZGFyIG1hbnVhbGx5XG5cdCAqIHdpdGgub3BlbigpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgdHJ1ZVxuXHQgKi9cblx0QElucHV0KCAnY2xpY2tPcGVucycgKSBwdWJsaWMgZmxhdHBpY2tyQ2xpY2tPcGVuczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQSBzdHJpbmcgb2YgY2hhcmFjdGVycyB3aGljaCBhcmUgdXNlZCB0byBkZWZpbmUgaG93IHRoZSBkYXRlIHdpbGwgYmVcblx0ICogZGlzcGxheWVkIGluIHRoZSBpbnB1dCBib3guXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8gZm9yIHN1cHBvcnRlZCB0b2tlbnMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlktbS1kXCJcblx0ICovXG5cdEBJbnB1dCggJ2RhdGVGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckRhdGVGb3JtYXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogU2V0cyB0aGUgaW5pdGlhbCBzZWxlY3RlZCBkYXRlKHMpLlxuXHQgKlxuXHQgKiBJZiB5b3UncmUgdXNpbmcge21vZGU6IFwibXVsdGlwbGVcIn0gb3IgYSByYW5nZSBjYWxlbmRhciBzdXBwbHkgYW4gQXJyYXkgb2Zcblx0ICogRGF0ZSBvYmplY3RzIG9yIGFuIEFycmF5IG9mIGRhdGUgc3RyaW5ncyB3aGljaCBmb2xsb3cgeW91ciBkYXRlRm9ybWF0LlxuXHQgKlxuXHQgKiBPdGhlcndpc2UsIHlvdSBjYW4gc3VwcGx5IGEgc2luZ2xlIERhdGUgb2JqZWN0IG9yIGEgZGF0ZSBzdHJpbmcuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdkZWZhdWx0RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIERpc2FibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZGlzYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLXNwZWNpZmljLWRhdGVzXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCAnZGlzYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIFNldCBkaXNhYmxlTW9iaWxlIHRvIHRydWUgdG8gYWx3YXlzIHVzZSB0aGUgbm9uLW5hdGl2ZSBwaWNrZXIuIEJ5XG5cdCAqIGRlZmF1bHQsIEZsYXRwaWNrciB1dGlsaXplcyBuYXRpdmUgZGF0ZXRpbWUgd2lkZ2V0cyB1bmxlc3MgY2VydGFpblxuXHQgKiBvcHRpb25zIChlLmcuIGRpc2FibGUpIGFyZSB1c2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2Rpc2FibGVNb2JpbGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGVNb2JpbGU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBlbmFibGVcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcblx0ICpcblx0ICogRGVmYXVsdDogIFtdXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlVGltZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlVGltZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBzZWNvbmRzIGluIHRoZSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGVTZWNvbmRzJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVTZWNvbmRzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgaG91ciBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIDFcblx0ICovXG5cdEBJbnB1dCggJ2hvdXJJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrckhvdXJJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGhlIGNhbGVuZGFyIGlubGluZS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdpbmxpbmUnICkgcHVibGljIGZsYXRwaWNrcklubGluZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVXNlIGEgc3BlY2lmaWMgbG9jYWxlIGZvciB0aGUgZmxhdHBpY2tyIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbG9jYWxlJyApIHB1YmxpYyBmbGF0cGlja3JMb2NhbGU6IE9iamVjdDtcblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gcGljayB0byAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ21heERhdGUnICkgcHVibGljIGZsYXRwaWNrck1heERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHN0YXJ0IHBpY2tpbmcgZnJvbSAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ21pbkRhdGUnICkgcHVibGljIGZsYXRwaWNrck1pbkRhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBtaW51dGUgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICA1XG5cdCAqL1xuXHRASW5wdXQoICdtaW51dGVJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrck1pbnV0ZUluY3JlbWVudDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBcInNpbmdsZVwiLCBcIm11bHRpcGxlXCIsIG9yIFwicmFuZ2VcIlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJzaW5nbGVcIlxuXHQgKi9cblx0QElucHV0KCAnbW9kZScgKSBwdWJsaWMgZmxhdHBpY2tyTW9kZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgYXJyb3cgaWNvbiwgdXNlZCB0byBzd2l0Y2ggbW9udGhzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI+XCJcblx0ICovXG5cdEBJbnB1dCggJ25leHRBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyTmV4dEFycm93OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhpZGVzIHRoZSBkYXkgc2VsZWN0aW9uIGluIGNhbGVuZGFyLiBVc2UgaXQgYWxvbmcgd2l0aCBlbmFibGVUaW1lIHRvXG5cdCAqIGNyZWF0ZSBhIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ25vQ2FsZW5kYXInICkgcHVibGljIGZsYXRwaWNrck5vQ2FsZW5kYXI6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRoYXQgZXhwZWN0cyBhIGRhdGUgc3RyaW5nIGFuZCBtdXN0IHJldHVybiBhIERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3BhcnNlRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyUGFyc2VEYXRlOiBGdW5jdGlvbjtcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGxlZnQgYXJyb3cgaWNvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPFwiXG5cdCAqL1xuXHRASW5wdXQoICdwcmV2QXJyb3cnICkgcHVibGljIGZsYXRwaWNrclByZXZBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSBtb250aCB1c2luZyB0aGUgc2hvcnRoYW5kIHZlcnNpb24gKGllLCBTZXAgaW5zdGVhZCBvZiBTZXB0ZW1iZXIpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcgKSBwdWJsaWMgZmxhdHBpY2tyU2hvcnRoYW5kQ3VycmVudE1vbnRoOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBQb3NpdGlvbiB0aGUgY2FsZW5kYXIgaW5zaWRlIHRoZSB3cmFwcGVyIGFuZCBuZXh0IHRvIHRoZSBpbnB1dCBlbGVtZW50XG5cdCAqIChMZWF2ZSBmYWxzZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3N0YXRpYycgKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3RpbWVfMjRocicgKSBwdWJsaWMgZmxhdHBpY2tyVGltZV8yNGhyOiBib29sZWFuO1xuXG5cdEBJbnB1dCggJ3V0YycgKSBwdWJsaWMgZmxhdHBpY2tyVXRjOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIGRpc3BsYXkgb2Ygd2VlayBudW1iZXJzIGluIGNhbGVuZGFyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3dlZWtOdW1iZXJzJyApIHB1YmxpYyBmbGF0cGlja3JXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3VzdG9tIGVsZW1lbnRzIGFuZCBpbnB1dCBncm91cHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnd3JhcCcgKSBwdWJsaWMgZmxhdHBpY2tyV3JhcDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogb25DaGFuZ2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSwgb3IgY2hhbmdlcyB0aGUgdGltZSBvbiBhIHNlbGVjdGVkIGRhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25DaGFuZ2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbkNsb3NlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIGNsb3NlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbkNsb3NlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNsb3NlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbk9wZW4gZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uT3BlbicgKSBwdWJsaWMgZmxhdHBpY2tyT25PcGVuOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvblJlYWR5IGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIGNhbGVuZGFyIGlzIGluIGEgcmVhZHkgc3RhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25SZWFkeScgKSBwdWJsaWMgZmxhdHBpY2tyT25SZWFkeTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKiogQWxsb3cgZG91YmxlLWNsaWNraW5nIG9uIHRoZSBjb250cm9sIHRvIG9wZW4vY2xvc2UgaXQuICovXG5cdEBIb3N0TGlzdGVuZXIoICdkYmxjbGljaycgKVxuXHRwdWJsaWMgb25DbGljaygpIHtcblx0XHR0aGlzLmZsYXRwaWNrci50b2dnbGUoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNoYW5nZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPblJlYWR5OiBGdW5jdGlvbjtcblxuXHRwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZTtcblx0cHJvdGVjdGVkIGZvcm1Db250cm9sTGlzdGVuZXI6IFN1YnNjcmlwdGlvbjtcblxuXHQvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cblx0W2tleTpzdHJpbmddOiBhbnk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJvdGVjdGVkIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcblx0XHRwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG5cdFx0cHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG5cdFx0cHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlclxuXHQpIHt9XG5cblx0Z2V0IGNvbnRyb2woKTogRm9ybUNvbnRyb2wge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdC8qKiBXZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZmxhdHBpY2tyIGluc3RhbmNlIGluIG5nT25Jbml0KCk7IGl0IHdpbGxcblx0XHRcdHJhbmRvbWl6ZSB0aGUgZGF0ZSB3aGVuIHRoZSBmb3JtIGNvbnRyb2wgaW5pdGlhbGl6ZXMuICovXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmICh0eXBlb2YgbmF0aXZlRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgbmF0aXZlRWxlbWVudCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYXRhLWlucHV0JywgJycgKTtcblx0XHRcdG5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3IgPSA8RmxhdHBpY2tySW5zdGFuY2U+bmF0aXZlRWxlbWVudC5mbGF0cGlja3IoIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyApO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyXG5cdFx0XHQmJiB0aGlzLmZsYXRwaWNrckFsdElucHV0XG5cdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAncGxhY2Vob2xkZXInICkgXG5cdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHR0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2U7XG5cdFx0dGhpcy5nbG9iYWxPbkNsb3NlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2xvc2U7XG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xuXHRcdHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5O1xuXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdFx0YWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXG5cdFx0XHRhbHRJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0JyksXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxuXHRcdFx0YWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcblx0XHRcdGFwcGVuZFRvOiB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSxcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXG5cdFx0XHRkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxuXHRcdFx0ZGVmYXVsdERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdkZWZhdWx0RGF0ZScpLFxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcblx0XHRcdGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXG5cdFx0XHRlbmFibGU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGUnKSxcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXG5cdFx0XHRlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxuXHRcdFx0aG91ckluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ2hvdXJJbmNyZW1lbnQnKSxcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxuXHRcdFx0bG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXG5cdFx0XHRtYXhEYXRlOiB0aGlzLmdldE9wdGlvbignbWF4RGF0ZScpLFxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcblx0XHRcdG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxuXHRcdFx0bW9kZTogdGhpcy5nZXRPcHRpb24oJ21vZGUnKSxcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxuXHRcdFx0bm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmV2ZW50T25DaGFuZ2UsXG5cdFx0XHRvbkNsb3NlOiB0aGlzLmV2ZW50T25DbG9zZSxcblx0XHRcdG9uT3BlbjogdGhpcy5ldmVudE9uT3Blbixcblx0XHRcdG9uUmVhZHk6IHRoaXMuZXZlbnRPblJlYWR5LFxuXHRcdFx0cGFyc2VEYXRlOiB0aGlzLmdldE9wdGlvbigncGFyc2VEYXRlJyksXG5cdFx0XHRwcmV2QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCdwcmV2QXJyb3cnKSxcblx0XHRcdHNob3J0aGFuZEN1cnJlbnRNb250aDogdGhpcy5nZXRPcHRpb24oJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpLFxuXHRcdFx0c3RhdGljOiB0aGlzLmdldE9wdGlvbignc3RhdGljJyksXG5cdFx0XHR0aW1lXzI0aHI6IHRoaXMuZ2V0T3B0aW9uKCd0aW1lXzI0aHInKSxcblx0XHRcdHV0YzogdGhpcy5nZXRPcHRpb24oJ3V0YycpLFxuXHRcdFx0d2Vla051bWJlcnM6IHRoaXMuZ2V0T3B0aW9uKCd3ZWVrTnVtYmVycycpLFxuXHRcdFx0d3JhcDogdGhpcy5nZXRPcHRpb24oJ3dyYXAnLCB0cnVlKSxcblx0XHR9O1xuXG5cdFx0Ly8gUmVtb3ZlIHVuc2V0IHByb3BlcnRpZXNcblx0XHRPYmplY3Qua2V5cyggdGhpcy5mbGF0cGlja3JPcHRpb25zICkuZm9yRWFjaCggKCBrZXk6IHN0cmluZyApID0+IHtcblx0XHRcdCh0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSAmJlxuXHRcdFx0XHRkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XG5cdFx0fSApO1xuXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlc1xuXHRcdFx0XHQuc3Vic2NyaWJlKCAoIHZhbHVlOiBhbnkgKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCAhKCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgKSApIHtcblx0XHRcdFx0XHRcdC8vIFF1aWV0bHkgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sIHRvIGJlIGFcblx0XHRcdFx0XHRcdC8vIERhdGUgb2JqZWN0LiBUaGlzIGF2b2lkcyBhbnkgZXh0ZXJuYWwgc3Vic2NyaWJlcnNcblx0XHRcdFx0XHRcdC8vIGZyb20gYmVpbmcgbm90aWZpZWQgYSBzZWNvbmQgdGltZSAob25jZSBmb3IgdGhlIHVzZXJcblx0XHRcdFx0XHRcdC8vIGluaXRpYXRlZCBldmVudCwgYW5kIG9uY2UgZm9yIG91ciBjb252ZXJzaW9uIHRvXG5cdFx0XHRcdFx0XHQvLyBEYXRlKCkpLlxuXHRcdFx0XHRcdFx0dGhpcy5jb250cm9sLnNldFZhbHVlKCBuZXcgRGF0ZSggJycgKyB2YWx1ZSApLCB7XG5cdFx0XHRcdFx0XHRcdG9ubHlTZWxmOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRlbWl0RXZlbnQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uQ2hhbmdlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25DaGFuZ2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZS5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbkNoYW5nZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uQ2xvc2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNsb3NlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNsb3NlICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uT3BlbiBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uT3Blbiggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25PcGVuICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4uZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25PcGVuICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbk9wZW4oIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uUmVhZHkgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPblJlYWR5KCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPblJlYWR5ICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5LmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uUmVhZHkoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3Igb3B0aW9uIHtvcHRpb259LCBvciB7ZGVmYXVsdFZhbHVlfSBpZiBpdFxuXHQgKiBkb2Vzbid0IGV4aXN0LlxuXHQgKi9cblx0cHJvdGVjdGVkIGdldE9wdGlvbiggb3B0aW9uOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSApOiBhbnkge1xuXHRcdGxldCBsb2NhbE5hbWUgPSAnZmxhdHBpY2tyJyArIG9wdGlvbi5zdWJzdHJpbmcoIDAsIDEgKS50b1VwcGVyQ2FzZSgpXG5cdFx0XHQrIG9wdGlvbi5zdWJzdHJpbmcoIDEgKTtcblxuXHRcdGlmICggdHlwZW9mIHRoaXNbbG9jYWxOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tsb2NhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG59XG4iXX0=