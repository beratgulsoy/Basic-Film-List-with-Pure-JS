const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");

// Starting UI object
const ui = new UI();
// Starting Storage object
const storage = new Storage();

// Load All Events
eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Error
        ui.displayMessages("Tüm alanları doldurun..", "danger");
    } else {
        // New Film
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm); // adding film to the ui
        storage.addFilmToStorage(newFilm); // adding film to storage
        ui.displayMessages("Film Başarıyla Eklendi", "success");


    }

    ui.clearInputs(titleElement, urlElement, directorElement);

    e.preventDefault();
}
function deleteFilm(e){
    if (e.target.id === "delete-film"){
        ui.deleteFilmFromUi(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı..","success");
    }

}
function clearAllFilms(e) {
    if(confirm("Tüm filmleri silmek istediğinizden emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMessages("Tüm filmler başarıyla silindi..","success");
    }
}