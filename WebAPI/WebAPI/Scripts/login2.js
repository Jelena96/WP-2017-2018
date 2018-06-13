$(document).ready(function () {


    let korImeZacrveni = function (poruka) {
        $('#korImeL').css('border-color', 'red');
        $('#prijavaDIV :nth-child(1)').css('color', 'red');
        $('#imeEL').text(`\xA0${poruka}`);
    };

    let korIme = function (poruka) {

        $('#korImeL').css('border-color', 'white');
        $('#prijavaDIV :nth-child(1)').css('color', 'white');
        $('#imeEL').text('');
    };

    let korPasZacrveni = function (poruka) {
        $('#korPasL').css('border-color', 'red');
        $('#prijavaDIV :nth-child(3)').css('color', 'red');
        $('#pasEL').text(`\xA0${poruka}`);
    };

    let korPas = function (poruka) {

        $('#korPasL').css('border-color', 'white');
        $('#prijavaDIV :nth-child(3)').css('color', 'white');
        $('#pasEL').text('');
    };

    $('#btnLog').click(function () {


        if ($('#korImeL').val() === "") {

            korImeZacrveni('Morate uneti ime');

        } else if ($('#korPasL').val() === "") {

            korPasZacrveni('Morate uneti lozinku');
            korIme();

        }
        else {

            korPas();
        }

       

    });




/*var musterija = new Object();
musterija.Name = $('#korImeL').val();
musterija.Pas = $('#korPasL').val();

if (musterija != null) {
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: JSON.stringify(musterija),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                alert("Name : " + response.Name);
            } else {
                alert("Something went wrong");
            }
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}*/
});
