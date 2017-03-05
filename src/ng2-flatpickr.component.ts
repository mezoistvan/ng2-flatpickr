import { Component, ViewChild, AfterViewInit } from '@angular/core';
require( 'flatpickr' );

@Component({
	selector: 'ng2-flatpickr', 
	template: `
		<div #flatpickr>
			<input type="text">
		</div>`
})
export class Ng2FlatpickrComponent implements AfterViewInit {

	private flatpickr: object;

	@ViewChild('flatpickr')
	flatpickrElement: any;

	ngAfterViewInit() {
		this.flatpickr = this.flatpickrElement.nativeElement.flatpickr( {} );
	}	

}