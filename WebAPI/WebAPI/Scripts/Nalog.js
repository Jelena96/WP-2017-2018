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

        $('html, body').animate({
            scrollTop: $('#prikaziNalog').offset().top
        }, 500);
        $('.popupKartica :nth-child(2)').focus();
    });


    $('#editProfil').click(function () {
        $('.prikazStranice').children().hide();
        $('#popupKarticaPrikaz').show();

        $('#imeIzmeni').val(korisnik['Ime']);
        $('.izmena :nth-child(6)').val(korisnik['Prezime']);
        $('#lozinkaIzmeni').val(korisnik['Lozinka']);
        $('.izmena :nth-child(14)').val(korisnik['JMBG']);
        $('.izmena :nth-child(18)').val(korisnik['BrojTelefona']);
        $('.izmena :nth-child(22)').val(korisnik['Email']);
        $('.izmena :nth-child(26)').val(korisnik['Pol']);
        $('.izmena :nth-child(26)').css('color', 'black');

        $('html, body').animate({
            scrollTop: $('#popupKarticaPrikaz').offset().top
        }, 500);
        $('.izmena :nth-child(2)').focus();
    });

    $('#izmeniDugme').click(function () {

        let uspesno = true;

        if ($('#imeIzmeni').val() != "") {
            korIme();
            

        }
        else {
            uspesno = false;
            korImeGreska('Morate uneti ime');
           
        }

        if ($('#prezimeIzmeni').val() != "") {

           
           
            korPrez();

        }
        else {

            uspesno = false;
            korPrezGreska('Morate uneti prezime');
        }

        if ($('#jmbgIzmena').val() != "") {

            korJmbg();
            uspesno = true;

        } else {

            korJmbgGreska('Morate uneti jmbg');
            uspesno = false;
            
        }
        if ($('#lozinkaIzmena').val() != "") {
           
            uspesno = true;
            korPas();

        } else {
            uspesno = false;
            korPasGreska('Morate uneti lozinku');
        }

        if ($('#telIzmena').val() != '') {

            if (isNaN($('#telIzmena').val()))
                korTelGreska("Niste uneli u pravom formatu");

            else {
                korTel();
                uspesno = true;
            }


        }
        else {

            korTelZacrveni('Niste uneli broj telefona');
            uspesno = false;
        }

        if (($('#emailIzmena').val() != '')) {

            let userinput = $('#emailIzmena').val();
            let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/;

            if (!pattern.test(userinput)) {

                korEmailGreska('Morate uneti validan email');


            } else {

                uspesno = true;
                korEmail();
            }

            

        } else {

            korEmailGreska('Niste uneli email');
            uspesno = false;
        }


        if (uspesno == true) {
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
        $('#lozinkaIzmena').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#lozinkaE').text(`\xA0${poruka}`);
    };

    let korPas = function (poruka) {

        $('#lozinkaIzmena').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#lozinkaE').text('');
    };



    let korEmailGreska = function (poruka) {
        $('#emailIzmena').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#emailE').text(`\xA0${poruka}`);
    };

    let korEmail = function (poruka) {

        $('#emailIzmena').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#emailE').text('');
    };


    let korPrezGreska = function (poruka) {
        $('#prezimeIzmena').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#prezimeE').text(`\xA0${poruka}`);
    };

    let korPrez = function (poruka) {

        $('#prezimeIzmena').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#prezimeE').text('');
    };


    let korImeGreska = function (poruka) {
        $('#imeIzmena').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#imeE').text(`\xA0${poruka}`);
    };

    let korIme = function (poruka) {

        $('#imeIzmena').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#imeE').text('');
    };
    
    let korTelGreska = function (poruka) {
        $('#telIzmena').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#telE').text(`\xA0${poruka}`);
    };

    let korTel = function (poruka) {

        $('#telIzmena').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#telE').text('');
    };

    let korJmbgGreska = function (poruka) {
        $('#jmbgIzmena').css('border-color', 'red');
        $('#izmenaDiv :nth-child(1)').css('color', 'red');
        $('#jmbgE').text(`\xA0${poruka}`);
    };

    let korJmbg = function (poruka) {

        $('#jmbgIzmena').css('border-color', 'white');
        $('#izmenaDiv :nth-child(1)').css('color', 'white');
        $('#jmbgE').text('');
    };

    


});