chrome.tabs.onUpdated.addListener(async function (
  tabId,
  changeInfo,
  tab
) {
  if (!tab.url.includes('ivey') || changeInfo.status !== 'complete') return

  const frames = await chrome.webNavigation.getAllFrames({ tabId })

  const roomBookingFrame = frames.find((f) => f.url === 'https://apps2.ivey.ca/lti/RoomBooking/provider/tool')
  if (!roomBookingFrame) return

  chrome.scripting.executeScript({
    files: ['scripts/content.js'],
    target: { tabId, frameIds: [roomBookingFrame.frameId] }
  })
})
