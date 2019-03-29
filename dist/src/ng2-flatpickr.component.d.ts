import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FlatpickrOptions } from './flatpickr-options.interface';
export declare class Ng2FlatpickrComponent implements AfterViewInit, ControlValueAccessor, OnChanges {
    flatpickr: Object;
    private _tabindex;
    private defaultFlatpickrOptions;
    flatpickrElement: any;
    config: FlatpickrOptions;
    placeholder: string;
    addClass: string;
    setDate: string | Date;
    tabindex: number;
    hideButton: boolean;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(): void;
    propagateChange: (_: any) => void;
    setDateFromInput(date: any): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
