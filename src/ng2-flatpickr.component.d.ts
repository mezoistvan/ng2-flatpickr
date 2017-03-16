import { AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class Ng2FlatpickrComponent implements AfterViewInit, ControlValueAccessor {
    private flatpickr;
    private defaultFlatpickrOptions;
    flatpickrElement: any;
    config: object;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(): void;
    propagateChange: (_: any) => void;
    ngAfterViewInit(): void;
}
