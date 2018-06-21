if (sessionStorage.getItem("logged") === null) {
    window.location.href = "login.html";
} else {
    var korisnikJson = sessionStorage.getItem("logged");
    var korisnik = $.parseJSON(korisnikJson);
}
var zapamtiId;
$(document).ready(function () {
    $('#korIme').text('Korisnicko ime: ' + korisnik.KorisnickoIme);
    $('#closePrikazNaloga').click(function () {
        $('#prikaz').hide();


    });

    $('#closeButton').click(function () {
        $('#izmena').hide();


    });

    //dodavanje vozaca - samo admini

    if (korisnik.UlogaKorisnika === "Admin") {
        $('#vozaciDivDugme').show();


    }
    $('#vozaciDivDugme').click(function () {
        $('#vozaciDiv').show();


    });


    $('#okDugme').click(function () {
        window.location.href = "login.html";


    });

    if (korisnik.UlogaKorisnika === "Vozac") {
        $('#dugmePromenaLokacije').show();
        $('#izmeniA').show();
        $('#izmeniV').show();
        $('#editProfil').hide();



    }

    $('#dugmePromenaLokacije').click(function () {
        $('#promenaLokacije').show();


    });

    $('#closePromena').click(function () {
        $('#promenaLokacije').hide();


    });

    $('#izmeniA').click(function () {
        $('#izmeniAutomobil').show();


    });
    $('#izmeniV').click(function () {
        $('#izmenaVozaca').show();


    });

    //dodajem voznju
    $('#zakaziVoznjuDugme').click(function () {
        $('#zakaziVoznju').show();
        $('#tipVozila').val('BezNaznake');

    });

    $('#closeZakaziVoznju').click(function () {
        $('#zakaziVoznju').hide();


    });



    $('#prikazVoznje').click(function () {


        let musterija = {

            ime: korisnik.KorisnickoIme,

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/Ucitaj',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            let tabela = '<div id="voznjeKartica"><table id="tabelaPrikaz">' +
                '<tr> ' +
                '<th id="datumMusterija" style="cursor: pointer;">Datum porudzbine</th>' +
                '<th>Musterija</th>' +
                '<th>Adresa</th>' +
                '<th>Tip automobila</th>' +
                '<th>Odrediste</th>' +
                '<th>Dispecer</th>' +
                '<th>Vozac</th>' +
                '<th>Iznos</th>' +
                '<th>Status voznje</th>' +
                '<th>Komentar</th>' +
                '<th>Korisnik</th>' +
                '<th id="ocenaMusterija" style="cursor: pointer;">Ocena</th>' +
                '<th>Datum</th>';
            for (let i = 0; i < retVal.length; i++) {

                let cena = retVal[i].Iznos;
                let tipAuta = "";
                let stanje = "";

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                

                tabela += '</tr>' +
                    '<tr>' +
                    '<td>' + retVal[i].DTPorudzbine + '</td>' +
                    '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                    '<td>' + retVal[i].Dolazak.Adresa.UlicaIBroj + '</td>' +
                    '<td>' + tipAuta + '</td>' +
                    '<td> - </td>' +
                    '<td> - </td>' +
                    '<td> - </td>' +
                    '<td>' + cena + '</td>' +
                    '<td> ' + retVal[i].StatusVoznje +'</td>' +
                    '<button value = ' + retVal[i].IdVoznje + ' id="otkazi" style = "float: right; color: gray;" >Otkazi</button >' +
                    '<button value = ' + retVal[i].IdVoznje + ' id="promeni" style = "margin-right: 10px; float: right; color: gray;" >Promeni</button >' +
                    '</td > ' +
                    '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                    '<td> - </td>' +
                    '<td> 0 </td>' +
                    '<td> - </td>' +
                    '</tr>';

            }
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);



        });



    });

    $('#prikazi').on("click", "#otkazi", function () {

        zapamtiId = $(this).val();

        let voznja = {

            ime: korisnik.KorisnickoIme,
            i: $(this).val(),
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/OtkaziVoznju',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesno otkazivanje");
            } else {
               
                $('#prikazi').after('<p style="color: yellow; font-size: 22px;">Uspesno ste otkazali voznju! <p>');
                $('#komentarNaVoznju').show();
            }
            });





    });

    $('#prikazi').on("click", "#promeni", function () {
        $('#promenaVoznje').show();
    });

    $("#DugmePromeniVoznju").click(function () {
       
        
        let ulicao = $('#ulicaZakaziP').val();
        let broj = $('#brojZakaziP').val();
        let mesto = $('#mestoZakaziP').val();
        let pozivniBroj = $('#pozivniBrojMestaZakaziP').val();
        let x = $('#xZakaziP').val();
        let y = $('#yZakaziP').val();

        let adresa = {

            UlicaIBroj: `${ulicao}*${broj}`,
            NaseljenoMesto: mesto,
            PozivniBroj: pozivniBroj,

        };

        let lokacija = {

            Adresa: adresa,
            X: x,
            Y: y

        };



        let voznja = {

            IdVoznje: $(this).val(),
            Odrediste: lokacija,
            TipAutaVoznje: `${$('#tipVozilaP').val()}`,
            MusterijaVoznja: korisnik.KorisnickoIme
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/PromeniVoznju',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function () {
                $('#prikazi').after('<p style="color: yellow; font-size: 24px;">Uspesno ste promenili voznju! <p>');

              

            },
            
        });





    });

    $('#DugmeKomentarNaVoznju').click(function ()
    {


        let komentar = {

            Opis: $("#opis").val(),
            VremeObjave: Date.now,
            KorisnikKomentar: korisnik.KorisnickoIme,
            IdVoznje: zapamtiId,
            Ocena:$("#ocena").val(),
            
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/KomentarisiVoznju',
            data: JSON.stringify(komentar),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function () {
                $('#prikazi').after('<p style="color: yellow; font-size: 24px;">Uspesno ste komentarisali voznju! <p>');
                
            },
            error: function (data) {
                alert('Nije komentarisana voznja!');
            }
        });



    });
  

    
    $('#DugmeZakaziVoznju').click(function () {

        let ulicao = $('#ulicaZakazi').val();
        let broj = $('#brojZakazi').val();
        let mesto = $('#mestoZakazi').val();
        let pozivniBroj = $('#pozivniBrojMestaZakazi').val();
        let x = $('#xZakazi').val();
        let y = $('#yZakazi').val();

        let adresa = {

            UlicaIBroj: `${ulicao}*${broj}`,
            NaseljenoMesto: mesto,
            PozivniBroj: pozivniBroj,

        };

        let lokacija = {
            
           Adresa: adresa,
            X: x,
            Y: y

        };

        

        let voznja = {
          
            Odrediste: lokacija,
            TipAutaVoznje: `${$('#tipVozila').val()}`,
            MusterijaVoznja: korisnik.KorisnickoIme
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/ZakaziVoznju',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function () {
                  $('#zakaziVoznju').after('<p style="color: yellow; font-size: 24px;">Uspesno ste kreirali voznju! <p>');
                  sessionStorage.setItem("trenutnaVoznja", JSON.stringify(data));
            },
            error: function (data) {
                alert('Nije dodata voznja!');
            }
        });


    });

    $('#dodajV').click(function () {

        let imeV = $('#imeVozac').val();
        let prezimeV = $('#prezimeVozac').val();
        let lozinkaV = $('#lozinkaVozac').val();
        let jmbgV = $('#jmbgVozac').val();
        let telV = $('#telVozac').val();
        let emailV = $('#emailVozac').val();
        let polV = $('#pol').val();

        let vozac = {
            Ime: $('#ImeVozac').val(),
            KorisnickoIme: imeV,
            Prezime: prezimeV,
            Lozinka: lozinkaV,
            JMBG: jmbgV,
            KontaktTelefon: telV,
            Email: emailV,
            Pol: polV
        };

        $.ajax({
            type: 'POST',
            url: '/api/Vozac/Dodaj',
            data: JSON.stringify(vozac),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesno dodavanje");
            } else {
                alert("Uspesno dodavanje");
                $('.izmena').css('display', 'none');
                $('#vozaciDiv').after('<button type="button" id="okDugme">OK</button>');
                $('#vozaciDiv').after('<p style="color: yellow; font-size: 22px;">Uspesno ste dodali vozaca! <p>');
                sessionStorage.setItem('logged', data);
                korisnik = data;
            }
        });

    });

    $('#izmeniV').click(function () {
        $('.prikazStranice').children().hide();
       

        $('#imeIzmeniV').val(korisnik['Ime']);
        $('#prezimeIzmeniV').val(korisnik['Prezime']);
        $('#lozinkaIzmeniV').val(korisnik['Lozinka']);
        $('#jmbgIzmeniV').val(korisnik['Jmbg']);
        $('#telIzmeniV').val(korisnik['BrojTelefona']);
        $('#emailIzmeniV').val(korisnik['Email']);
        $('#polPoljeV').val(korisnik['Pol']);
        $('.izmena :nth-child(26)').css('color', 'black');


    });

    $('#dugmePromenaLokacije').click(function () {
        $('.prikazStranice').children().hide();


        $('#x').val(korisnik.vozac.lokacija.X['X']);
        $('#y').val(korisnik.lokacija.Y['Y']);
        $('#mesto').val(korisnik.lokacija.adresa['NaseljenoMesto']);
        $('#ulica').val(korisnik.lokacija.adresa.UlicaIBroj['UlicaIBroj']);
        $('#broj').val(korisnik.lokacija.adresa.UlicaIBroj['UlicaIBroj']);
        $('#pozivniBroj').val(korisnik.lokacija.adresa.PozivniBroj['PozivniBroj']);


    });

    $('#izmeniA').click(function () {
        $('.prikazStranice').children().hide();


        $('#godiste').val(korisnik.Automobil['GodisteAuta']);
        $('#regOznaka').val(korisnik.Automobil['RegistarskaOznaka']);
        $('#brojTaksiVozila').val(korisnik.Automobil['BrojVozila']);
        $('#tipAuta').val(korisnik.Automobil['TipAuta']);
     


    });

    $('#izmeniDugmeV').click(function () {

     

        let vozac = {
            Ime: $('#imeIzmeniV').val(),
            KorisnickoIme: korisnik.KorisnickoIme,
            Prezime: $('#prezimeIzmeniV').val(),
            Lozinka: $('#lozinkaIzmeniV').val(),
            Jmbg: $('#jmbgIzmeniV').val(),
            BrojTelefona: $('#telIzmeniV').val(),
            Email: $('#emailIzmeniV').val(),
        };

        $.ajax({
            type: 'POST',
            url: '/api/Vozac/IzmeniProfil',
            data: JSON.stringify(vozac),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesno dodavanje");
            } else {
                alert("Uspesno dodavanje");
                $('#vozaciDiv').after('<p style="color: yellow; font-size: 22px;">Uspesno ste izmenli vozaca! <p>');
                sessionStorage.setItem('logged', data);
                korisnik = data;
            }
        });

    });

    $('#promeniLokacijuDugme').click(function () {

       
        let ulicao = $('#ulica').val();
        let broj = $('#broj').val();
        let mesto = $('#mesto').val();
        let pozivniBroj = $('#pozivniBroj').val();
        let x = $('#x').val();
        let y = $('#y').val();

        let lokacija = {
            imeV: korisnik.KorisnickoIme,
            ulica: `${ulicao}*${broj}`,
            NaseljenoMesto: mesto,
            PozivniBroj: pozivniBroj,
            X: x,
            Y:y
            
        };

        $.ajax({
            type: 'POST',
            url: '/api/Vozac/PromeniLokaciju',
            data: JSON.stringify(lokacija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesna izmena");
            } else {
                alert("Uspesna izmena");
                $('#vozaciDiv').after('<p style="color: yellow; font-size: 22px;">Uspesno ste promenili lokaciju! <p>');
               
            }
        });

    });

   


    $('#promeniAutomobil').click(function () {


       

        let auto = {

            GodisteAuta: $('#godiste').val(),
            RegistarskaOznaka: $('#regOznaka').val(),
            BrojVozila: $('#brojTaksiVozila').val(),
            TipAuta: $('#tipAuta').val()

        };


        let vozac = {
            KorisnickoIme: korisnik.KorisnickoIme,
            Ime: korisnik["Ime"],
            Prezime: korisnik["Prezime"],
            Lozinka: korisnik["Lozinka"],
            JMBG: korisnik["Jmbg"],
            BrojTelefona: korisnik["BrojTelefona"],
            Email: korisnik["Email"],
            Pol:korisnik["Pol"],
            Automobil:auto
            /*Prezime: korisnik.Prezime,
            Lozinka: korisnik.Lozinka,
            JMBG: korisnik.JMBG,
            KontaktTelefon: korisnik.BrojTelefona,
            Email: korisnik.Email,
            Pol: korisnik.Pol,
                Automobil: auto*/

        };

        $.ajax({
            type: 'POST',
            url: '/api/Vozac/IzmeniAuto',
            data: JSON.stringify(vozac),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesna izmena");
            } else {
                alert("Uspesna izmena");
                $('#vozaciDiv').after('<p style="color: yellow; font-size: 22px;">Uspesno ste promenili lokaciju! <p>');

            }
        });

    });

    $('#pogledajProfil').click(function () {
        $('#prikaz').show();


    });

    $('#izlogujSe').click(function () {
        sessionStorage.setItem('logged', null);
        window.location.href = "login.html";
    });

    $('#editProfil').click(function () {
        $('#izmena').show();


    });
    //edit
    $('#pogledajProfil').click(function () {
        //$('.prikazStranice').children().hide();
        $('#prikaziNalog').show();

        $('.prikaz :nth-child(2)').val(korisnik['KorisnickoIme']);
        $('.prikaz :nth-child(4)').val(korisnik['Ime']);
        $('.prikaz :nth-child(6)').val(korisnik['Prezime']);
        $('.prikaz :nth-child(8)').val(korisnik['Lozinka']);
        $('.prikaz :nth-child(10)').val(korisnik['Jmbg']);
        $('.prikaz :nth-child(12)').val(korisnik['BrojTelefona']);
        $('.prikaz :nth-child(14)').val(korisnik['Email']);
        $('.prikaz :nth-child(16)').css('color', 'black');
        $('.prikaz :nth-child(16)').val(korisnik['UlogaKorisnika']);

       
    });


    $('#editProfil').click(function () {
        $('.prikazStranice').children().hide();
        $('#popupKarticaPrikaz').show();

        $('#imeIzmeni').val(korisnik['Ime']);
        $('#prezimeIzmeni').val(korisnik['Prezime']);
        $('#lozinkaIzmeni').val(korisnik['Lozinka']);
        $('#jmbgIzmeni').val(korisnik['Jmbg']);
        $('#telIzmeni').val(korisnik['BrojTelefona']);
        $('#emailIzmeni').val(korisnik['Email']);
        $('#polPolje').val(korisnik['Pol']);
        $('.izmena :nth-child(26)').css('color', 'green');

       
    });

    $('#izmeniDugme').click(function () {

        /*var nameReg = /^[A-Za-z]+$/;
        var numberReg = /^\b\d{13}\b$/i;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = $('#emailIzmeni').val();
        let telefon = $('#telIzmeni').val();
        let podudaranje = true;

        if ($('#imeIzmeni').val() === "") {

            korImeGreska('Morate uneti ime');

        } else if ($('#prezimeIzmeni').val() === "") {

            korPrezGreska('Morate uneti prezime');
            korIme();

        }
        else if (!numberReg.test($('#jmbgIzmeni').val())) {

            korJmbgGreska('Morate uneti jmbg(13 cifara)');
            korPrez();

        }
        else if ($('#lozinkaIzmeni').val() === "") {
            korPasGreska('Morate uneti lozinku');
            korJmbg();

        }
        else if (isNaN(telefon) || telefon === '') {

            korTelGreska('Niste uneli broj telefona');
            korPas();

            
        }

        else if ((!emailReg.test(email)) || email === "") {


            korEmailGreska('Niste uneli email');
            korTel();

        } else if (emailReg.test(email) && !isNaN(telefon) && email !== '' && telefon !== '') {
        */
            korEmail();
        let musterija = {

            Ime: $("#imeIzmeni").val(),
            Prezime: $("#prezimeIzmeni").val(),
            Lozinka: $("#lozinkaIzmeni").val(),
            JMBG: $("#jmbgIzmeni").val(),
            KontaktTelefon: $("#telIzmeni").val(),
            Email: $("#emailIzmeni").val(),

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


        //}

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