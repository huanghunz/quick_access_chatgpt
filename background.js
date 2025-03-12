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

chrome.contextMenus.onClicked.addListener((info) => {
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
  const width = 400;
  const height = 600;

  chrome.system.display.getInfo((displays) => {
    const primaryDisplay = displays[0];
    const screenWidth = primaryDisplay.workArea.width;
    const screenHeight = primaryDisplay.workArea.height;

    // Position the window in the center of the screen
    let left = parseInt((screenWidth - width) / 2);
    let top = parseInt((screenHeight - height) / 2);

    // Ensure window stays within screen bounds
    left = Math.max(0, Math.min(left, screenWidth - width));
    top = Math.max(0, Math.min(top, screenHeight - height));

    //console.log('Window position:', { left, top, screenWidth, screenHeight });

    chrome.windows.create({
      url: 'https://chat.openai.com',
      type: 'popup',
      width: width,
      height: height,
      left: left,
      top: top
    }, (window) => {
      chatGPTWindowId = window.id;
    });
  });
}