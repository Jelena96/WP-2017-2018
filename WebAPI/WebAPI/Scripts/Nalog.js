if (sessionStorage.getItem("logged") == null) {
    window.location.href = "login.html";
} else {
    var korisnikJson = sessionStorage.getItem("logged");
    var korisnik = $.parseJSON(korisnikJson);
}

$(document).ready(function () {
    $('#korIme').text('Korisnicko ime: ' + korisnik.Ime);
});