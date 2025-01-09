document.addEventListener('DOMContentLoaded', function() {
  const focusModeToggle = document.getElementById('focusMode');
  
  // Load saved state
  chrome.storage.local.get(['focusMode'], function(result) {
    focusModeToggle.checked = result.focusMode || false;
  });
  
  // Save state when changed
  focusModeToggle.addEventListener('change', function() {
    chrome.storage.local.set({ focusMode: this.checked });
    
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'toggleFocusMode',
          enabled: focusModeToggle.checked 
        });
      }
    });
  });
});