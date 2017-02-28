import { Component, ViewChild, AfterViewInit } from '@angular/core';
require( 'flatpickr' );

@Component({
	selector: 'ng2-flatpickr', 
	templateUrl: 'ng2-flatpickr.component.html'
})
export class Ng2FlatpickrComponent implements AfterViewInit {

	private flatpickr: object;

	@ViewChild('flatpickr')
	flatpickrElement: any;

	ngAfterViewInit() {
		this.flatpickr = this.flatpickrElement.nativeElement.flatpickr( {} );
	}	

}