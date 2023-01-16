chrome.tabs.onUpdated.addListener(async function (
    tabId,
    changeInfo,
    tab,
) {
    console.log(tab.url)
}
)

const isLearnUrl = () => {
    if (tab.url == "https://ivey.instructure.com/accounts/1/external_tools/532?launch_type=global_navigation") {
        console.log("content script call")
        chrome.scripting.executeScript(
            {
                files: ["scripts/content.js"]
            }
        )
    }
}