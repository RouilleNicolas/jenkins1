import { Observable } from "rxjs";

export type Async<T> = Observable<T> | Promise<T>;
