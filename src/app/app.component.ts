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
      'descriptionTextarea': ['Textarea', Validators.required],
      'input': ['input', Validators.required]
    });
  }
}
