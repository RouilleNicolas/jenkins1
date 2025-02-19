# @cooperl/utils/form-control-forward

Secondary entry point of `@cooperl/utils`. It can be used by importing from `@cooperl/utils/form-control-forward`.

The whole concept has been taken from [this Netanel Basal post](https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55)

```ts
@Component({
  selector: 'app-input',
  standalone: true,
  // 👇👇👇
  hostDirectives: [NoopValueAccessorDirective],
  imports: [ReactiveFormsModule],
  // 👇👇👇
  template: ` <input [formControl]="ngControl.control" /> `,
})
export class InputComponent {
  // 👇👇👇
  ngControl = injectNgControl();
}
```
