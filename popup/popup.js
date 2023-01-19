// Get manifest data
const manifestData = chrome.runtime.getManifest()

const setVersion = () => {
    const version = manifestData.version
    document.getElementById("version").innerHTML = "Version: " + version
}

window.onload = () => {
    setVersion();
}
