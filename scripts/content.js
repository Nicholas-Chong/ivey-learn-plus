document.getElementById('dpBookARoom').style.display = 'block'

const selectRoomElement = document.getElementById('selectRoom')
const observer = new MutationObserver((m) => {
  if (m.some((m) => m.target.id === 'selectRoom')) {
    document.getElementById('dpBookARoom').style.display = 'block'
  }
})
observer.observe(selectRoomElement, { attributes: false, childList: true, subtree: false })
