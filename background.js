// Store the window ID globally
let chatGPTWindowId = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-chatgpt",
    title: "Open ChatGPT",
    contexts: ["all"]
  });
});

// Handle window removal
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === chatGPTWindowId) {
    chatGPTWindowId = null;
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-chatgpt") {
    // Check if window already exists
    if (chatGPTWindowId !== null) {
      // Window exists, focus it
      chrome.windows.update(chatGPTWindowId, {
        focused: true
      }, (window) => {
        // If window update fails (window was closed unexpectedly), create new window
        if (chrome.runtime.lastError) {
          createNewWindow();
        }
      });
    } else {
      // No window exists, create new one
      createNewWindow();
    }
  }
});

function createNewWindow() {
  chrome.windows.create({
    url: 'https://chat.openai.com',
    type: 'popup',
    width: 400,
    height: 600,
    left: 100,
    top: 100
  }, (window) => {
    chatGPTWindowId = window.id;
  });
}