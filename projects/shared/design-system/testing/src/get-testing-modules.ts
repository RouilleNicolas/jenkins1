import { MatNativeDateModule } from "@angular/material/core";
import { getI18nTestingModule } from "@cooperl/i18n/testing";

export const getTestingModules = () => [
  getI18nTestingModule(),
  MatNativeDateModule
]
