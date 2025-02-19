import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { DynamicFormResponse } from "./interfaces/dynamic-form-response.interface";

interface FetchFormParams {
  id: string;
  context: string;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private readonly _http = inject(HttpClient);

  /**
   * Retrieve the full definition of the form
   *
   * @see {@link DynamicFormResponse}
   */
  public getFormDefinition({ id, context }: FetchFormParams): Observable<DynamicFormResponse> {
    return this._http.get<DynamicFormResponse>(this._formatEndpointUri(id, context));
  }

  /**
   * Retrieve only the form elements
   *
   * @see {@link DynamicFormResponse.items}
   */
  public getFormElements(params: FetchFormParams): Observable<DynamicFormResponse["items"]> {
    return this.getFormDefinition(params).pipe(map(({ items }) => items));
  }

  // TODO : Change return typing to the actual response type
  public submit<T>({ id, context }: FetchFormParams, data: T): Observable<unknown> {
    return this._http.post(this._formatEndpointUri(id, context), data);
  }

  private _formatEndpointUri(id: string, context: string): string {
    return `/module_settings/v1/forms/${id}/application-context/${context}`;
  }
}
