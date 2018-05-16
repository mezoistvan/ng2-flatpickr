import { Component, ViewChild, forwardRef, Input, Directive, ElementRef, EventEmitter, HostListener, Output, Renderer, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
if (typeof window !== 'undefined') {
    require('flatpickr');
}
class Ng2FlatpickrComponent {
    constructor() {
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => { this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.propagateChange = (_) => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.propagateChange(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @return {?}
     */
    registerOnTouched() { }
    /**
     * @param {?} date
     * @return {?}
     */
    setDateFromInput(date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('setDate') && changes['setDate'].currentValue) {
            this.setDateFromInput(changes['setDate'].currentValue);
        }
    }
}
Ng2FlatpickrComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-flatpickr',
                template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input class="ng2-flatpickr-input" [placeholder]="placeholder" type="text" data-input>
		</div>`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => Ng2FlatpickrComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
Ng2FlatpickrComponent.propDecorators = {
    "flatpickrElement": [{ type: ViewChild, args: ['flatpickr',] },],
    "config": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "setDate": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2FlatpickrDirective {
    /**
     * @param {?} parent
     * @param {?} ngControl
     * @param {?} element
     * @param {?} renderer
     */
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
    /**
     * Allow double-clicking on the control to open/close it.
     * @return {?}
     */
    onClick() {
        this.flatpickr.toggle();
    }
    /**
     * @return {?}
     */
    get control() {
        return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /**
         * We cannot initialize the flatpickr instance in ngOnInit(); it will
         * randomize the date when the form control initializes.
         */
        let /** @type {?} */ nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setElementAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = /** @type {?} */ (nativeElement.flatpickr(this.flatpickrOptions));
    }
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
     * @param {?} selectedDates
     * @param {?} dateStr
     * @param {?} instance
     * @return {?}
     */
    eventOnChange(selectedDates, dateStr, instance) {
        let /** @type {?} */ event = {
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
     * @param {?} selectedDates
     * @param {?} dateStr
     * @param {?} instance
     * @return {?}
     */
    eventOnClose(selectedDates, dateStr, instance) {
        let /** @type {?} */ event = {
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
     * @param {?} selectedDates
     * @param {?} dateStr
     * @param {?} instance
     * @return {?}
     */
    eventOnOpen(selectedDates, dateStr, instance) {
        let /** @type {?} */ event = {
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
     * @param {?} selectedDates
     * @param {?} dateStr
     * @param {?} instance
     * @return {?}
     */
    eventOnReady(selectedDates, dateStr, instance) {
        let /** @type {?} */ event = {
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
     * @param {?} option
     * @param {?=} defaultValue
     * @return {?}
     */
    getOption(option, defaultValue) {
        let /** @type {?} */ localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
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
}
Ng2FlatpickrDirective.decorators = [
    { type: Directive, args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' },] },
];
/** @nocollapse */
Ng2FlatpickrDirective.ctorParameters = () => [
    { type: ControlContainer, },
    { type: NgControl, },
    { type: ElementRef, },
    { type: Renderer, },
];
Ng2FlatpickrDirective.propDecorators = {
    "flatpickrOptions": [{ type: Input, args: ['flatpickr',] },],
    "flatpickrAltFormat": [{ type: Input, args: ['altFormat',] },],
    "flatpickrAltInput": [{ type: Input, args: ['altInput',] },],
    "flatpickrAltInputClass": [{ type: Input, args: ['altInputClass',] },],
    "flatpickrAllowInput": [{ type: Input, args: ['allowInput',] },],
    "flatpickrAppendTo": [{ type: Input, args: ['appendTo',] },],
    "flatpickrClickOpens": [{ type: Input, args: ['clickOpens',] },],
    "flatpickrDateFormat": [{ type: Input, args: ['dateFormat',] },],
    "flatpickrDefaultDate": [{ type: Input, args: ['defaultDate',] },],
    "flatpickrDisable": [{ type: Input, args: ['disable',] },],
    "flatpickrDisableMobile": [{ type: Input, args: ['disableMobile',] },],
    "flatpickrEnable": [{ type: Input, args: ['enable',] },],
    "flatpickrEnableTime": [{ type: Input, args: ['enableTime',] },],
    "flatpickrEnableSeconds": [{ type: Input, args: ['enableSeconds',] },],
    "flatpickrHourIncrement": [{ type: Input, args: ['hourIncrement',] },],
    "flatpickrInline": [{ type: Input, args: ['inline',] },],
    "flatpickrLocale": [{ type: Input, args: ['locale',] },],
    "flatpickrMaxDate": [{ type: Input, args: ['maxDate',] },],
    "flatpickrMinDate": [{ type: Input, args: ['minDate',] },],
    "flatpickrMinuteIncrement": [{ type: Input, args: ['minuteIncrement',] },],
    "flatpickrMode": [{ type: Input, args: ['mode',] },],
    "flatpickrNextArrow": [{ type: Input, args: ['nextArrow',] },],
    "flatpickrNoCalendar": [{ type: Input, args: ['noCalendar',] },],
    "flatpickrParseDate": [{ type: Input, args: ['parseDate',] },],
    "flatpickrPrevArrow": [{ type: Input, args: ['prevArrow',] },],
    "flatpickrShorthandCurrentMonth": [{ type: Input, args: ['shorthandCurrentMonth',] },],
    "flatpickrStatic": [{ type: Input, args: ['static',] },],
    "flatpickrTime_24hr": [{ type: Input, args: ['time_24hr',] },],
    "flatpickrUtc": [{ type: Input, args: ['utc',] },],
    "flatpickrWeekNumbers": [{ type: Input, args: ['weekNumbers',] },],
    "flatpickrWrap": [{ type: Input, args: ['wrap',] },],
    "flatpickrOnChange": [{ type: Output, args: ['onChange',] },],
    "flatpickrOnClose": [{ type: Output, args: ['onClose',] },],
    "flatpickrOnOpen": [{ type: Output, args: ['onOpen',] },],
    "flatpickrOnReady": [{ type: Output, args: ['onReady',] },],
    "onClick": [{ type: HostListener, args: ['dblclick',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2FlatpickrModule {
}
Ng2FlatpickrModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    Ng2FlatpickrComponent,
                    Ng2FlatpickrDirective
                ],
                exports: [
                    Ng2FlatpickrComponent,
                    Ng2FlatpickrDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { Ng2FlatpickrComponent, Ng2FlatpickrDirective, Ng2FlatpickrModule };
//# sourceMappingURL=ng2-flatpickr.js.map
