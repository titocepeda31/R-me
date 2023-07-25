document.addEventListener("DOMContentLoaded", function () {
  var saveButton = document.getElementById("saveButton");
  var showPagesButton = document.getElementById("showPagesButton");

  saveButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      var pageData = {
        url: tab.url,
        title: tab.title
      };

      chrome.storage.local.get({ pages: [] })
        .then(function (result) {
          var pages = result.pages;
          pages.push(pageData);
          return chrome.storage.local.set({ pages: pages });
        })
        .then(function () {
          alert("Página Guardada Correctamente");
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });

  showPagesButton.addEventListener('click', function () {
    chrome.storage.local.get({ pages: [] })
      .then(function (result) {
        var pages = result.pages;
        console.log(pages);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});
