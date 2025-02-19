import { EventsKeys } from "./events-types.type";

export type Events = Partial<Record<EventsKeys, string>>;
