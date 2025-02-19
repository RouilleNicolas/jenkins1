export const BackgroundInitialGlobals = {
  backgrounds: { value: Backgrounds.Light },
};

export const BackgroundParameters = {
  backgrounds: {
    values: [
      { name: Backgrounds.Dark, value: '#333' },
      { name: Backgrounds.Light, value: '#FFF' },
      { name: Backgrounds.Header, value: '#012F32' },
    ],
    default: Backgrounds.Light,
  },
};

export const enum Backgrounds {
  Dark = 'Dark',
  Light = 'Light',
  Header = 'Header',
}
