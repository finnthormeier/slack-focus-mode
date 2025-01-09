let focusModeEnabled = false;

// Check initial state
chrome.storage.local.get(['focusMode'], function(result) {
  focusModeEnabled = result.focusMode || false;
  if (focusModeEnabled) {
    document.documentElement.classList.add('slack-focus-mode');
  }
});

// Listen for changes from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleFocusMode') {
    focusModeEnabled = request.enabled;
    if (focusModeEnabled) {
      document.documentElement.classList.add('slack-focus-mode');
    } else {
      document.documentElement.classList.remove('slack-focus-mode');
    }
  }
});