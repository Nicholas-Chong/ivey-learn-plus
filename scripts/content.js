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
  const rooms = Array.from(document.getElementsByClassName("headerRoomCell"));
  rooms.forEach((room) => {
    const roomNumber = room.textContent;
    if (windowRooms.includes(roomNumber)) room.textContent = `${roomNumber} 🪟`;
  });
};

// Call all enabled functions
const callEnabledFunctions = () => {
  // Fetches settings from sync server and calls appropriate functions
  chrome.storage.sync.get(null, function (result) {
    if(result["calendarBox"]) showCalendar();
    if(result["windowBox"]) markWindowRooms();
  });  
};

callEnabledFunctions();

// Elements to observe
const selectRoomElement = document.getElementById("selectRoom");
const observer = new MutationObserver((m) => {
  if (m.some((m) => m.target.id === "selectRoom")) {
    callEnabledFunctions();
  }
});
observer.observe(selectRoomElement, { attributes: false, childList: true, subtree: false });
