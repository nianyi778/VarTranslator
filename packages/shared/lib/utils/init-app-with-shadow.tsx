import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import type { ReactElement } from 'react';
import type { Root } from 'react-dom/client';

type RendererRegistry = Map<string, Root>;

const registry: RendererRegistry = new Map();

export const initAppWithShadow = ({ id, app, inlineCss }: { id: string; inlineCss: string; app: ReactElement }) => {
  let rootDiv = document.getElementById(id);
  let shadowRoot: ShadowRoot;
  let mountNode: HTMLElement;

  if (!rootDiv) {
    rootDiv = document.createElement('div');
    rootDiv.id = id;
    rootDiv.style.all = 'initial';
    document.documentElement.appendChild(rootDiv);

    mountNode = document.createElement('div');
    mountNode.id = `shadow-root-${id}`;

    shadowRoot = rootDiv.attachShadow({ mode: 'open' });

    // 注入 Tailwind CSS
    if (navigator.userAgent.includes('Firefox')) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-inline-css', id);
      styleElement.innerHTML = inlineCss;
      shadowRoot.appendChild(styleElement);
    } else {
      const globalStyleSheet = new CSSStyleSheet();
      globalStyleSheet.replaceSync(inlineCss);
      shadowRoot.adoptedStyleSheets = [globalStyleSheet];
    }

    shadowRoot.appendChild(mountNode);
    const emotionCache = createCache({ key: `shadow-${id}`, container: shadowRoot });
    const root = createRoot(mountNode);
    registry.set(id, root);
    root.render(<CacheProvider value={emotionCache}>{app}</CacheProvider>);
  } else {
    shadowRoot = rootDiv.shadowRoot!;
    mountNode = shadowRoot.getElementById(`shadow-root-${id}`)!;

    // ✅ 重新更新 inlineCss
    if (navigator.userAgent.includes('Firefox')) {
      const existingStyle = shadowRoot.querySelector(`style[data-inline-css="${id}"]`);
      if (existingStyle && existingStyle.textContent !== inlineCss) {
        existingStyle.textContent = inlineCss;
      }
    } else {
      const globalStyleSheet = new CSSStyleSheet();
      globalStyleSheet.replaceSync(inlineCss);
      shadowRoot.adoptedStyleSheets = [globalStyleSheet];
    }

    const emotionCache = createCache({ key: `shadow-${id}`, container: shadowRoot });
    const root = registry.get(id)!;
    root.render(<CacheProvider value={emotionCache}>{app}</CacheProvider>);
  }
};
