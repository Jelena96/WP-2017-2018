﻿if (sessionStorage.getItem("logged") === null) {
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
    if (korisnik.UlogaKorisnika === "Musterija") {

        $('#sortirajVoznje').show();
        $('#kreniPretraguCM').show();
        $('#editProfil').show();
        
    }
    if (korisnik.UlogaKorisnika === "Admin") {
        $('#editProfilA').show();
        $('#vozaciDivDugme').show();
        $('#sortirajVoznjeA').show();
        $('#kreniPretraguC').show();
        
        $('#pretragaImePrez').show();
        
       
    }
    $('#vozaciDivDugme').click(function () {
        $('#vozaciDiv').show();


    });
    
   

    $('#okDugme').click(function () {
        window.location.href = "login.html";


    });

    $('#editProfilA').click(function () {
        $('#izmenaA').show();


    });
    if (korisnik.UlogaKorisnika === "Vozac") {
        $('#dugmePromenaLokacije').show();
       // $('#izmeniA').show();
        $('#izmeniV').show();
        $('#editProfil').hide();
        $('#DugmePrikazVoznjeV').show();
        $('#DugmePrikazVoznjeA').hide();
        $('#DumePrikazKreiranih').show();
        $('#prikazVoznje').hide();
        $('#sortirajVoznjeV').show();
        $('#kreniPretraguCV').show(); 
        

    }

    $('#dugmePromenaLokacije').click(function () {
        $('#promenaLokacije').show();
        $('#izmenaVozaca').hide();
        

    });

    $('#closePromena').click(function () {
        $('#promenaLokacije').hide();


    });

    $('#izmeniA').click(function () {
        $('#izmeniAutomobil').show();


    });
    $('#izmeniV').click(function () {
        $('#izmenaVozaca').show();
        $('#prikaz').hide();
        $('#promenaLokacije').hide();
        $('#izmeniAutomobil').hide();

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
        $('#DugmePrikazVoznjeA').show();
        $('#zakaziVoznjuDugme').hide();
        $('#pretragaImePrez').show();
        

    } else {
        $('#zakaziVoznjuDugmeAdmin').hide();
        $('#DugmePrikazSvihVoznji').hide();
        $('#DugmePrikazVoznjeA').hide();
        $('#DugmePrikazNeobradjenihVoznji').hide();

    }

    $('#zakaziVoznjuDugmeAdmin').click(function () {
        $('#zakaziVoznjuAdmin').show();
    });

    
    $('#dugmeFilter').click(function () {
        $('#spanFilter').show();

       
    });

    $('#sortirajVoznje').click(function () {
        $('#sortiranje').show();
        $('#sortirajDugme').show();

    });

    $('#sortirajVoznjeA').click(function () {
        $('#sortiranje').show();
        $('#sortirajDugmeA').show();

    });

    $('#sortirajVoznjeV').click(function () {
        $('#sortiranje').show();
        $('#sortirajDugmeV').show();

    });

    $('#pretragaDugme').click(function () {
        $('#pretragaDiv').show();


    });
  
    
    
       
         

    $('#izaberi').click(function () {

        if ($('#pretragaSelect option:selected').text() == "Datum") {

            $('#unosPretrage').show();

        } else if ($('#pretragaSelect option:selected').text() == "Ocena") {

            $('#unosPretrageO').show();
        }
        else if ($('#pretragaSelect option:selected').text() == "Cena") {

            $('#unosPretrageC').show();
        }

            
    });

    $('#izaberiIP').click(function () {

        if ($('#imePrezSelect option:selected').val() == "poVozacu") {

            $('#unosPretrageIPV').show();
        } else {
            $('#unosPretrageIPM').show();

        }
    });

    let korisnici = [];

    function ucitaj() {

        let musterija = {

            ime: korisnik.KorisnickoIme,
        };
        $.ajax({
            type: 'POST',
            url: '/api/Voznja/Korisnici',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            retVal = JSON.parse(data);

            for (let i = 0; i < retVal.length; i++) {
                korisnici.push(retVal[i]);
            }
        });
    }
   
    
    $('#kreniPretraguKor').click(function () {

        filterskaVrednost();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKartica').hide();
        $('#voznjeKarticaKreirane').hide();
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
            let imeP = $('#myInputIM').val();
            let prezime = $('#myInputPV').val();
            let imeV = $('#myInputIV').val();
            ucitaj();
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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == status) {
                    if (imeP != "" && imeV != "") {
                        if (retVal[i].MusterijaVoznja == imeP && retVal[i].VozacVoznja == imeV) {
                       /* for (d in korisnici) {
                            if (korisnici[d].KorisnickoIme == retVal[i].MusterijaVoznja) {
                                if (korisnici[d].Ime == imeP) {*/
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
                                        '<td>  ' + retVal[i].StatusVoznje +
                                        '</td > ' +
                                        '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                        retVal[i].Komentar.Opis +
                                        '</div ></td > ' +
                                        '<td> ' + ime + ' </td>' +
                                        '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                        '<td> ' + vremeK + ' </td>' +
                                        '</tr>';
                             /*   }
                            }*/
                        }
                    } else if (imeP == "" && imeV != "") {
                        if (retVal[i].VozacVoznja == imeV) {
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
                                '<td>  ' + retVal[i].StatusVoznje +
                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';

                        }
                    } else if (imeP != "" && imeV == "") {
                        if (retVal[i].MusterijaVoznja == imeP) {

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
                                '<td>  ' + retVal[i].StatusVoznje +
                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';

                        }

                    } else {


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
                            '<td>  ' + retVal[i].StatusVoznje +
                            '</td > ' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';

                    }
                }
                    else if (status == 8) {
                    if (imeP != "" && imeV != "") {
                        // for (d in korisnici) {

                        // if (korisnici[d].Ime == imeP) {
                        if (retVal[i].MusterijaVoznja == imeP && retVal[i].VozacVoznja == imeV) {
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
                                '<td>  ' + retVal[i].StatusVoznje +
                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';
                        }
                        // }
                        // }

                    } else if (imeP == "" && imeV != "") {
                        if (retVal[i].VozacVoznja == imeV) {
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
                                '<td>  ' + retVal[i].StatusVoznje +
                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';

                        }
                    } else if (imeP != "" && imeV == "") {
                        if (retVal[i].MusterijaVoznja == imeP) {

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
                                '<td>  ' + retVal[i].StatusVoznje +
                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';

                        }

                    } else {


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
                            '<td>  ' + retVal[i].StatusVoznje +
                            '</td > ' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';
                    }
                    }
                    }
                
            
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);

        });

    });
    //pretraga za admina
    $('#kreniPretraguC').click(function () {
        filterskaVrednost();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaKreirane').hide();
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

            let nizDatuma = [];
            for (let i = 0; i < retVal.length; i++) {
                nizDatuma.push(retVal[i].DTPorudzbine);
            }

            var min = nizDatuma[0];
            var max = nizDatuma[0];
            for (var index in nizDatuma) {
                if (nizDatuma[index] > max) max = nizDatuma[index];
                if (nizDatuma[index] < min) min = nizDatuma[index];
            }

            let nizCena = [];
            for (let i = 0; i < retVal.length; i++) {
                nizCena.push(retVal[i].Iznos);
            }

            var minI = nizCena[0];
            var maxI = nizCena[0];
            for (var index in nizCena) {
                if (nizCena[index] > maxI) maxI = nizCena[index];
                if (nizCena[index] < minI) minI = nizCena[index];
            }

            let nizOcena = [];
            for (let i = 0; i < retVal.length; i++) {
                nizOcena.push(retVal[i].Komentar.Ocena);
            }

            var minO = nizOcena[0];
            var maxO = nizOcena[0];
            for (var index in nizOcena) {
                if (nizOcena[index] > maxO) maxO = nizOcena[index];
                if (nizOcena[index] < minO) minO = nizOcena[index];
            }

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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                let datum;
                let datum2;

                datum = $('#myInput').val();
                datum2 = $('#myInput2').val();
                let ocena = $('#myInputO').val();
                let ocena2 = $('#myInputO2').val();
                let cenaU = $('#myInputC').val();
                let cena2 = $('#myInputC2').val();
                if (cenaU == "") {

                    cenaU = minI;
                }

                if (cena2 == "") {
                    cena2 = maxI;
                }

                if (datum == "") {

                    datum = min;
                }

                if (datum2 == "") {
                    datum2 = max;
                }
                if (ocena == "") {

                    ocena = minO;
                }
                if (ocena2 == "") {

                    ocena2 = maxO;
                }
                date = new Date(retVal[i].DTPorudzbine);
                date_check = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();


                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == status) {

                    if (ocena <= retVal[i].Komentar.Ocena && retVal[i].Komentar.Ocena <= ocena2 && cenaU <= retVal[i].Iznos && retVal[i].Iznos <= cena2 && datum <= retVal[i].DTPorudzbine && retVal[i].DTPorudzbine <= datum2) {
                        $('#voznjeKarticaAdmin').hide();
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
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';

                    }
                }

                else if (status == 8) {
                    $('#voznjeKarticaAdmin').hide();

                    if (ocena <= retVal[i].Komentar.Ocena && retVal[i].Komentar.Ocena <= ocena2 && cenaU <= retVal[i].Iznos && retVal[i].Iznos <= cena2 && datum <= retVal[i].DTPorudzbine && retVal[i].DTPorudzbine <= datum2) {
                            $('#voznjeKarticaAdmin').hide();
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
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';
                        }
                     
                    
                    }


                }
            

            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);

        });

    });

    $('#kreniPretraguCM').click(function () {
        filterskaVrednost();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKartica').hide();
        $('#voznjeKarticaKreirane').hide();

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

            let nizDatuma = [];
            for (let i = 0; i < retVal.length; i++) {
                nizDatuma.push(retVal[i].DTPorudzbine);
            }

            var min = nizDatuma[0];
            var max = nizDatuma[0];
            for (var index in nizDatuma) {
                if (nizDatuma[index] > max) max = nizDatuma[index];
                if (nizDatuma[index] < min) min = nizDatuma[index];
            }

            let nizCena = [];
            for (let i = 0; i < retVal.length; i++) {
                nizCena.push(retVal[i].Iznos);
            }

            var minI = nizCena[0];
            var maxI = nizCena[0];
            for (var index in nizCena) {
                if (nizCena[index] > maxI) maxI = nizCena[index];
                if (nizCena[index] < minI) minI = nizCena[index];
            }

            let nizOcena = [];
            for (let i = 0; i < retVal.length; i++) {
                nizOcena.push(retVal[i].Komentar.Ocena);
            }

            var minO = nizOcena[0];
            var maxO = nizOcena[0];
            for (var index in nizOcena) {
                if (nizOcena[index] > maxO) maxO = nizOcena[index];
                if (nizOcena[index] < minO) minO = nizOcena[index];
            }

            let tabela = '<div id="voznjeKartica"><h2>Prikaz voznji korisnika</h2><table>' +
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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                let datum;
                let datum2;

                datum = $('#myInput').val();
                datum2 = $('#myInput2').val();
                let ocena = $('#myInputO').val();
                let ocena2 = $('#myInputO2').val();
                let cenaU = $('#myInputC').val();
                let cena2 = $('#myInputC2').val();
                if (cenaU == "") {

                    cenaU = minI;
                }

                if (cena2 == "") {
                    cena2 = maxI;
                }

                if (datum == "") {

                    datum = min;
                }

                if (datum2 == "") {
                    datum2 = max;
                }
                if (ocena == "") {

                    ocena = minO;
                }
                if (ocena2 == "") {

                    ocena2 = maxO;
                }
                date = new Date(retVal[i].DTPorudzbine);
                date_check = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();


                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == status) {

                    if (ocena <= retVal[i].Komentar.Ocena && retVal[i].Komentar.Ocena <= ocena2 && cenaU <= retVal[i].Iznos && retVal[i].Iznos <= cena2 && datum <= retVal[i].DTPorudzbine && retVal[i].DTPorudzbine <= datum2) {
                        $('#voznjeKarticaAdmin').hide();
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
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';

                    }
                }

                else if (status == 8) {
                    $('#voznjeKarticaAdmin').hide();

                    if (ocena <= retVal[i].Komentar.Ocena && retVal[i].Komentar.Ocena <= ocena2 && cenaU <= retVal[i].Iznos && retVal[i].Iznos <= cena2 && datum <= retVal[i].DTPorudzbine && retVal[i].DTPorudzbine <= datum2) {
                        $('#voznjeKarticaAdmin').hide();
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
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';
                    }


                }


            }


            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);

        });

    });

    $('#kreniPretraguCV').click(function () {
        filterskaVrednost();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKartica').hide();
        $('#voznjeKarticaKreirane').hide();

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

            let nizDatuma = [];
            for (let i = 0; i < retVal.length; i++) {
                nizDatuma.push(retVal[i].DTPorudzbine);
            }

            var min = nizDatuma[0];
            var max = nizDatuma[0];
            for (var index in nizDatuma) {
                if (nizDatuma[index] > max) max = nizDatuma[index];
                if (nizDatuma[index] < min) min = nizDatuma[index];
            }

            let nizCena = [];
            for (let i = 0; i < retVal.length; i++) {
                nizCena.push(retVal[i].Iznos);
            }

            var minI = nizCena[0];
            var maxI = nizCena[0];
            for (var index in nizCena) {
                if (nizCena[index] > maxI) maxI = nizCena[index];
                if (nizCena[index] < minI) minI = nizCena[index];
            }

            let nizOcena = [];
            for (let i = 0; i < retVal.length; i++) {
                nizOcena.push(retVal[i].Komentar.Ocena);
            }

            var minO = nizOcena[0];
            var maxO = nizOcena[0];
            for (var index in nizOcena) {
                if (nizOcena[index] > maxO) maxO = nizOcena[index];
                if (nizOcena[index] < minO) minO = nizOcena[index];
            }

            let tabela = '<div id="voznjeKarticaVozac"><h2>Prikaz voznji vozaca</h2><table>' +
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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                let datum;
                let datum2;

                datum = $('#myInput').val();
                datum2 = $('#myInput2').val();
                let ocena = $('#myInputO').val();
                let ocena2 = $('#myInputO2').val();
                let cenaU = $('#myInputC').val();
                let cena2 = $('#myInputC2').val();
                if (cenaU == "") {

                    cenaU = minI;
                }

                if (cena2 == "") {
                    cena2 = maxI;
                }

                if (datum == "") {

                    datum = min;
                }

                if (datum2 == "") {
                    datum2 = max;
                }
                if (ocena == "") {

                    ocena = minO;
                }
                if (ocena2 == "") {

                    ocena2 = maxO;
                }
                date = new Date(retVal[i].DTPorudzbine);
                date_check = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();


                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == status) {

                    if (ocena <= retVal[i].Komentar.Ocena && retVal[i].Komentar.Ocena <= ocena2 && cenaU <= retVal[i].Iznos && retVal[i].Iznos <= cena2 && datum <= retVal[i].DTPorudzbine && retVal[i].DTPorudzbine <= datum2) {
                        $('#voznjeKarticaAdmin').hide();
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
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';

                    }
                }

                else if (status == 8) {
                    $('#voznjeKarticaAdmin').hide();

                    if (ocena <= retVal[i].Komentar.Ocena && retVal[i].Komentar.Ocena <= ocena2 && cenaU <= retVal[i].Iznos && retVal[i].Iznos <= cena2 && datum <= retVal[i].DTPorudzbine && retVal[i].DTPorudzbine <= datum2) {
                        $('#voznjeKarticaAdmin').hide();
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
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';
                    }


                }


            }


            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);

        });

    });
   
    $('#sortirajDugmeA').click(function () {


        filterskaVrednost();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKartica').hide();
        $('#voznjeKarticaKreirane').hide();

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
            let datumi = [];
            if ($('#filterSort option:selected').text() == "Datum") {

                
                for (let i = 0; i < retVal.length; i++) {

                    let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                    datumi.push(vreme);
                }

                let date_sort_desc = function (date1, date2) {
                    if (date1 > date2) return -1;
                    if (date1 < date2) return 1;
                    return 0;
                };

                datumi.sort(date_sort_desc);
            } else if ($('#filterSort option:selected').text() == "Ocena") {



                SortirajOceneA();

            }

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

            for (d in datumi) {

                for (let i = 0; i < retVal.length; i++) {

                    let cena = retVal[i].Iznos;
                    let tipAuta = "";
                    let stanje = "";
                    let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                    let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');
                    let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                    let ime = "-";
                    if (retVal[i].Komentar.KorisnikKomentar != null) {

                        ime = retVal[i].Komentar.KorisnikKomentar;
                    }

                    if (retVal[i].TipAutaVoznje == 1) {

                        tipAuta = "Putnicki";

                    } else {

                        tipAuta = "Kombi";
                    }

                    if (datumi[d] == vreme) {
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
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';

                    }
                }
            }
        tabela += '</table></div>';
        $("#prikazi").append(tabela);
        $('#voznjeKartica').html(tabela);

    });
    });
    
    //admin - sortiranje
    function SortirajOceneA(retVal) {
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKarticaAdmin').hide();
        $('#voznjeKarticaKreirane').hide();

        let musterija = {

            ime: korisnik.KorisnickoIme,

        };



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
        let ocene = [];
        for (let i = 0; i < retVal.length; i++) {


            ocene.push(retVal[i].Komentar.Ocena);
        }

        ocene.sort(function (a, b) {
            return b - a;
        });

        for (o in ocene) {
            for (let i = 0; i < retVal.length; i++) {
                if (ocene[o] == retVal[i].Komentar.Ocena) {
                    let cena = retVal[i].Iznos;
                    let tipAuta = "";
                    let stanje = "";
                    let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                    let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');
                    let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                    let ime = "-";
                    if (retVal[i].Komentar.KorisnikKomentar != null) {

                        ime = retVal[i].Komentar.KorisnikKomentar;
                    }

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
                            '<td> -' +
                            '</td>' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px; float:left;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';

                    } else if (retVal[i].StatusVoznje == 6) {
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
                            '<button value = ' + retVal[i].IdVoznje + ' id="komentar" style = "float: left; color: blue;" >Komentarisi</button >' +
                            '</td > ' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
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
                            '<button value = ' + retVal[i].IdVoznje + ' id="otkaziK" style = "float: right; color: blue;" >Otkazi</button >' +
                            '<button value = ' + retVal[i].IdVoznje + ' id="promeni" style = "margin-right: 5px; float: right; color: blue;" >Izmeni</button >' +
                            '</td > ' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                            retVal[i].Komentar.Opis +
                            '</div ></td > ' +
                            '<td> ' + ime + ' </td>' +
                            '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                            '<td> ' + vremeK + ' </td>' +
                            '</tr>';


                    }
                }

            }

        }


        tabela += '</table></div>';
        $("#prikazi").append(tabela);
        $('#voznjeKartica').html(tabela);
    }


    var elems;
    $('#DumePrikazKreiranih').click(function () {

        $('#voznjeKartica').hide();
        $('#voznjeKarticaAdmin').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaVozac').hide();

        

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

            

            let tabela = '<div id="voznjeKarticaKreirane" class="voznjeKartica"><h2>Prikaz voznji na cekanju</h2><table>' +
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
                '<td>Operacije</th>'+
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
                let ime="";
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];


               

                if (retVal[i].Komentar.KorisnikKomentar == null)
                    ime = "-";

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
                    '<td>' +
                    '<button value = ' + retVal[i].IdVoznje + ' id = "prihvati" style = "float: left; color: blue;">Prihvati</button>'
                    '</td>'+
                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px; float:left;">' + retVal[i].Komentar.Opis +
                    '</div></td> ' +
                    '<td>' + ime + '</td>' +
                    '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                    '<td class="vreme">' + vremeK + '</td>' +
                    '</tr>';

                
            }

            
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);
            
        });
    });

    $('#prikazi').on("click", "#prihvati", function () {

        let voznja = {

            ime: korisnik.KorisnickoIme,
            id: $(this).val(),
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/PrihvatiVoznju',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesna obrada");
            } else {

                alert("Uspesno prihvacena voznja");
                $('#prikazi').after('<p style="color: yellow; font-size: 22px;">Uspesno ste prihvatili voznju! <p>');

            }

        });
    });

    $('#DugmePrikazVoznjeV').click(function () {

        filterskaVrednost();
        
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
                let ime = "";
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                if (retVal[i].Komentar.KorisnikKomentar == null)
                    ime = "-";

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == status) {

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
                            '<td> -' +
                            '</td>' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                            '</div></td> ' +
                            '<td>' + ime + '</td>' +
                            '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                            '<td>' + vremeK + '</td>' +
                            '</tr>';



                    } else {


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
                            '<td> ' + retVal[i].StatusVoznje + '</td>' +
                            '<td>' +
                            '<button value = ' + retVal[i].IdVoznje + ' id="izmeni" style = "margin-right:10px; float: left;  color: blue;" >Izmeni</button >' +

                            '</td > ' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                            '</div></td> ' +
                            '<td>' + ime + '</td>' +
                            '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                            '<td>' + vremeK + '</td>' +
                            '</tr>';
                    }
                } else if (status == 8) {

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
                            '<td> -' +
                            '</td>' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                            '</div></td> ' +
                            '<td>' + ime + '</td>' +
                            '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                            '<td>' + vremeK + '</td>' +
                            '</tr>';



                    } else {


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
                            '<td> ' + retVal[i].StatusVoznje + '</td>' +
                            '<td>' +
                            '<button value = ' + retVal[i].IdVoznje + ' id="izmeni" style = "margin-right:10px; float: left;  color: blue;" >Izmeni</button >' +

                            '</td > ' +
                            '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                            '</div></td> ' +
                            '<td>' + ime + '</td>' +
                            '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                            '<td>' + vremeK + '</td>' +
                            '</tr>';


                    }
                }
            }
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);
        });
    });


    $('#sortirajDugmeV').click(function () {

       

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
            let datumi = [];
            if ($('#filterSort option:selected').text() == "Datum") {

                for (let i = 0; i < retVal.length; i++) {

                    let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                    datumi.push(vreme);
                }

                let date_sort_desc = function (date1, date2) {
                    if (date1 > date2) return -1;
                    if (date1 < date2) return 1;
                    return 0;
                };

                datumi.sort(date_sort_desc);
            } else if ($('#filterSort option:selected').text() == "Ocena") {



                SortirajOceneV();

            }
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
            for (d in datumi) {
                for (let i = 0; i < retVal.length; i++) {
                    
                        let cena = retVal[i].Iznos;
                        let tipAuta = "";
                        let stanje = "";
                        let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                        let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');
                        let ime = "";
                        let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                        if (retVal[i].Komentar.KorisnikKomentar == null)
                            ime = "-";

                        if (retVal[i].TipAutaVoznje == 1) {

                            tipAuta = "Putnicki";

                        } else {

                            tipAuta = "Kombi";
                        }

                    if (datumi[d] == vreme) {

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
                                '<td> -' +
                                '</td>' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                                '</div></td> ' +
                                '<td>' + ime + '</td>' +
                                '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                                '<td>' + vremeK + '</td>' +
                                '</tr>';



                        } else {


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
                                '<td> ' + retVal[i].StatusVoznje + '</td>' +
                                '<td>' +
                                '<button value = ' + retVal[i].IdVoznje + ' id="izmeni" style = "margin-right:10px; float: left;  color: blue;" >Izmeni</button >' +

                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                                '</div></td> ' +
                                '<td>' + ime + '</td>' +
                                '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                                '<td>' + vremeK + '</td>' +
                                '</tr>';
                        }
                    }
                }
                }
            
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);
        });
    });
    function SortirajOceneV() {

        $('#voznjeKarticaVozac').hide();
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
            $('#voznjeKarticaVozac').hide();
            let tabela ='<div id="voznjeKarticaVozac"><h2>Prikaz vozacevih voznji</h2><table>' +
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
            let ocene = [];
            for (let i = 0; i < retVal.length; i++) {


                ocene.push(retVal[i].Komentar.Ocena);
            }

            ocene.sort(function (a, b) {
                return b - a;
            });


          
            for (o in ocene) {
                for (let i = 0; i < retVal.length; i++) {
                    if (ocene[o] == retVal[i].Komentar.Ocena) {
                        let cena = retVal[i].Iznos;
                        let tipAuta = "";
                        let stanje = "";
                        let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                        let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');
                        let ime = "";
                        let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                        if (retVal[i].Komentar.KorisnikKomentar == null)
                            ime = "-";

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
                                '<td> -' +
                                '</td>' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                                '</div></td> ' +
                                '<td>' + ime + '</td>' +
                                '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                                '<td>' + vremeK + '</td>' +
                                '</tr>';



                        } else {


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
                                '<td> ' + retVal[i].StatusVoznje + '</td>' +
                                '<td>' +
                                '<button value = ' + retVal[i].IdVoznje + ' id="izmeni" style = "margin-right:10px; float: left;  color: blue;" >Izmeni</button >' +

                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                                '</div></td> ' +
                                '<td>' + ime + '</td>' +
                                '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                                '<td>' + vremeK + '</td>' +
                                '</tr>';
                        }
                   }
                }
                    
            }
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);
        });
    }
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
                alert("Nema slobodnih");
            } else {

              
                $('#prikazi').after('<p style="color: yellow; font-size: 22px;">Uspesno ste obradili voznju! <p>');

            }
        });
    });

    let vrednostFiltera;
    let status;

    function filterskaVrednost(){

        vrednostFiltera = $('#filter option:selected').val();

        if (vrednostFiltera == "1") {
            status = 1;
        } else if (vrednostFiltera == "2") {

            status = 2;
        } else if (vrednostFiltera == "3") {

            status = 3;
        }
        else if (vrednostFiltera == "4") {

            status = 4;
        }
        else if (vrednostFiltera == "5") {

            status = 5;
        } else if (vrednostFiltera == "6") {

            status = 6;
        }
        else if (vrednostFiltera == "7") {

            status = 7;
        } else if (vrednostFiltera == "0") {
            status = 0;
        } else {

            status = 8;
        }

    }
    $('#DugmePrikazSvihVoznji').click(function () {

        filterskaVrednost();

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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];


                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

              
                if (retVal[i].StatusVoznje == status) {
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
                        '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                        '</div></td> ' +
                        '<td>' + ime + '</td>' +
                        '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                        '<td>' + vremeK + '</td>' +
                        '</tr>';

                } else if (status == 8) {
                 

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
                        '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' + retVal[i].Komentar.Opis +
                        '</div></td> ' +
                        '<td>' + ime + '</td>' +
                        '<td>' + retVal[i].Komentar.Ocena + '</td>' +
                        '<td>' + vremeK + '</td>' +
                        '</tr>';
                }
            }
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKarticaSve').html(tabela);

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

                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

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
                    '<td>'+
                    '<button value = ' + retVal[i].IdVoznje + ' id="obradi" style = "margin-right: 10px; float: right;  color: blue;" >Obradi</button >' +

                    '</td > ' +
                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                    retVal[i].Komentar.Opis +
                    '</div ></td > ' +
                    '<td> ' + ime + ' </td>' +
                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                    '<td> ' + vremeK + ' </td>' +
                    '</tr>';
            }
            tabela += '</table></div>';
            $("#prikaziNeobradjene").append(tabela);
            $('#voznjeKartica').html(tabela);
        });
    });

    $('#DugmePrikazVoznjeA').click(function () {

        filterskaVrednost();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKartica').hide();
        $('#voznjeKarticaAdmin').hide();
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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];

                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                if (retVal[i].StatusVoznje == status) {
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
                        '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                        retVal[i].Komentar.Opis +
                        '</div ></td > ' +
                        '<td> ' + ime + ' </td>' +
                        '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                        '<td> ' + vremeK + ' </td>' +
                        '</tr>';
                }
                else if (status == 8) {

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
                        '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                        retVal[i].Komentar.Opis +
                        '</div ></td > ' +
                        '<td> ' + ime + ' </td>' +
                        '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                        '<td> ' + vremeK + ' </td>' +
                        '</tr>';

                }
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

            imee: korisnik.KorisnickoIme,
            i: id,
            izabrano: $('#stanje option:selected').text(),

        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/PromeniStanjeVozac',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        }).done(function (data) {
            if (data != null) {
                $('#vozacevaPromena').after('<p style="color: yellow; font-size: 24px;">Uspesccno ste promenili stanje voznje! <p>');
                if ($('#stanje option:selected').text() == "Neuspesna") {

                    $('#komentarNaVoznju').show();
                } else {

                    $('#unesiOdrediste').show();
                }
            } else {

                alert("Nije uspesno promenjeno stanje");
            }
        });
    });


    $('#DugmeZakaziVoznjuA').click(function () {

        $('#voznjeKartica').hide();
        $('#voznjeKarticaSve').hide();
        $('#voznjeKarticaNeo').hide();
        $('#voznjeKarticaKreirane').hide();

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

            Dolazak: lokacija,
            TipAutaVoznje: $('#tipVozila option:selected').text(),
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
                $('#zakaziVoznjuAdmin').after('<p style="color: yellow; font-size: 24px;">Uspesno ste kreirali voznju! <p>');
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

        filterskaVrednost();
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
                let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                let ime = "-";
                if (retVal[i].Komentar.KorisnikKomentar != null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje == 1) {

                    tipAuta = "Putnicki";

                } else {

                    tipAuta = "Kombi";
                }

                        if (retVal[i].StatusVoznje == status) {
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
                                    '<td> -' +
                                    '</td>' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px; float:left;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
                                    '</tr>';

                            } else if (retVal[i].StatusVoznje == 6) {
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
                                    '<button value = ' + retVal[i].IdVoznje + ' id="komentar" style = "float: left; color: blue;" >Komentarisi</button >' +
                                    '</td > ' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
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
                                    '<button value = ' + retVal[i].IdVoznje + ' id="otkaziK" style = "float: left; margin-bottom:10px; color: blue;" >Otkazi</button >' +
                                    '<button value = ' + retVal[i].IdVoznje + ' id="promeni" style = " float: left; color: blue;" >Izmeni</button >' +
                                    '</td > ' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
                                    '</tr>';
                            }
                        } else if (status == 8) {

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
                                    '<td> -' +
                                    '</td>' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px; float:left;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
                                    '</tr>';

                            } else if (retVal[i].StatusVoznje == 6) {
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
                                    '<button value = ' + retVal[i].IdVoznje + ' id="komentar" style = "float: left; color: blue;" >Komentarisi</button >' +
                                    '</td > ' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
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
                                    '<button value = ' + retVal[i].IdVoznje + ' id="otkaziK" style = " margin-bottom:10px; float: left; color: blue;" >Otkazi</button >' +
                                    '<button value = ' + retVal[i].IdVoznje + ' id="promeni" style = "float: left; color: blue;" >Izmeni</button >' +
                                    '</td > ' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
                                    '</tr>';


                            }
                        }
                    }
                
            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);
        });
    });

    //sortiranje ocena
    function SortirajOcene() {
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
        let ocene = [];
        for (let i = 0; i < retVal.length; i++) {


            ocene.push(retVal[i].Komentar.Ocena);
        }

        ocene.sort(function (a, b) {
            return b - a;
        });

        for (o in ocene) {
            for (let i = 0; i < retVal.length; i++) {
                if (ocene[o] == retVal[i].Komentar.Ocena) {
                    let cena = retVal[i].Iznos;
                    let tipAuta = "";
                    let stanje = "";
                    let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                    let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');
                    let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                    let ime = "-";
                    if (retVal[i].Komentar.KorisnikKomentar != null) {

                        ime = retVal[i].Komentar.KorisnikKomentar;
                    }

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
                                '<td> -' +
                                '</td>' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px; float:left;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';

                        } else if (retVal[i].StatusVoznje == 6) {
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
                                '<button value = ' + retVal[i].IdVoznje + ' id="komentar" style = "float: left; color: blue;" >Komentarisi</button >' +
                                '</td > ' +
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
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
                                '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                retVal[i].Komentar.Opis +
                                '</div ></td > ' +
                                '<td> ' + ime + ' </td>' +
                                '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                '<td> ' + vremeK + ' </td>' +
                                '</tr>';


                        }
                    }

                }

            }

        
        tabela += '</table></div>';
        $("#prikazi").append(tabela);
        $('#voznjeKartica').html(tabela);
    });
}

    $('#sortirajDugme').click(function () {
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
            let datumi = [];
            let ocene = [];
            if ($('#filterSort option:selected').text() == "Datum") {

                for (let i = 0; i < retVal.length; i++) {

                    let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                    datumi.push(vreme);
                }

                let date_sort_desc = function (date1, date2) {
                    if (date1 > date2) return -1;
                    if (date1 < date2) return 1;
                    return 0;
                };

                datumi.sort(date_sort_desc);
            } else if ($('#filterSort option:selected').text() == "Ocena") {



                SortirajOcene();

            }

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

           
           
           
            for (d in datumi) {
                
                    for (let i = 0; i < retVal.length; i++) {



                        let cena = retVal[i].Iznos;
                        let tipAuta = "";
                        let stanje = "";
                        let vreme = retVal[i].DTPorudzbine.replace('T', ' ').split('.')[0];
                        let ulica = retVal[i].Odrediste.Adresa.UlicaIBroj.replace(/\*/g, ' ');
                        let vremeK = retVal[i].Komentar.VremeObjave.replace('T', ' ').split('.')[0];
                        let ime = "-";
                        if (retVal[i].Komentar.KorisnikKomentar != null) {

                            ime = retVal[i].Komentar.KorisnikKomentar;
                        }

                        if (retVal[i].TipAutaVoznje == 1) {

                            tipAuta = "Putnicki";

                        } else {

                            tipAuta = "Kombi";
                        }

                        if (datumi[d] == vreme) {
                            

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
                                    '<td> -' +
                                    '</td>' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px; float:left;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
                                    '</tr>';

                            } else if (retVal[i].StatusVoznje == 6) {
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
                                    '<button value = ' + retVal[i].IdVoznje + ' id="komentar" style = "float: left; color: blue;" >Komentarisi</button >' +
                                    '</td > ' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
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
                                    '<button value = ' + retVal[i].IdVoznje + ' id="otkaziK" style = "float: right; color: blue;" >Otkazi</button >' +
                                    '<button value = ' + retVal[i].IdVoznje + ' id="promeni" style = "margin-right: 5px; float: right; color: blue;" >Izmeni</button >' +
                                    '</td > ' +
                                    '<td><div style="word-wrap:break-word; width: 70px; height: 80px;">' +
                                    retVal[i].Komentar.Opis +
                                    '</div ></td > ' +
                                    '<td> ' + ime + ' </td>' +
                                    '<td> ' + retVal[i].Komentar.Ocena + ' </td>' +
                                    '<td> ' + vremeK + ' </td>' +
                                    '</tr>';


                            }
                            }
                        }
                    }
                
            

            tabela += '</table></div>';
            $("#prikazi").append(tabela);
            $('#voznjeKartica').html(tabela);

            });
    });


    let komPam;
    $('#prikazi').on("click", "#komentar", function () {

        id = $(this).val();
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

    $('#prikazi').on("click", "#otkaziK", function () {

        id = $(this).val();

        let voznja = {

            ime: korisnik.KorisnickoIme,
            i: $(this).val(),
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja/OtkaziVoznjuK',
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

    let pamti;
    $('#prikazi').on("click", "#promeni", function () {
        pamti = $(this).val();
        alert(pamti);
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

    let ocenaG = function (poruka) {
        $('#ocena').css('border-color', 'red');
        $('#komentarDiv :nth-child(4)').css('color', 'red');
        $('#ocenaG').text(`\xA0${poruka}`);
    };

    let ocenaOk = function (poruka) {

        $('#ocena').css('border-color', 'white');
        $('#komentarDiv :nth-child(4)').css('color', 'white');
        $('#ocenaG').text('');
    };

    $('#DugmeKomentarNaVoznju').click(function ()
    {
        let correct = true; 
        if ($('#ocena').val() < 1 || $('#ocena').val() > 5) {
            ocenaG('Unesi ocenu od 1 do 5');
            correct = false;

        } else {


            ocenaOk();


            let komentar = {

                Opis: $("#opis").val(),
                VremeObjave: Date.now,
                KorisnikKomentar: korisnik.KorisnickoIme,
                IdVoznje: id,
                Ocena: $("#ocena").val(),

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

        }

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
        let telV = $('#telVozaca').val();
        let emailV = $('#emailVozac').val();
        let polV = $('#polPolje option:selected').text();

        let vozac = {
            Ime: $('#ImeVozac').val(),
            KorisnickoIme: imeV,
            Prezime: prezimeV,
            Lozinka: lozinkaV,
            Jmbg: jmbgV,
            BrojTelefona: telV,
            Email: emailV,
            PolKorisnika: $('#polPolje option:selected').text(),
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
        $('#polPoljeV').val(korisnik['PolKorisnika']);
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

        $('#prikaz').hide();

        let vozac = {
            Ime: $('#imeIzmeniV').val(),
            KorisnickoIme: korisnik.KorisnickoIme,
            Prezime: $('#prezimeIzmeniV').val(),
            Lozinka: $('#lozinkaIzmeniV').val(),
            Jmbg: $('#jmbgIzmeniV').val(),
            BrojTelefona: $('#telIzmeniV').val(),
            Email: $('#emailIzmeniV').val(),
            PolKorisnika: $('#polPoljeV option:selected').text(),
        };

        $.ajax({
            type: 'POST',
            url: '/api/Vozac/IzmeniProfil',
            data: JSON.stringify(vozac),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesno izmena");
            } else {
                alert("Uspesna izmena");
                $('#izmenaVozaca').after('<p style="color: yellow; font-size: 22px;">Uspesno ste izmenli vozaca! <p>');
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
                //alert("Uspesna izmena");
                $('#promenaLokacije').after('<p style="color: yellow; font-size: 22px;">Uspesno ste promenili lokaciju! <p>');
               
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

       
        $('.prikaz :nth-child(2)').val(korisnik['Ime']);
        $('.prikaz :nth-child(4)').val(korisnik['Prezime']);
        $('.prikaz :nth-child(6)').val(korisnik['Lozinka']);
        $('.prikaz :nth-child(8)').val(korisnik['Jmbg']);
        $('.prikaz :nth-child(10)').val(korisnik['BrojTelefona']);
        $('.prikaz :nth-child(12)').val(korisnik['Email']);
        $('.prikaz :nth-child(14)').val(korisnik['PolKorisnika']);
        $('.prikaz :nth-child(16)').css('color', 'white');
        $('.prikaz :nth-child(16)').val(korisnik['UlogaKorisnika']);

       
    });


    $('#editProfil').click(function () {
        
        

        $('#imeIzmeni').val(korisnik['Ime']);
        $('#prezimeIzmeni').val(korisnik['Prezime']);
        $('#lozinkaIzmeni').val(korisnik['Lozinka']);
        $('#jmbgIzmeni').val(korisnik['Jmbg']);
        $('#telIzmeni').val(korisnik['BrojTelefona']);
        $('#emailIzmeni').val(korisnik['Email']);
        $('#polPolje').val(korisnik['PolKorisnika']);
      

       
    });

    $('#editProfilA').click(function () {



        $('#imeIzmeniA').val(korisnik['Ime']);
        $('#prezimeIzmeniA').val(korisnik['Prezime']);
        $('#lozinkaIzmeniA').val(korisnik['Lozinka']);
        $('#jmbgIzmeniA').val(korisnik['Jmbg']);
        $('#telIzmeniA').val(korisnik['BrojTelefona']);
        $('#emailIzmeniA').val(korisnik['Email']);
        $('#polPoljeA').val(korisnik['PolKorisnika']);



    });
    $('#izmeniDugme').click(function () {

       
            
        let musterija = {

            KorisnickoIme: korisnik.KorisnickoIme,
            Ime: $("#imeIzmeni").val(),
            Prezime: $("#prezimeIzmeni").val(),
            Lozinka: $("#lozinkaIzmeni").val(),
            Jmbg: $("#jmbgIzmeni").val(),
            BrojTelefona: $("#telIzmeni").val(),
            Email: $("#emailIzmeni").val(),
            PolKorisnika: $('#polPolje option:selected').text(),

            
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
                    
                    $('.izmena').after('<p style="color: yellow; font-size: 22px;">Uspesno ste izmenili nalog! <p>');
                    sessionStorage.setItem('logged', data);
                    korisnik = data;
                }
            });


        //}

    });

    $('#izmeniDugmeA').click(function () {



        let musterija = {

            KorisnickoIme: korisnik.KorisnickoIme,
            Ime: $("#imeIzmeniA").val(),
            Prezime: $("#prezimeIzmeniA").val(),
            Lozinka: $("#lozinkaIzmeniA").val(),
            Jmbg: $("#jmbgIzmeniA").val(),
            BrojTelefona: $("#telIzmeniA").val(),
            Email: $("#emailIzmeniA").val(),
            PolKorisnika: $('#polPoljeVA option:selected').text(),


        };

        $.ajax({
            type: 'POST',
            url: '/api/Registration/IzmeniProfilA',
            data: JSON.stringify(musterija),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (data) {
            if (data === null) {
                alert("Neuspesna izmena");
            } else {
                $('.izmena').css('display', 'none');

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