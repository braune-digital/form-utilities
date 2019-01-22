import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  form: FormGroup = null;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({
      'descriptionCk': ['<p>CkEditor</p>', Validators.required],
      'descriptionRTE': ['<p>RTE Quill</p>', Validators.required],
      'descriptionTextarea': ['„Socialbnb“ ist als Enactus-Projekt der Universiät zu Köln entstanden. Es ist eine Vermittlungsplattform, die Touristen an NGOs in Südostasien und Südamerika vermittelt, die Übernachtungsmöglichkeiten für Reisende anbieten. Durch die zusätzliche Einnahmequelle können diese NGOs ihre Projekte vor Ort leichter finanzieren. Den Gästen wiederum wird eine besonders authentische Form des Reisens ermöglicht. Durch die zusätzliche Einnahmequelle können diese NGOs ihre Projekte vor Ort leichter finanzieren. Den Gästen wiederum wird eine besonders authentische Form des Reisens ermöglicht.', Validators.required],
      'input': ['', Validators.required],
      'datepicker': [new Date(), Validators.required],
      'datetimepicker': [new Date(), Validators.required],
      'daterange': ['', Validators.required],
      'checkbox': [null, Validators.required]
    });
  }

  onSubmit(){
    console.log('Form submitted');
    alert('Form submitted');
  }

  log(event){
    console.log(event, new Date());
  }
}
