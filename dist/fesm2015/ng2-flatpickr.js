import { __decorate, __metadata } from 'tslib';
import { ViewChild, Input, Component, forwardRef, EventEmitter, Output, HostListener, Directive, ElementRef, Renderer, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

var Ng2FlatpickrComponent_1;
if (typeof window !== 'undefined') {
    require('flatpickr');
}
let Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = class Ng2FlatpickrComponent {
    constructor() {
        this._tabindex = 0;
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => { this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = (_) => { };
    }
    get tabindex() { return this._tabindex; }
    set tabindex(ti) { this._tabindex = Number(ti); }
    ///////////////////////////////////
    writeValue(value) {
        this.propagateChange(value);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    ///////////////////////////////////
    setDateFromInput(date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
    setAltInputPlaceholder(placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    ngOnChanges(changes) {
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
    }
};
__decorate([
    ViewChild('flatpickr', {
        static: true
    }),
    __metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Ng2FlatpickrComponent.prototype, "addClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "setDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Ng2FlatpickrComponent.prototype, "tabindex", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = __decorate([
    Component({
        selector: 'ng2-flatpickr',
        template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" data-input>
			<ng-content></ng-content>
		</div>
		`,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => Ng2FlatpickrComponent_1),
                multi: true
            }
        ]
    })
], Ng2FlatpickrComponent);

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
__decorate([
    Input('flatpickr'),
    __metadata("design:type", Object)
], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
__decorate([
    Input('placeholder'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
__decorate([
    Input('altFormat'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
__decorate([
    Input('altInput'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
__decorate([
    Input('altInputClass'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
__decorate([
    Input('allowInput'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
__decorate([
    Input('appendTo'),
    __metadata("design:type", HTMLElement)
], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
__decorate([
    Input('clickOpens'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
__decorate([
    Input('dateFormat'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
__decorate([
    Input('defaultDate'),
    __metadata("design:type", Object)
], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
__decorate([
    Input('disable'),
    __metadata("design:type", Array)
], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
__decorate([
    Input('disableMobile'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
__decorate([
    Input('enable'),
    __metadata("design:type", Array)
], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
__decorate([
    Input('enableTime'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
__decorate([
    Input('enableSeconds'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
__decorate([
    Input('hourIncrement'),
    __metadata("design:type", Number)
], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
__decorate([
    Input('inline'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
__decorate([
    Input('locale'),
    __metadata("design:type", Object)
], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
__decorate([
    Input('maxDate'),
    __metadata("design:type", Object)
], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
__decorate([
    Input('minDate'),
    __metadata("design:type", Object)
], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
__decorate([
    Input('minuteIncrement'),
    __metadata("design:type", Number)
], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
__decorate([
    Input('mode'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
__decorate([
    Input('nextArrow'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
__decorate([
    Input('noCalendar'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
__decorate([
    Input('parseDate'),
    __metadata("design:type", Function)
], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
__decorate([
    Input('prevArrow'),
    __metadata("design:type", String)
], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
__decorate([
    Input('shorthandCurrentMonth'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
__decorate([
    Input('static'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
__decorate([
    Input('time_24hr'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
__decorate([
    Input('utc'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
__decorate([
    Input('weekNumbers'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
__decorate([
    Input('wrap'),
    __metadata("design:type", Boolean)
], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
__decorate([
    Output('onChange'),
    __metadata("design:type", EventEmitter)
], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
__decorate([
    Output('onClose'),
    __metadata("design:type", EventEmitter)
], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
__decorate([
    Output('onOpen'),
    __metadata("design:type", EventEmitter)
], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
__decorate([
    Output('onReady'),
    __metadata("design:type", EventEmitter)
], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
__decorate([
    HostListener('dblclick'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ng2FlatpickrDirective.prototype, "onClick", null);
Ng2FlatpickrDirective = __decorate([
    Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }),
    __metadata("design:paramtypes", [ControlContainer,
        NgControl,
        ElementRef,
        Renderer])
], Ng2FlatpickrDirective);

let Ng2FlatpickrModule = class Ng2FlatpickrModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { Ng2FlatpickrComponent, Ng2FlatpickrDirective, Ng2FlatpickrModule };
//# sourceMappingURL=ng2-flatpickr.js.map
