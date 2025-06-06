import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'generateVarName',
    title: '生成变量名（Generate Var Name）',
    contexts: ['selection'], // 仅在选中文字时显示
  });
});

// 监听菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'generateVarName' && info.selectionText) {
    // 传递选中文字到 content script 或 popup
    chrome.tabs.sendMessage(tab!.id!, {
      type: 'GENERATE_VAR_NAME',
      text: info.selectionText,
    });
  }
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
