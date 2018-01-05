import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: '<translation-form-group>',
  templateUrl: 'translation-form-group.component.html',
  styleUrls: []
})
export class TranslationFormGroupComponent {

  @Input('properties') properties: Array<{name: string, type: string}>;
  @Input('languageKey') languageKey: string;
  @Input('translationFormGroup') translationFormGroup: any;
}
