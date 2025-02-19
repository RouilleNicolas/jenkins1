import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { FetchActionResponse } from "../../../interfaces/fetch-action-response.interface";
import { FetchActionsProvider } from "../../../interfaces/fetch-action.provider";

@Injectable()
export class DynamicFormSelectStoryService implements FetchActionsProvider {
  fetchActionMap = new Map([
    ['fetchHandWriting', () => of<FetchActionResponse>({
      left: {
        label: 'Gaucher',
        value: 'left',
        events: {},
      },
      right: {
        label: 'Droitier',
        value: 'right',
        events: {},
      },
    })]
  ]) as unknown as FetchActionsProvider['fetchActionMap'];
}
