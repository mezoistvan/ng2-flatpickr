import { __decorate } from 'tslib';
import { ViewChild, Input, Component, forwardRef, EventEmitter, ElementRef, Renderer2, Output, HostListener, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'flatpickr';

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
    __decorate([
        ViewChild('flatpickr', {
            static: true
        })
    ], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
    __decorate([
        Input()
    ], Ng2FlatpickrComponent.prototype, "config", void 0);
    __decorate([
        Input()
    ], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Ng2FlatpickrComponent.prototype, "addClass", void 0);
    __decorate([
        Input()
    ], Ng2FlatpickrComponent.prototype, "setDate", void 0);
    __decorate([
        Input()
    ], Ng2FlatpickrComponent.prototype, "tabindex", null);
    __decorate([
        Input()
    ], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
    Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = __decorate([
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
    return Ng2FlatpickrDirective;
}());

var Ng2FlatpickrModule = /** @class */ (function () {
    function Ng2FlatpickrModule() {
    }
    Ng2FlatpickrModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                Ng2FlatpickrComponent,
                Ng2FlatpickrDirective
            ],
            exports: [
                Ng2FlatpickrComponent,
                Ng2FlatpickrDirective
            ]
        })
    ], Ng2FlatpickrModule);
    return Ng2FlatpickrModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Ng2FlatpickrComponent, Ng2FlatpickrDirective, Ng2FlatpickrModule };
//# sourceMappingURL=ng2-flatpickr.js.map
