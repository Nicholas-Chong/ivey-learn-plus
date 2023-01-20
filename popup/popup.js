// Get manifest data
const manifestData = chrome.runtime.getManifest();

const setVersion = () => {
  const version = manifestData.version;
  document.getElementById("version").innerHTML = "Version: " + version;
};

const getStorageValuePromise = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, resolve);
  })
};

// Retrieves and loads extension settings
const loadSettings = async() => {
  let settings = Array.from(document.getElementsByTagName("input"));
  settings.forEach((setting) => {
    getStorageValuePromise(setting.name).then((result) => {
      let settingBox = document.getElementById(setting.name).checked = result.value;
      console.log(setting.name + " result: " + result.value);
    });
  /*
  chrome.storage.sync.get(null, function(items) {
    console.log(items);
  });
  */
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

  let json = JSON.stringify(object)
  console.log(json)

  // Save to sync storage
  chrome.storage.sync.set(object, () => {
    console.log("Setting saved!")
  })
};

window.onload = () => {
  setVersion();
  loadSettings();
};

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", async () => {
  saveSettings();
  console.log("click")
});
