console.log('[CEB] All content script loaded');

let lastRightClickPosition = { x: 0, y: 0 };
window.addEventListener(
  'contextmenu',
  (e: MouseEvent) => {
    lastRightClickPosition = { x: e.clientX, y: e.clientY };
  },
  true,
);

const showFloatingUI = (text: string, position: { x: number; y: number }) => {
  // 👇 向 content-ui 发消息
  window.dispatchEvent(
    new CustomEvent('vargen:show', {
      detail: { text, position },
    }),
  );
};

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'GENERATE_VAR_NAME') {
    const originalText = message.text;
    const variableName = originalText.trim();

    // 弹出提示 UI：你可以用 position 来定位提示组件
    showFloatingUI(variableName, lastRightClickPosition);

    navigator.clipboard.writeText(variableName);
  }
});
