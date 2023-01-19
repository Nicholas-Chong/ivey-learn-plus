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

// Function to fetch user bookings
const fetchBookings = async() => {
  const parser = new DOMParser();
  const token = document.getElementById('token').value
  const sessionValues = document.getElementById('hdnSessionValues').value
  const userBookings = await fetch(`https://apps2.ivey.ca/lti/RoomBooking/MyBookings/MyBookings?token=${token}&sessionValues=${sessionValues}`)
    .then(userBookings => userBookings.text())
    .then( userBookings => {
      const doc = parser.parseFromString(userBookings, "text/html")
      return doc.getElementsByClassName('item-group')
    }
  )
    
  console.log(userBookings)

  return userBookings
}

// Function to show user bookings
const showBookings = () => {
  const userBookings = fetchBookings();
  const displayFrame = document.getElementById('dpBookARoom')

}

fetchBookings();
//showBookings();
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
