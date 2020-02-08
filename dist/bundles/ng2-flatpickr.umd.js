(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('flatpickr')) :
    typeof define === 'function' && define.amd ? define('ng2-flatpickr', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'flatpickr'], factory) :
    (global = global || self, factory(global['ng2-flatpickr'] = {}, global.ng.core, global.ng.forms, global.ng.common));
}(this, (function (exports, core, forms, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            core.ViewChild('flatpickr', {
                static: true
            })
        ], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
        __decorate([
            core.Input()
        ], Ng2FlatpickrComponent.prototype, "config", void 0);
        __decorate([
            core.Input()
        ], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Input()
        ], Ng2FlatpickrComponent.prototype, "addClass", void 0);
        __decorate([
            core.Input()
        ], Ng2FlatpickrComponent.prototype, "setDate", void 0);
        __decorate([
            core.Input()
        ], Ng2FlatpickrComponent.prototype, "tabindex", null);
        __decorate([
            core.Input()
        ], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
        Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = __decorate([
            core.Component({
                selector: 'ng2-flatpickr',
                template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return Ng2FlatpickrComponent_1; }),
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
            this.flatpickrOnChange = new core.EventEmitter();
            /**
             * onClose gets triggered when the calendar is closed.
             *
             * Default:  null
             */
            this.flatpickrOnClose = new core.EventEmitter();
            /**
             * onOpen gets triggered when the calendar is opened.
             *
             * Default:  null
             */
            this.flatpickrOnOpen = new core.EventEmitter();
            /**
             * onReady gets triggered once the calendar is in a ready state.
             *
             * Default:  null
             */
            this.flatpickrOnReady = new core.EventEmitter();
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
            { type: forms.ControlContainer },
            { type: forms.NgControl },
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input('flatpickr')
        ], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
        __decorate([
            core.Input('placeholder')
        ], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
        __decorate([
            core.Input('altFormat')
        ], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
        __decorate([
            core.Input('altInput')
        ], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
        __decorate([
            core.Input('altInputClass')
        ], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
        __decorate([
            core.Input('allowInput')
        ], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
        __decorate([
            core.Input('appendTo')
        ], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
        __decorate([
            core.Input('clickOpens')
        ], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
        __decorate([
            core.Input('dateFormat')
        ], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
        __decorate([
            core.Input('defaultDate')
        ], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
        __decorate([
            core.Input('disable')
        ], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
        __decorate([
            core.Input('disableMobile')
        ], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
        __decorate([
            core.Input('enable')
        ], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
        __decorate([
            core.Input('enableTime')
        ], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
        __decorate([
            core.Input('enableSeconds')
        ], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
        __decorate([
            core.Input('hourIncrement')
        ], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
        __decorate([
            core.Input('inline')
        ], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
        __decorate([
            core.Input('locale')
        ], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
        __decorate([
            core.Input('maxDate')
        ], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
        __decorate([
            core.Input('minDate')
        ], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
        __decorate([
            core.Input('minuteIncrement')
        ], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
        __decorate([
            core.Input('mode')
        ], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
        __decorate([
            core.Input('nextArrow')
        ], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
        __decorate([
            core.Input('noCalendar')
        ], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
        __decorate([
            core.Input('parseDate')
        ], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
        __decorate([
            core.Input('prevArrow')
        ], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
        __decorate([
            core.Input('shorthandCurrentMonth')
        ], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
        __decorate([
            core.Input('static')
        ], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
        __decorate([
            core.Input('time_24hr')
        ], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
        __decorate([
            core.Input('utc')
        ], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
        __decorate([
            core.Input('weekNumbers')
        ], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
        __decorate([
            core.Input('wrap')
        ], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
        __decorate([
            core.Output('onChange')
        ], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
        __decorate([
            core.Output('onClose')
        ], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
        __decorate([
            core.Output('onOpen')
        ], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
        __decorate([
            core.Output('onReady')
        ], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
        __decorate([
            core.HostListener('dblclick')
        ], Ng2FlatpickrDirective.prototype, "onClick", null);
        Ng2FlatpickrDirective = __decorate([
            core.Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' })
        ], Ng2FlatpickrDirective);
        return Ng2FlatpickrDirective;
    }());

    var Ng2FlatpickrModule = /** @class */ (function () {
        function Ng2FlatpickrModule() {
        }
        Ng2FlatpickrModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
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

    exports.Ng2FlatpickrComponent = Ng2FlatpickrComponent;
    exports.Ng2FlatpickrDirective = Ng2FlatpickrDirective;
    exports.Ng2FlatpickrModule = Ng2FlatpickrModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-flatpickr.umd.js.map
