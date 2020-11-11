import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeoService } from '../services/geo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges{

  @Input() isDisabled: boolean;

  form : FormGroup;

  constructor(private geoService: GeoService) { 
    this.form = new FormGroup({
      cityName: new FormControl('', Validators.required)
    });
  }

  ngOnChanges(changes: SimpleChanges) { 
    if (this.isDisabled) {
      this.form.controls['cityName'].disable();
    } else {
      this.form.controls['cityName'].enable();
    }    
  }

  onSubmit() {
    const value = this.form.controls['cityName'].value;
    this.geoService.emitSearchValue(value);
  }

}
