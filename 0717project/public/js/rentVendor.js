const moviesList = [
    { movieName: "台中大遠百威秀影城", price: 280 },
    { movieName: "台中TIGER CITY威秀影城", price: 280 },
    { movieName: "台中中港新光影城", price: 280 },
    { movieName: "親親戲院", price: 210 },
];

const selectMovieEl = document.getElementById("selectMovie");

const allSeatCont = document.querySelectorAll("#seatCont .seat");
console.log(allSeatCont);
const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");

const moviePriceEl = document.getElementById("moviePrice");

const cancelBtnEL = document.getElementById("cancelBtn");

const proceedBtnEl = document.getElementById("proceedBtn");


moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
});

let moviePrice = 280;
let currentMovieName = "星際效應";

selectMovieEl.addEventListener("input", (e) => {
    const selectedMovie = moviesList.find(movie => movie.movieName === e.target.value);
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));

    updatMovieName(movie, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
});

let initialSeatValue = 0;
allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
});

const seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");

let takenSeats = [];

seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
        let isSelected = seat.classList.contains("selected");

        let seatId = JSON.parse(seat.dataset.seatid);
        // 最多選擇五個座位
        if (!isSelected && takenSeats.length >= 5) {
            alert("最多只能選擇5個座位");
            return;
        }

        if (!isSelected) {
            seat.classList.add("selected");
            takenSeats.push(seatId);
            takenSeats = [...new Set(takenSeats)];
        } else if (isSelected) {
            seat.classList.remove("selected");

            takenSeats = takenSeats.filter((seat) => {
                if (seat !== seatId) {
                    return seat;
                }
            });
        }
        updateSeats();
        updatePrice(moviePrice, takenSeats.length);
    });
});

function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;

    takenSeats.forEach((seat) => {
        const seatHolder = document.createElement("div");
        seatHolder.classList.add("selectedSeat");
        selectedSeatsHolderEl.appendChild(seatHolder);

        seatHolder.innerHTML = seat;
    });

    if (!takenSeats.length) {
        const spanEl = document.createElement("span");
        spanEl.classList.add("noSelected");
        spanEl.innerHTML = `尚未選擇任何座位`;
        selectedSeatsHolderEl.appendChild(spanEl);
    }

    seatCount();
}

function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
}

function updateMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
}

function updatePrice(currentMoviePrice, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    console.log("Current movie price:", currentMoviePrice);
    console.log("Number of seats:", seats);
    let total = seats * currentMoviePrice;
    totalPriceEl.innerHTML = `$ ${total}`;
}

cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
});

function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
        seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
}

function successModal(movieNameIn, totalPrice, successTrue) {
    const bodyEl = document.querySelector("body");

    const sectionEl = document.getElementById("section");

    const overlay = document.createElement("div");

    overlay.classList.add("overlay");

    sectionEl.appendChild(overlay);

    const successModal = document.createElement("div");
    successModal.classList.add("successModal");
    const modalTop = document.createElement("div");
    modalTop.classList.add("modalTop");
    const popImg = document.createElement("img");
    popImg.src = "https://github.com/Dinesh1042/Vanilla-JavaScript-Projects/blob/main/Movie%20Booking/asset/pop.png?raw=true";
    modalTop.appendChild(popImg);

    successModal.appendChild(modalTop);

    // Modal Center

    const modalCenter = document.createElement("div");
    const modalHeading = document.createElement("h1");
    modalCenter.classList.add("modalCenter");
    modalHeading.innerHTML = `訂票成功`;
    modalCenter.appendChild(modalHeading);
    const modalPara = document.createElement("p");
    modalCenter.appendChild(modalPara);
    successModal.appendChild(modalCenter);

    // modal Bottom

    const modalBottom = document.createElement("div");
    modalBottom.classList.add("modalBottom");
    const successBtn = document.createElement("button");

    successBtn.innerHTML = `知道了`;
    modalBottom.appendChild(successBtn);
    successModal.appendChild(modalBottom);

    successBtn.addEventListener("click", (e) => {
        removeModal();
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("overlay")) {
            removeModal();
        }
    });

    function removeModal() {
        overlay.remove();
        successModal.remove();
        bodyEl.classList.remove("modal-active");
        cancelSeats();
    }

    sectionEl.appendChild(successModal);
}

proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
        const bodyEl = document.querySelector("body");
        bodyEl.classList.add("modal-active");
        successModal(currentMovieName, moviePrice * takenSeats.length);
    } else {
        alert("尚未選擇任何座位");
    }
});



// 場次選擇

// 場次選擇