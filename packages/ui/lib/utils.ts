import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getStyleTarget = (el: HTMLElement): ShadowRoot | HTMLHeadElement => {
  let current: Node | null = el;

  while (current) {
    if ((current as ShadowRoot).host) {
      return current as ShadowRoot;
    }
    current = current.parentNode;
  }

  return document.head;
};
