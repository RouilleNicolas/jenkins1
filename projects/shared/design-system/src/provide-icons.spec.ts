import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { provideIcons } from './provide-icons';

describe('[Shared - Design System] provideIcons', () => {
  let matIconRegistryMock: Partial<MatIconRegistry>;

  beforeEach(() => {
    matIconRegistryMock = {
      setDefaultFontSetClass: jest.fn(),
      addSvgIcon: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [provideIcons(), { provide: MatIconRegistry, useValue: matIconRegistryMock }],
    });
  });

  it('should set default font set class to "material-symbols-rounded"', () => {
    TestBed.inject(MatIconRegistry);
    expect(matIconRegistryMock.setDefaultFontSetClass).toHaveBeenCalledWith('material-symbols-rounded');
    expect(matIconRegistryMock.setDefaultFontSetClass).toHaveBeenCalledTimes(1);
  });

  it('should add registered icons', () => {
    TestBed.inject(MatIconRegistry);
    expect(matIconRegistryMock.addSvgIcon).toHaveBeenCalled();
  });
});
