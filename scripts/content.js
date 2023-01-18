// Function to show hidden calendar element
const showCalendar = () => {
  console.log("Displaying calendar...")

  document.getElementById('dpBookARoom').style.display = 'block'
}

// Function to mark rooms as windowed
const markWindowRooms = () => {
  console.log("Marking window rooms...")

  const windowRooms = ['1231', '1237', '1239', '1321', '1323', '1325', '1381', '1383', '1387', '2101', '2104', '3101', '3104'];
  const rooms = document.getElementsByClassName('headerRoomCell');
  for(var i = 0; i < rooms.length; i++) {
    var roomNumber = rooms[i].textContent
    if(windowRooms.includes(roomNumber)) {
      rooms[i].textContent = roomNumber + " 🪟"
    }
  };

}

showCalendar();
markWindowRooms();

// Elements to observe
const selectRoomElement = document.getElementById('selectRoom')

const observer = new MutationObserver((m) => {
  if (m.some((m) => m.target.id === 'selectRoom')) {
    showCalendar();
    markWindowRooms();
  }
})
observer.observe(selectRoomElement, { attributes: false, childList: true, subtree: false })