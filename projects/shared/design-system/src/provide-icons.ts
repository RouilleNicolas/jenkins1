import { inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const registeredIcons = new Set<string>(['reform']);

export const provideIcons = () =>
  makeEnvironmentProviders([
    provideAppInitializer(() => {
      const matIconRegistry = inject(MatIconRegistry);
      const domSanitizer = inject(DomSanitizer);
      matIconRegistry.setDefaultFontSetClass('material-symbols-rounded');

      for (const icon of registeredIcons) {
        matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${icon}.svg`));
      }
    }),
  ]);
