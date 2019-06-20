import { Component, ViewChild, AfterViewInit, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FlatpickrOptions } from './flatpickr-options.interface';

declare var require: any;

if(typeof window !== 'undefined'){
    require( 'flatpickr' );
}

@Component({
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
			useExisting: forwardRef( () => Ng2FlatpickrComponent ),
			multi: true
		}
	]
})
export class Ng2FlatpickrComponent implements AfterViewInit, ControlValueAccessor, OnChanges {

  public flatpickr: Object;
  private _tabindex = 0;

	private defaultFlatpickrOptions: FlatpickrOptions = {
		wrap: true,
		clickOpens: true,
		onChange: ( selectedDates: any ) => { this.writeValue( selectedDates ); }
	};

	@ViewChild('flatpickr', {
		static: true
	})
	flatpickrElement: any;

	@Input()
	config: FlatpickrOptions;

	@Input()
	placeholder: string = "";

  @Input()
	addClass: string = "";

	@Input()
	setDate: string | Date;

  @Input()
  get tabindex() { return this._tabindex; }
  set tabindex( ti: number ) { this._tabindex = Number( ti ); }

	@Input()
	hideButton = false;

	///////////////////////////////////

	writeValue( value:any ) {
		this.propagateChange( value );
	}

	registerOnChange( fn: any ) {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	propagateChange = ( _: any ) => {};

	///////////////////////////////////

	setDateFromInput( date: any ) {
		this.flatpickrElement.nativeElement._flatpickr.setDate( date, true );
	}

	setAltInputPlaceholder( placeholder: string ) {
		this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute( 'placeholder', placeholder );
	}

	ngAfterViewInit() {
		if( this.config ) {
			Object.assign( this.defaultFlatpickrOptions, this.config );
		}
		this.flatpickr = this.flatpickrElement.nativeElement.flatpickr( this.defaultFlatpickrOptions );
		if( this.setDate ) {
			this.setDateFromInput( this.setDate );
		}
	}

	ngOnChanges( changes: SimpleChanges ) {
		if( this.flatpickrElement.nativeElement 
			&& this.flatpickrElement.nativeElement._flatpickr ) {
				
				if( changes.hasOwnProperty( 'setDate' ) 
					&& changes[ 'setDate' ].currentValue ) {
						this.setDateFromInput( changes[ 'setDate' ].currentValue );
					}

				if( this.config.altInput
					&& changes.hasOwnProperty( 'placeholder' ) 
					&& changes[ 'placeholder' ].currentValue ) {
						this.setAltInputPlaceholder( changes[ 'placeholder' ].currentValue );
					}
			}
	}
}
