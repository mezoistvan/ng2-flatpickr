"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
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
        this.flatpickrOnChange = new core_1.EventEmitter();
        /**
         * onClose gets triggered when the calendar is closed.
         *
         * Default:  null
         */
        this.flatpickrOnClose = new core_1.EventEmitter();
        /**
         * onOpen gets triggered when the calendar is opened.
         *
         * Default:  null
         */
        this.flatpickrOnOpen = new core_1.EventEmitter();
        /**
         * onReady gets triggered once the calendar is in a ready state.
         *
         * Default:  null
         */
        this.flatpickrOnReady = new core_1.EventEmitter();
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
    __decorate([
        core_1.Input('flatpickr'),
        __metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
    __decorate([
        core_1.Input('altFormat'),
        __metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
    __decorate([
        core_1.Input('altInput'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
    __decorate([
        core_1.Input('altInputClass'),
        __metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
    __decorate([
        core_1.Input('allowInput'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
    __decorate([
        core_1.Input('appendTo'),
        __metadata("design:type", HTMLElement)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
    __decorate([
        core_1.Input('clickOpens'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
    __decorate([
        core_1.Input('dateFormat'),
        __metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
    __decorate([
        core_1.Input('defaultDate'),
        __metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
    __decorate([
        core_1.Input('disable'),
        __metadata("design:type", Array)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
    __decorate([
        core_1.Input('disableMobile'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
    __decorate([
        core_1.Input('enable'),
        __metadata("design:type", Array)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
    __decorate([
        core_1.Input('enableTime'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
    __decorate([
        core_1.Input('enableSeconds'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
    __decorate([
        core_1.Input('hourIncrement'),
        __metadata("design:type", Number)
    ], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
    __decorate([
        core_1.Input('inline'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
    __decorate([
        core_1.Input('locale'),
        __metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
    __decorate([
        core_1.Input('maxDate'),
        __metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
    __decorate([
        core_1.Input('minDate'),
        __metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
    __decorate([
        core_1.Input('minuteIncrement'),
        __metadata("design:type", Number)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
    __decorate([
        core_1.Input('mode'),
        __metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
    __decorate([
        core_1.Input('nextArrow'),
        __metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
    __decorate([
        core_1.Input('noCalendar'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
    __decorate([
        core_1.Input('parseDate'),
        __metadata("design:type", Function)
    ], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
    __decorate([
        core_1.Input('prevArrow'),
        __metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
    __decorate([
        core_1.Input('shorthandCurrentMonth'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
    __decorate([
        core_1.Input('static'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
    __decorate([
        core_1.Input('time_24hr'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
    __decorate([
        core_1.Input('utc'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
    __decorate([
        core_1.Input('weekNumbers'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
    __decorate([
        core_1.Input('wrap'),
        __metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
    __decorate([
        core_1.Output('onChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
    __decorate([
        core_1.Output('onClose'),
        __metadata("design:type", core_1.EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
    __decorate([
        core_1.Output('onOpen'),
        __metadata("design:type", core_1.EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
    __decorate([
        core_1.Output('onReady'),
        __metadata("design:type", core_1.EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
    __decorate([
        core_1.HostListener('dblclick'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Ng2FlatpickrDirective.prototype, "onClick", null);
    Ng2FlatpickrDirective = __decorate([
        core_1.Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }),
        __metadata("design:paramtypes", [forms_1.ControlContainer,
            forms_1.NgControl,
            core_1.ElementRef,
            core_1.Renderer])
    ], Ng2FlatpickrDirective);
    return Ng2FlatpickrDirective;
}());
exports.Ng2FlatpickrDirective = Ng2FlatpickrDirective;
//# sourceMappingURL=ng2-flatpickr.directive.js.map