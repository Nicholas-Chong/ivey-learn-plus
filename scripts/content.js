const displayCalendar = () => {
    console.log("Displaying calendar...")

    const calendar = document.getElementById("tool_content").contentWindow.document.getElementById("dpBookARoom");

    if (calendar) {
        calendar.style.display = "block";
    }
    else {
        console.log("could not find calendar.")
    }
}

window.onload = displayCalendar;
