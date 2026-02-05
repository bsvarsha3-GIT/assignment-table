let trips = [];
let editIndex = null;

const form = document.getElementById("tripForm");
const tripDate = document.getElementById("tripDate");
const nameInput = document.getElementById("name");
const placeInput = document.getElementById("place");
const tableBody = document.getElementById("tripTableBody");
const tripDetailsSection = document.getElementById("tripDetailsSection");

tripDate.addEventListener("input", () => tripDate.setCustomValidity(""));
nameInput.addEventListener("input", () => nameInput.setCustomValidity(""));
placeInput.addEventListener("change", () => placeInput.setCustomValidity(""));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  if (!tripDate.value) {
    tripDate.setCustomValidity("Please select a trip date");
    tripDate.reportValidity();
    valid = false;
  } else if (nameInput.value.trim().length < 3) {
    nameInput.setCustomValidity("Name must be at least 3 characters");
    nameInput.reportValidity();
    valid = false;
  } else if (!placeInput.value) {
    placeInput.setCustomValidity("Please select a city");
    placeInput.reportValidity();
    valid = false;
  }

  if (!valid) return;

  const tripData = {
    date: tripDate.value,
    name: nameInput.value.trim(),
    place: placeInput.value
  };

  if (editIndex === null) {
    trips.push(tripData);
  } else {
    trips[editIndex] = tripData;
    editIndex = null;
  }

  displayTrips();
  tripDetailsSection.style.display = "block";
  form.reset();
});

function displayTrips() {
  tableBody.innerHTML = "";

  trips.forEach((trip, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${trip.date}</td>
      <td>${trip.name}</td>
      <td>${trip.place}</td>
      <td>
        <button onclick="editTrip(${index})">Edit</button>
        <button onclick="deleteTrip(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editTrip(index) {
  const trip = trips[index];
  tripDate.value = trip.date;
  nameInput.value = trip.name;
  placeInput.value = trip.place;
  editIndex = index;
}

function deleteTrip(index) {
  trips.splice(index, 1);
  displayTrips();

  if (trips.length === 0) {
    tripDetailsSection.style.display = "none";
  }
}
