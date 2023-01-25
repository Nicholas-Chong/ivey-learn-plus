/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// Function to show hidden calendar element
const showCalendar = () => {
  document.getElementById("dpBookARoom").style.display = "flex";
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

const getTokenAndSession = () => {
  const token = document.getElementById("token").value;
  const sessionValues = document.getElementById("hdnSessionValues").value;

  return [token, sessionValues];
};

// Function to fetch user bookings
const showBookings = async () => {
  const parser = new DOMParser();
  const [token, sessionValues] = getTokenAndSession();
  const userBookings = await fetch(
    `https://apps2.ivey.ca/lti/RoomBooking/MyBookings/MyBookings?token=${token}&sessionValues=${sessionValues}`
  )
    .then((userBookings) => userBookings.text())
    .then((userBookings) => {
      const doc = parser.parseFromString(userBookings, "text/html");
      return doc.getElementsByClassName("col-md-12")[0].innerHTML;
    });

  document.getElementById("dpBookARoom").innerHTML += userBookings;

  // Attach event listener to delete button
  const deleteContainers = document.getElementsByClassName("inline-block");
  for (let i = 0; i < deleteContainers.length; i++) {
    deleteContainers[i].addEventListener("click", deleteBooking, true);
  }
};

// Function to delete user bookings
const deleteBooking = (event) => {
  const button = event.currentTarget.querySelector("button.deleteRoomBooking");
  const bookingId = button.getAttribute("data-rb");
  const studentDetailId = document.getElementById("mlid").value;
  const [token, sessionValues] = getTokenAndSession();
  const url = `https://apps2.ivey.ca/lti/RoomBooking/MyBookings/DeleteRoomBooking?resourceBookingId=${bookingId}&studentDetailId=${studentDetailId}`;

  const headers = {
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "content-length": "0",
    origin: "https://apps2.ivey.ca",
    sessionvalues: sessionValues,
    token,
    "sec-ch-ua": '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
  };

  const options = {
    method: "POST",
    headers,
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        console.log(`Unable to delete booking, error status: ${response.status}`);
      } else {
        console.log("Successfully deleted your booking!");
      }
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

  window.location.reload();
};

// Call all enabled functions
const callEnabledFunctions = () => {
  // Fetches settings from sync server and calls appropriate functions
  chrome.storage.sync.get(null, function (result) {
    if (result.bookingsBox) showBookings();
    if (result.calendarBox) showCalendar();
    if (result.windowBox) markWindowRooms();
  });
};

callEnabledFunctions();

const f = () => {
  const elem = document.getElementsByClassName("grid-row row-spacer")[0].innerHTML;

  const styles =
    ".col-md-12  { max-width:75%; display: flex; overflow: scroll; max-height: 300px; }";
  const css = document.createElement("style");
  //       css.type = 'text/css';

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  //       /* Append style to the head element */
  document.getElementsByTagName("HEAD")[0].appendChild(css);

  console.log(css);
  return elem;
};

// Elements to observe
const selectRoomElement = document.getElementById("selectRoom");
const observer = new MutationObserver((m) => {
  if (m.some((m) => m.target.id === "selectRoom")) {
    callEnabledFunctions();
  }
});
observer.observe(selectRoomElement, { attributes: false, childList: true, subtree: false });

// Event listener for delete button
setTimeout(() => {
  const deleteContainers = document.getElementsByClassName("inline-block");
  for (let i = 0; i < deleteContainers.length; i++) {
    deleteContainers[i].addEventListener("click", deleteBooking, true);
  }
}, 1000); // delay to load DOM elements from showBookings function
