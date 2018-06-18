if (sessionStorage.getItem("logged") == null) {
    window.location.href = "login.html";
} else {
    var korisnikJson = sessionStorage.getItem("logged");
    var korisnik = $.parseJSON(korisnikJson);
}

$(document).ready(function () {
    $('#korIme').text('Korisnicko ime: ' + korisnik.Ime);
    $('#closePrikazNaloga').click(function () {
        $('#prikaz').hide();


    });

    $('#closeButton').click(function () {
        $('#izmena').hide();


    });


    $('#pogledajProfil').click(function () {
        $('#prikaz').show();


    });


    $('#editProfil').click(function () {
        $('#izmena').show();


    });
    //edit
    $('#pogledajProfil').click(function () {
        //$('.prikazStranice').children().hide();
        $('#prikaziNalog').show();

        $('.prikaz :nth-child(2)').val(korisnik['Ime']);
        $('.prikaz :nth-child(4)').val(korisnik['Prezime']);
        $('.prikaz :nth-child(6)').val(korisnik['Lozinka']);
        $('.prikaz :nth-child(8)').val(korisnik['JMBG']);
        $('.prikaz :nth-child(10)').val(korisnik['BrojTelefona']);
        $('.prikaz :nth-child(12)').val(korisnik['Email']);
        $('.prikaz :nth-child(14)').css('color', 'black');
        $('.prikaz :nth-child(14)').val(korisnik['Uloga']);

       
    });


    $('#editProfil').click(function () {
        $('.prikazStranice').children().hide();
        $('#popupKarticaPrikaz').show();

        $('#imeIzmeni').val(korisnik['Ime']);
        $('#prezimeIzmena').val(korisnik['Prezime']);
        $('#lozinkaIzmeni').val(korisnik['Lozinka']);
        $('#jmbgIzmena').val(korisnik['JMBG']);
        $('#telIzmena').val(korisnik['BrojTelefona']);
        $('#emailIzmena').val(korisnik['Email']);
        $('#polPolje').val(korisnik['Pol']);
        $('.izmena :nth-child(26)').css('color', 'black');

       
    });

    $('#izmeniDugme').click(function () {

        var nameReg = /^[A-Za-z]+$/;
        var numberReg = /^\b\d{13}\b$/i;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = $('#emailIzmeni').val();
        let telefon = $('#telIzmeni').val();
        let podudaranje = true;

        if ($('#imeIzmeni').val() == "") {

            korImeGreska('Morate uneti ime');

        } else if ($('#prezimeIzmeni').val() == "") {

            korPrezGreska('Morate uneti prezime');
            korIme();

        }
        else if (!numberReg.test($('#jmbgIzmeni').val())) {

            korJmbgGreska('Morate uneti jmbg(13 cifara)');
            korPrez();

        }
        else if ($('#lozinkaIzmeni').val() == "") {
            korPasGreska('Morate uneti lozinku');
            korJmbg();

        }
        else if (isNaN(telefon) || telefon == '') {

            korTelGreska('Niste uneli broj telefona');
            korPas();

            
        }

        else if ((!emailReg.test(email)) || email == "") {


            korEmailGreska('Niste uneli email');
            korTel();

        } else if (emailReg.test(email) && !isNaN(telefon) && email != '' && telefon != '') {

            korEmail();
            let musterija = {
                Ime: `${$('.izmena :nth-child(2)').val()}`,
                Prezime: `${$('.izmena :nth-child(6)').val()}`,
                Lozinka: `${$('#lozinkaIzmeni').val()}`,
                JMBG: $('.izmena :nth-child(14)').val(),
                KontaktTelefon: $('.izmena :nth-child(18)').val(),
                Email: `${$('.izmena :nth-child(22)').val()}`,

                Pol: `${$('.izmena :nth-child(26) option:selected').text()}`
            };

            $.ajax({
                type: 'POST',
                url: '/api/Registration/IzmeniProfil',
                data: JSON.stringify(musterija),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).done(function (data) {
                if (data === null) {
                    alert("Neuspesna izmena");
                } else {
                    $('.izmena').css('display', 'none');
                    $('.izmena').after('<button type="button" class="closeButton2">OK</button>');
                    $('.izmena').after('<p style="color: yellow; font-size: 22px;">Uspesno ste izmenili nalog! <p>');
                    sessionStorage.setItem('logged', data);
                    korisnik = data;
                }
            });


        }

    });


    let korPasGreska = function (poruka) {
        $('#lozinkaIzmeni').css('border-color', 'red');
        $('#izmenaDiv :nth-child(7)').css('color', 'red');
        $('#lozinkaE').text(`\xA0${poruka}`);
    };

    let korPas = function (poruka) {

        $('#lozinkaIzmeni').css('border-color', 'white');
        $('#izmenaDiv :nth-child(7)').css('color', 'white');
        $('#lozinkaE').text('');
    };



    let korEmailGreska = function (poruka) {
        $('#emailIzmeni').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#emailE').text(`\xA0${poruka}`);
    };

    let korEmail = function (poruka) {

        $('#emailIzmeni').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#emailE').text('');
    };


    let korPrezGreska = function (poruka) {
        $('#prezimeIzmeni').css('border-color', 'red');
        $('#izmenaDiv :nth-child(5)').css('color', 'red');
        $('#prezimeE').text(`\xA0${poruka}`);
    };

    let korPrez = function (poruka) {

        $('#prezimeIzmeni').css('border-color', 'white');
        $('#izmenaDiv :nth-child(5)').css('color', 'white');
        $('#prezimeE').text('');
    };


    let korImeGreska = function (poruka) {
        $('#imeIzmeni').css('border-color', 'red');
        $('#izmenaDiv :nth-child(2)').css('color', 'red');
        $('#imeE').text(`\xA0${poruka}`);
    };

    let korIme = function (poruka) {

        $('#imeIzmeni').css('border-color', 'white');
        $('#izmenaDiv :nth-child(2)').css('color', 'white');
        $('#imeE').text('');
    };
    
    let korTelGreska = function (poruka) {
        $('#telIzmeni').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#telE').text(`\xA0${poruka}`);
    };

    let korTel = function (poruka) {

        $('#telIzmeni').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#telE').text('');
    };

    let korJmbgGreska = function (poruka) {
        $('#jmbgIzmeni').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#jmbgE').text(`\xA0${poruka}`);
    };

    let korJmbg = function (poruka) {

        $('#jmbgIzmeni').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#jmbgE').text('');
    };

    


});