// Function to show hidden calendar element
const showCalendar = () => {
  document.getElementById("dpBookARoom").style.display = "block";
};

// Function to mark rooms as windowed
const markWindowRooms = () => {
  const windowRooms = [
    "1231",
    "1237",
    "1239",
    "1321",
    "1323",
    "1325",
    "1381",
    "1383",
    "1387",
    "2101",
    "2104",
    "3101",
    "3104",
  ];
  const rooms = document.getElementsByClassName("headerRoomCell");
  rooms.forEach((room) => {
    const roomNumber = room.textContent;
    if (windowRooms.includes(roomNumber)) room.textContent = `${roomNumber} 🪟`;
  });
};

showCalendar();
markWindowRooms();

// Elements to observe
const selectRoomElement = document.getElementById("selectRoom");
const observer = new MutationObserver((m) => {
  if (m.some((m) => m.target.id === "selectRoom")) {
    showCalendar();
    markWindowRooms();
  }
});
observer.observe(selectRoomElement, { attributes: false, childList: true, subtree: false });
