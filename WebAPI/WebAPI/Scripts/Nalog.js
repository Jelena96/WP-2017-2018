if (sessionStorage.getItem("logged") === null) {
    window.location.href = "login.html";
} else {
    var korisnikJson = sessionStorage.getItem("logged");
    var korisnik = $.parseJSON(korisnikJson);
}

var zapamtiId;
var zapamtiId2;

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
        $('#DugmePrikazVoznjeV').show();
        $('#DugmePrikazVoznjeA').hide();
        $('#DumePrikazKreiranih').show();
        



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

    if (korisnik.UlogaKorisnika == "Admin") {
        $('#zakaziVoznjuDugmeAdmin').show();
        $('#DugmePrikazSvihVoznji').show();
        $('#prikazVoznje').hide();
        $('#DugmePrikazNeobradjenihVoznji').show();

        $('#zakaziVoznjuDugme').hide();

    } else {
        $('#zakaziVoznjuDugmeAdmin').hide();
        $('#DugmePrikazSvihVoznji').hide();
        $('#DugmePrikazVoznjeA').hide();
        $('#DugmePrikazNeobradjenihVoznji').hide();

    }

    $('#zakaziVoznjuDugmeAdmin').click(function () {
        $('#zakaziVoznjuAdmin').show();
    });


    
    $('#DumePrikazKreiranih').click(function () {

        $('#voznjeKartica').hide();
        $('#voznjeKarticaAdmin').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKarticaSve').hide();

        let musterija = {

            ime: korisnik.KorisnickoIme,

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/UcitajKreirane',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            let tabela = '<div id="voznjeKarticaSve"><h2>Prikaz voznji na cekanju</h2><table>' +
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
                let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                tabela += '</tr>' +
                    '<tr>' +
                    '<td>' + vreme + '</td>' +
                    '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                    '<td>' + ulica + '</td>' +
                    '<td>' + tipAuta + '</td>' +
                    '<td> - </td>' +
                    '<td> ' + retVal[i].DispecerVoznja + ' </td>' +
                    '<td> - </td>' +
                    '<td>' + cena + '</td>' +
                    '<td> ' + retVal[i].StatusVoznje +

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

    $('#DugmePrikazVoznjeV').click(function () {

        $('#voznjeKartica').hide();
        $('#voznjeKarticaAdmin').hide();
        $('#voznjeKarticaNeo').hide();

        let musterija = {

            ime: korisnik.KorisnickoIme,

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/UcitajVozac',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            let tabela = '<div id="voznjeKarticaVozac"><h2>Prikaz vozacevih voznji</h2><table>' +
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
                '<th>Operacije</th>' +
                '<th>Komentar</th>' +
                '<th>Korisnik</th>' +
                '<th id="ocenaMusterija" style="cursor: pointer;">Ocena</th>' +
                '<th>Datum</th>';
            for (let i = 0; i < retVal.length; i++) {

                let cena = retVal[i].Iznos;
                let tipAuta = "";
                let stanje = "";
                let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == 6 || retVal[i].StatusVoznje == 5) {

                    tabela += '</tr>' +
                        '<tr>' +
                        '<td>' + vreme + '</td>' +
                        '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                        '<td>' + ulica + '</td>' +
                        '<td>' + tipAuta + '</td>' +
                        '<td> - </td>' +
                        '<td> ' + retVal[i].DispecerVoznja + ' </td>' +
                        '<td> ' + retVal[i].VozacVoznja + ' </td>' +
                        '<td> - </td>' +
                        '<td> ' + retVal[i].StatusVoznje +

                        '</td > ' +
                        '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                        '<td> - </td>' +
                        '<td> 0 </td>' +
                        '<td> - </td>' +
                        '</tr>';



                } else{


                    tabela += '</tr>' +
                        '<tr>' +
                        '<td>' + vreme + '</td>' +
                        '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                        '<td>' + ulica + '</td>' +
                        '<td>' + tipAuta + '</td>' +
                        '<td> - </td>' +
                        '<td> ' + retVal[i].DispecerVoznja + ' </td>' +
                        '<td> ' + retVal[i].VozacVoznja + ' </td>' +
                        '<td>' + cena + '</td>' +
                        '<td> ' + retVal[i].StatusVoznje + '</td>'+
                        '<td>'+
                        '<button value = ' + retVal[i].IdVoznje + ' id="izmeni" style = "margin-right:10px; float: left;  color: blue;" >Izmeni</button >' +

                        '</td > ' +
                        '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                        '<td> - </td>' +
                        '<td> 0 </td>' +
                        '<td> - </td>' +
                        '</tr>';


                }




            }
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);



        });


    });

    var id;
    $('#prikazi').on("click", "#izmeni", function () {

        $('#voznjeKarticaVozac').hide();
        $('#vozacevaPromena').show();
        zapamtiId2 = $(this).val();
        id = $(this).val();
       

    });

  
  


    $('#prikaziNeobradjene').on("click", "#obradi", function () {


        let voznja = {

            ime: korisnik.KorisnickoIme,
            id: $(this).val(),
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/ObradiVoznju',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesna obrada");
            } else {

                $('#prikaziNeobradjene').after('<p style="color: yellow; font-size: 22px;">Uspesno ste obradili voznju! <p>');

            }
        });


    });

    $('#DugmePrikazSvihVoznji').click(function () {

        $('#voznjeKartica').hide();
        $('#voznjeKarticaAdmin').hide();
        $('#voznjeKarticaNeo').hide();

        let musterija = {

            ime: korisnik.KorisnickoIme,

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/UcitajSve',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            let tabela = '<div id="voznjeKarticaSve"><h2>Prikaz svih voznji</h2><table>' +
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
                let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                tabela += '</tr>' +
                    '<tr>' +
                    '<td>' + vreme + '</td>' +
                    '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                    '<td>' + ulica + '</td>' +
                    '<td>' + tipAuta + '</td>' +
                    '<td> - </td>' +
                    '<td> ' + retVal[i].DispecerVoznja + ' </td>' +
                    '<td> - </td>' +
                    '<td>' + cena + '</td>' +
                    '<td> ' + retVal[i].StatusVoznje +

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


    $('#DugmePrikazNeobradjenihVoznji').click(function () {

        $('#voznjeKarticaSve').hide();
        $('#voznjeKartica').hide();
        $('#voznjeKarticaAdmin').hide();
        let musterija = {

            ime: korisnik.KorisnickoIme,

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/UcitajNeobradjene',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            let tabela = '<div id="voznjeKarticaNeo"><h2>Prikaz neobradjenih voznji</h2><table>' +
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
                let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                tabela += '</tr>' +
                    '<tr>' +
                    '<td>' + vreme + '</td>' +
                    '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                    '<td>' + ulica + '</td>' +
                    '<td>' + tipAuta + '</td>' +
                    '<td> - </td>' +
                    '<td> ' + retVal[i].DispecerVoznja + ' </td>' +
                    '<td> - </td>' +
                    '<td>' + cena + '</td>' +
                    '<td> ' + retVal[i].StatusVoznje +

                    '<button value = ' + retVal[i].IdVoznje + ' id="obradi" style = "margin-right: 10px; float: right;  color: blue;" >Obradi</button >' +

                    '</td > ' +
                    '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                    '<td> - </td>' +
                    '<td> 0 </td>' +
                    '<td> - </td>' +
                    '</tr>';







            }
            tabela += '</table></div>';
            $("#prikaziNeobradjene").append(tabela);
            $('#voznjeKartica').html(tabela);



        });



    });
    $('#DugmePrikazVoznjeA').click(function () {

        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKartica').hide();

        let musterija = {

            ime: korisnik.KorisnickoIme,

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/UcitajAdmin',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            let tabela = '<div id="voznjeKarticaAdmin"><h2>Prikaz voznji dispecera</h2><table>' +
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
                let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }


                tabela += '</tr>' +
                    '<tr>' +
                    '<td>' + vreme + '</td>' +
                    '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                    '<td>' + ulica + '</td>' +
                    '<td>' + tipAuta + '</td>' +
                    '<td> - </td>' +
                    '<td> ' + retVal[i].DispecerVoznja + ' </td>' +
                    '<td> - </td>' +
                    '<td>' + cena + '</td>' +
                    '<td>  ' + retVal[i].StatusVoznje +
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

    


    
    $('#unesiOdredisteDugme').click(function () {

        let ulicaU = $('#ulicaU').val();
        let brojU = $('#brojU').val();
        let mestoU = $('#mestoU').val();
        let pozivniBrojU = $('#pozivniBrojU').val();
        let xU = $('#xU').val();
        let yU = $('#yU').val();
        let pare = $("#iznosU").val();

        let adresa = {

            UlicaIBroj: `${ulicaU}*${brojU}`,
            NaseljenoMesto: mestoU,
            PozivniBroj: pozivniBrojU,

        };

        let lokacija = {

            Adresa: adresa,
            X: xU,
            Y: yU,

        };



        let voznja = {

            ulica: `${ulicaU}*${brojU}`,
            mesto: mestoU,
            broj: pozivniBrojU,
            x: xU,
            iznos:pare,
            y: yU,
            IdVoznje: id,
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/UnesiOdredisteVozac',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function () {
                $('#unesiOdrediste').after('<p style="color: yellow; font-size: 24px;">Uspesno ste uneli odrediste voznje! <p>');

            },
            error: function (data) {
                alert('Nije promenjena voznja!');
            }
        });
    });

    $('#vozacevaPromenaDugme').click(function () {

        
        let voznja = {

            i: id,
            izabrano: $('#stanje option:selected').text(),

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/PromeniStanjeVozac',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function () {
                $('#vozacevaPromena').after('<p style="color: yellow; font-size: 24px;">Uspesno ste promenili stanje voznje! <p>');
                if ($('#stanje option:selected').text() == "Neuspesna") {

                    $('#komentarNaVoznju').show();
                } else {

                        $('#unesiOdrediste').show();

                    
                }
            },
            error: function (data) {
                alert('Nije promenjena voznja!');
            }
        });

    });


    $('#DugmeZakaziVoznjuA').click(function () {

        let ulicao = $('#ulicaZakaziA').val();
        let broj = $('#brojZakaziA').val();
        let mesto = $('#mestoZakaziA').val();
        let pozivniBroj = $('#pozivniBrojMestaZakaziA').val();
        let x = $('#xZakaziA').val();
        let y = $('#yZakaziA').val();

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
            MusterijaVoznja: null,
            DispecerVoznja: korisnik.KorisnickoIme
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/ZakaziVoznjuAdmin',
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

    $('#prikazVoznje').click(function () {
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKarticaAdmin').hide();
       

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

            let tabela = '<div id="voznjeKartica"><h2>Prikaz korisnikovih voznji</h2><table id="tabelaPrikaz">' +
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
                '<th>Operacije</th>' +
                '<th>Komentar</th>' +
                '<th>Korisnik</th>' +
                '<th id="ocenaMusterija" style="cursor: pointer;">Ocena</th>' +
                '<th>Datum</th>';
            for (let i = 0; i < retVal.length; i++) {

                let cena = retVal[i].Iznos;
                let tipAuta = "";
                let stanje = "";
                let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == 5) {

                    tabela += '</tr>' +
                        '<tr>' +
                        '<td>' + vreme + '</td>' +
                        '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                        '<td>' + ulica + '</td>' +
                        '<td>' + tipAuta + '</td>' +
                        '<td> - </td>' +
                        '<td> - </td>' +
                        '<td> - </td>' +
                        '<td>' + cena + '</td>' +
                        '<td>' + retVal[i].StatusVoznje + '</td>' +
                        '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                        '<td> - </td>' +
                        '<td> 0 </td>' +
                        '<td> - </td>' +
                        '</tr>';

                } else if (retVal[i].StatusVoznje == 6)
                {
                    tabela += '</tr>' +
                        '<tr>' +
                        '<td>' + vreme + '</td>' +
                        '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                        '<td>' + ulica + '</td>' +
                        '<td>' + tipAuta + '</td>' +
                        '<td> - </td>' +
                        '<td> - </td>' +
                        '<td> - </td>' +
                        '<td>' + cena + '</td>' +
                        '<td>' + retVal[i].StatusVoznje + '</td>' +
                        '<td>' +
                        '<button value = ' + retVal[i].IdVoznje + ' id="komentar" style = "float: right; color: blue;" >Komentarisi</button >' +
                         '</td > ' +
                        '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                        '<td> - </td>' +
                        '<td> 0 </td>' +
                        '<td> - </td>' +
                        '</tr>';


                }
                else {

                    tabela += '</tr>' +
                        '<tr>' +
                        '<td>' + vreme + '</td>' +
                        '<td>' + retVal[i].MusterijaVoznja + '</td>' +
                        '<td>' + ulica + '</td>' +
                        '<td>' + tipAuta + '</td>' +
                        '<td> - </td>' +
                        '<td> - </td>' +
                        '<td> - </td>' +
                        '<td>' + cena + '</td>' +
                        '<td>' + retVal[i].StatusVoznje + '</td>' +
                        '<td>' +
                        '<button value = ' + retVal[i].IdVoznje + ' id="otkazi" style = "float: right; color: blue;" >Otkazi</button >' +
                        '<button value = ' + retVal[i].IdVoznje + ' id="promeni" style = "margin-right: 5px; float: right; color: blue;" >Izmeni</button >' +
                        '</td > ' +

                           '<td><div style="word-wrap:break-word; width: 150px; height: 80px;"> - </div></td>' +
                        '<td> - </td>' +
                        '<td> 0 </td>' +
                        '<td> - </td>' +
                        '</tr>';


                }
            }
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);



        });



    });

    var komPam;
    $('#prikazi').on("click", "#komentar", function () {

        komPam = $(this).val();
        $('#komentarNaVoznju').show();
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
    var pamti;
    $('#prikazi').on("click", "#promeni", function () {
        pamti = $(this).val();
        
        $('#promenaVoznje').show();
        
    });

    var prom;
  



    $("#DugmePromeniVoznju").click(function () {
       
        
        let ulicao = $('#ulicaZakaziP').val();
        let broj = $('#brojZakaziP').val();
        let mesto = $('#mestoZakaziP').val();
        let pozivniBroj = $('#pozivniBrojMestaZakaziP').val();
        let x = $('#xZakaziP').val();
        let y = $('#yZakaziP').val();
        let tip = $('#tipVozilaP option:selected').text();

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

            IdVoznje: pamti,
            Odrediste: lokacija,
            TipAutaVoznje: tip,
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
            IdVoznje: komPam,
            Ocena:$("#ocena").val(),
            
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/KomentarisiVoznju',
            data: JSON.stringify(komentar),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function () {
                $('#komentarNaVoznju').after('<p style="color: yellow; font-size: 24px;">Uspesno ste komentarisali voznju! <p>');
                
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