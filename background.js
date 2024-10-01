// background.js
chrome.runtime.onInstalled.addListener(function() {
    console.log("LazyFormFiller Extension installed");
    // Load the fake data JSON into chrome.storage
    fetch(chrome.runtime.getURL('fakeData.json'))
      .then(response => response.json())
      .then(data => {
        chrome.storage.local.set({fakeData: data}, function() {
          console.log('Fake data loaded into storage');
        });
      });
  });