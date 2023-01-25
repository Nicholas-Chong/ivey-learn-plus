// Get manifest data
const manifestData = chrome.runtime.getManifest();

// Retrieves and sets current verion number from manifest
const setVersion = () => {
  const version = manifestData.version;
  document.getElementById("version").innerHTML = "Version: " + version;
};

// Retrieves and loads extension settings
const loadSettings = () => {
  // List of all settings
  let settings = Array.from(document.getElementsByTagName("input"));
  settings.forEach((setting) => {
    let key = setting.name
    // Fetches status of specific setting, callback sets current settings
    chrome.storage.sync.get(key, function (result) {
      document.getElementById(key).checked = result[key];
    });  
  });
};

// Saves extension settings in the cloud or locally
const saveSettings = () => {
  let settingsForm = document.getElementById("settings");
  let formData = new FormData(settingsForm);

  // Set default value to off
  let object = {};
  let settings = Array.from(document.getElementsByTagName("input"));
  settings.forEach((setting) => {
    object[setting.name] = false;
  });
  
  // If any boxes are checked, set on
  formData.forEach((value, key) => {
    object[key] = true;
  });

  // Save to sync storage
  chrome.storage.sync.set(object, () => {
  })
};

window.onload = () => {
  setVersion();
  loadSettings();
};

// Save button
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", async () => {
  saveSettings();
});
