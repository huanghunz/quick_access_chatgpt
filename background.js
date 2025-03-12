chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-chatgpt",
    title: "Open ChatGPT",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-chatgpt") {
    chrome.windows.create({
      url: 'https://chat.openai.com',
      type: 'popup',
      width: 400,
      height: 600,
      left: 100,
      top: 100
    });
  }
});