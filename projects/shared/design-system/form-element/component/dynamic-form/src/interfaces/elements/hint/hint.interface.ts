export interface Hint {
  content: string;
  align?: 'start' | 'end';
}

export const defaultHintAlign: Hint['align'] = 'start';
