import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer } from '@angular/core';
import { ControlContainer, FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FlatpickrEvent } from './flatpickr-event.interface';
import { FlatpickrInstance } from './flatpickr-instance';
import { FlatpickrOptions } from './flatpickr-options.interface';
export declare class Ng2FlatpickrDirective implements AfterViewInit, OnDestroy, OnInit {
    protected parent: ControlContainer;
    protected ngControl: NgControl;
    protected element: ElementRef;
    protected renderer: Renderer;
    /**
     * The flatpickr configuration as a single object of values.
     *
     * See https://chmln.github.io/flatpickr/options/ for full list.
     */
    flatpickrOptions: FlatpickrOptions;
    /**
     * Exactly the same as date format, but for the altInput field.
     *
     * Default:  "F j, Y"
     */
    flatpickrAltFormat: string;
    /**
     * Show the user a readable date (as per altFormat), but return something
     * totally different to the server.
     *
     * Default:  false
     */
    flatpickrAltInput: boolean;
    /**
     * This class will be added to the input element created by the altInput
     * option.
     *
     * Default:  ""
     */
    flatpickrAltInputClass: string;
    /**
     * Allows the user to enter a date directly input the input field. By
     * default, direct entry is disabled.
     *
     * Default:  false
     */
    flatpickrAllowInput: boolean;
    /**
     * Instead of body, appends the calendar to the specified node instead.
     *
     * Default:  null
     */
    flatpickrAppendTo: HTMLElement;
    /**
     * Whether clicking on the input should open the picker.
     * You could disable this if you wish to open the calendar manually
     * with.open().
     *
     * Default:  true
     */
    flatpickrClickOpens: boolean;
    /**
     * A string of characters which are used to define how the date will be
     * displayed in the input box.
     * See https://chmln.github.io/flatpickr/formatting/ for supported tokens.
     *
     * Default:  "Y-m-d"
     */
    flatpickrDateFormat: string;
    /**
     * Sets the initial selected date(s).
     *
     * If you're using {mode: "multiple"} or a range calendar supply an Array of
     * Date objects or an Array of date strings which follow your dateFormat.
     *
     * Otherwise, you can supply a single Date object or a date string.
     *
     * Default:  null
     */
    flatpickrDefaultDate: string | Date;
    /**
     * Disable an array of specific dates, date ranges, or functions to disable
     * dates. See https://chmln.github.io/flatpickr/examples/#disabling-specific-dates
     *
     * Default:  []
     */
    flatpickrDisable: string[] | Date[];
    /**
     * Set disableMobile to true to always use the non-native picker. By
     * default, Flatpickr utilizes native datetime widgets unless certain
     * options (e.g. disable) are used.
     *
     * Default:  false
     */
    flatpickrDisableMobile: boolean;
    /**
     * Enable an array of specific dates, date ranges, or functions to enable
     * dates. See https://chmln.github.io/flatpickr/examples/#disabling-all-dates-except-select-few
     *
     * Default:  []
     */
    flatpickrEnable: string[] | Date[];
    /**
     * Enables time picker.
     *
     * Default:  false
     */
    flatpickrEnableTime: boolean;
    /**
     * Enables seconds in the time picker.
     *
     * Default:  false
     */
    flatpickrEnableSeconds: boolean;
    /**
     * Adjusts the step for the hour input (incl. scrolling).
     *
     * Default:  1
     */
    flatpickrHourIncrement: number;
    /**
     * Displays the calendar inline.
     *
     * Default:  false
     */
    flatpickrInline: boolean;
    /**
     * Use a specific locale for the flatpickr instance.
     *
     * Default:  null
     */
    flatpickrLocale: Object;
    /**
     * The maximum date that a user can pick to (inclusive).
     *
     * Default:  null
     */
    flatpickrMaxDate: string | Date;
    /**
     * The minimum date that a user can start picking from (inclusive).
     *
     * Default:  null
     */
    flatpickrMinDate: string | Date;
    /**
     * Adjusts the step for the minute input (incl. scrolling).
     *
     * Default:  5
     */
    flatpickrMinuteIncrement: number;
    /**
     * "single", "multiple", or "range"
     *
     * Default:  "single"
     */
    flatpickrMode: string;
    /**
     * HTML for the arrow icon, used to switch months.
     *
     * Default:  ">"
     */
    flatpickrNextArrow: string;
    /**
     * Hides the day selection in calendar. Use it along with enableTime to
     * create a time picker.
     *
     * Default:  false
     */
    flatpickrNoCalendar: boolean;
    /**
     * Function that expects a date string and must return a Date object.
     *
     * Default:  false
     */
    flatpickrParseDate: Function;
    /**
     * HTML for the left arrow icon.
     *
     * Default:  "<"
     */
    flatpickrPrevArrow: string;
    /**
     * Show the month using the shorthand version (ie, Sep instead of September).
     *
     * Default:  false
     */
    flatpickrShorthandCurrentMonth: boolean;
    /**
     * Position the calendar inside the wrapper and next to the input element
     * (Leave false unless you know what you're doing).
     *
     * Default:  false
     */
    flatpickrStatic: boolean;
    /**
     * Displays time picker in 24 hour mode without AM/PM selection when enabled.
     *
     * Default:  false
     */
    flatpickrTime_24hr: boolean;
    flatpickrUtc: boolean;
    /**
     * Enables display of week numbers in calendar.
     *
     * Default:  false
     */
    flatpickrWeekNumbers: boolean;
    /**
     * Custom elements and input groups.
     *
     * Default:  false
     */
    flatpickrWrap: boolean;
    /**
     * onChange gets triggered when the user selects a date, or changes the time on a selected date.
     *
     * Default:  null
     */
    flatpickrOnChange: EventEmitter<FlatpickrEvent>;
    /**
     * onClose gets triggered when the calendar is closed.
     *
     * Default:  null
     */
    flatpickrOnClose: EventEmitter<FlatpickrEvent>;
    /**
     * onOpen gets triggered when the calendar is opened.
     *
     * Default:  null
     */
    flatpickrOnOpen: EventEmitter<FlatpickrEvent>;
    /**
     * onReady gets triggered once the calendar is in a ready state.
     *
     * Default:  null
     */
    flatpickrOnReady: EventEmitter<FlatpickrEvent>;
    /** Allow double-clicking on the control to open/close it. */
    onClick(): void;
    protected globalOnChange: Function;
    protected globalOnClose: Function;
    protected globalOnOpen: Function;
    protected globalOnReady: Function;
    protected flatpickr: FlatpickrInstance;
    protected formControlListener: Subscription;
    /** Allow access properties using index notation */
    [key: string]: any;
    constructor(parent: ControlContainer, ngControl: NgControl, element: ElementRef, renderer: Renderer);
    readonly control: FormControl;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    protected eventOnChange(selectedDates: Date[], dateStr: string, instance: Object): void;
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    protected eventOnClose(selectedDates: Date[], dateStr: string, instance: Object): void;
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    protected eventOnOpen(selectedDates: Date[], dateStr: string, instance: Object): void;
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    protected eventOnReady(selectedDates: Date[], dateStr: string, instance: Object): void;
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    protected getOption(option: string, defaultValue?: any): any;
}
