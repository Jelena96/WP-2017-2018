$('#sortirajDugmeA').click(function () {

  
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

        let datumi = [];
        let ocene = [];
        if ($('#filterSort option:selected').text() === "Datum") {

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
        } else if ($('#filterSort option:selected').text() === "Ocena") {



            SortirajOceneA(retVal);

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
                if (retVal[i].Komentar.KorisnikKomentar !== null) {

                    ime = retVal[i].Komentar.KorisnikKomentar;
                }

                if (retVal[i].TipAutaVoznje === 1) {

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

$(document).ready(function () {



});
