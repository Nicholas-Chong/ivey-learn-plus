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
const showBookings = async() => {
  const parser = new DOMParser();
  const token = document.getElementById('token').value;
  const sessionValues = document.getElementById('hdnSessionValues').value;
  const userBookings = await fetch(`https://apps2.ivey.ca/lti/RoomBooking/MyBookings/MyBookings?token=${token}&sessionValues=${sessionValues}`)
    .then(userBookings => userBookings.text())
    .then( userBookings => {
      const doc = parser.parseFromString(userBookings, "text/html")
      return doc.getElementsByClassName('col-md-12')[0].innerHTML
    }
  );

  document.getElementById('dpBookARoom').innerHTML += userBookings;
}

// Function to delete user bookings
const deleteBooking = (event) => {
  const bookingId = event.target.getAttribute("data-rb");
  const studentDetailId = document.getElementById("mlid").value;

  const url = `https://apps2.ivey.ca/lti/RoomBooking/MyBookings/DeleteRoomBooking?resourceBookingId=${bookingId}&studentDetailId=${studentDetailId}`

  // missing cookies, referer -> possibly the url from showBookings
  const headers = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'content-length': '0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
  };

  const options = {
    method: 'POST',
    headers: headers,
  };

  fetch(url, options)
        .then(response => {
          if (!response.ok) {
            console.log(`Unable to delete booking, error status: ${response.status}`);
          }
          else {
            console.log("Successfully deleted your booking!");
          }
          return response;
        })
        .catch(error => {
          console.error(error);
        });
}

showBookings();
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

// Event listener for delete button
setTimeout(() => {
  const deleteButtons = document.getElementsByClassName("btn btn-default deleteRoomBooking");
  console.log(deleteButtons);
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteBooking);
  };
}, 3000); // delay to load DOM elements from showBookings function