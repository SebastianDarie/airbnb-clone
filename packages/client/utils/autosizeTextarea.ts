import { KeyboardEvent } from 'react';

export const autosizeTextarea = (e: KeyboardEvent<HTMLTextAreaElement>) => {
  e.currentTarget.style.height = 'inherit';
  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
};
