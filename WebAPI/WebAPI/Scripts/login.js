﻿
$(document).ready(function () {


    let korImeZacrveni = function (poruka) {
        $('#korIme').css('border-color', 'red');
        $('#registracijaDIV :nth-child(1)').css('color', 'red');
        $('#imeE').text(`\xA0${poruka}`);
    };

    let korIme = function (poruka) {

        $('#korIme').css('border-color', 'white');
        $('#registracijaDIV :nth-child(1)').css('color', 'white');
        $('#imeE').text('');
    };

    let korPrezZacrveni = function (poruka) {
        $('#korPrez').css('border-color', 'red');
        $('#registracijaDIV :nth-child(2)').css('color', 'red');
        $('#prezE').text(`\xA0${poruka}`);
    };

    let korPrez = function (poruka) {

        $('#korPrez').css('border-color', 'white');
        $('#registracijaDIV :nth-child(2)').css('color', 'white');
        $('#prezE').text('');
    };

    let korPasZacrveni = function (poruka) {
        $('#korPas').css('border-color', 'red');
        $('#registracijaDIV :nth-child(3)').css('color', 'red');
        $('#pasE').text(`\xA0${poruka}`);
    };

    let korPas = function (poruka) {

        $('#korPas').css('border-color', 'white');
        $('#registracijaDIV :nth-child(3)').css('color', 'white');
        $('#pasE').text('');
    };

    let korJmbgZacrveni = function (poruka) {
        $('#korJmbg').css('border-color', 'red');
        $('#registracijaDIV :nth-child(3)').css('color', 'red');
        $('#jmbgE').text(`\xA0${poruka}`);
    };

    let korJmbg = function (poruka) {

        $('#korJmbg').css('border-color', 'white');
        $('#registracijaDIV :nth-child(3)').css('color', 'white');
        $('#jmbgE').text('');
    };

    $('#btnReg').click(function () {

        if ($('#korIme').val() == "") {

            korImeZacrveni('Morate uneti ime');

        } else if ($('#korPrez').val() == "") {

            korPrezZacrveni('Morate uneti prezime');
            korIme();

        }
        else if ($('#korJmbg').val() == "") {

            korJmbgZacrveni('Morate uneti jmbg');
            korPrez();

        }
        else if ($('#korPas').val() == "") {
            korPasZacrveni('Morate uneti lozinku');
            korJmbg();

        }
        else if (isNaN($('#korTel').val())) {

            korTelZacrveni('Niste uneli broj telefona');
            korPas();
            var telefon = $('#korTel').val();
        }

        else if (($('#korEmail').val() == '')) {

            korEmailZacrveni('Niste uneli email');
            korTel();

        }
        else if ($('#korEmail').val() != '') {



            let userinput = $('#korEmail').val();
            let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/;

            if (!pattern.test(userinput)) {

                korEmailZacrveni('Morate uneti validan email');


            } else {

                korEmail();
            }


        }
        else if (pattern.test(userinput) && !isNaN(telefon)) {

            if ($('#korPas').val() != $('#korPasP').val()) {

                korPasPZacrveni('Lozinke se ne podudaraju');

            } else {

                korPasP();






                let musterija = {
                    Ime: `${$('#korImeL').val()}`,
                    Lozinka: `${$('#korPasL').val()}`
                };



                korEmail();
                if (musterija != null) {
                    $.ajax({
                        type: "POST",
                        url: "/api/registration",
                        data: JSON.stringify(musterija),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                    }).done(function (data) {
                        if (data != null) {

                            alert("Uspesno");
                        } else {

                        }




                    });
                }
            }
        }



    });


    let korImeZacrveni2 = function (poruka) {
        $('#korImeL').css('border-color', 'red');
        $('#prijavaDIV :nth-child(1)').css('color', 'red');
        $('#imeEL').text(`\xA0${poruka}`);
    };

    let korIme2 = function (poruka) {

        $('#korImeL').css('border-color', 'white');
        $('#prijavaDIV :nth-child(1)').css('color', 'white');
        $('#imeEL').text('');
    };

    let korPasZacrveni2 = function (poruka) {
        $('#korPasL').css('border-color', 'red');
        $('#prijavaDIV :nth-child(3)').css('color', 'red');
        $('#pasEL').text(`\xA0${poruka}`);
    };

    let korPas2 = function (poruka) {

        $('#korPasL').css('border-color', 'white');
        $('#prijavaDIV :nth-child(3)').css('color', 'white');
        $('#pasEL').text('');
    };

    $('#btnLog').click(function () {


        if ($('#korImeL').val() == "") {

            korImeZacrveni2('Morate uneti ime');

        } else if ($('#korPasL').val() == "") {

            korPasZacrveni2('Morate uneti lozinku');
            korIme2();

        }
        else if ($('#korImeL').val() != "" && $('#korPasL').val() != "") {
            korEmail();
            korPas2();

            let korisnik = {
                Ime: $('#korImeL').val(),

                Lozinka: $('#korPasL').val(),


            };




            if (korisnik != null) {
                $.ajax({
                    type: "POST",
                    url: "/api/Login/Login",
                    data: JSON.stringify(korisnik),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        sessionStorage.setItem("logged", JSON.stringify(response));
                        window.location.href = "Nalog.html";
                        alert("USpesno");
                        $('#target').html(response.msg);
                        if (response == null) {
                            alert("Error - Nije registrovan " + msg.responseText);
                            window.location.href = "Login.html";
                        }


                    },
                    error: function (msg) {
                        alert("Error - Nije registrovan " + msg.responseText);

                    }




                });
            }


        }



    });

    let korPasPZacrveni = function (poruka) {
        $('#korPasP').css('border-color', 'red');
        $('#registracijaDIV :nth-child(1)').css('color', 'red');
        $('#pasPE').text(`\xA0${poruka}`);
    };

    let korPasP = function (poruka) {

        $('#korPasP').css('border-color', 'white');
        $('#registracijaDIV :nth-child(1)').css('color', 'white');
        $('#pasPE').text('');
    };



    let korEmailZacrveni = function (poruka) {
        $('#korEmail').css('border-color', 'red');
        $('#registracijaDIV :nth-child(1)').css('color', 'red');
        $('#emailE').text(`\xA0${poruka}`);
    };

    let korEmail = function (poruka) {

        $('#korEmail').css('border-color', 'white');
        $('#registracijaDIV :nth-child(1)').css('color', 'white');
        $('#emailE').text('');
    };

    function validateEmail(sEmail) {
        var filter = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            korEmailZacrveni('Nije u dobrom formatu');
        }
    }

    function validateNumber(sEmail) {
        var filter = /^[0-9]{0,10}$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    }


    let korTelZacrveni = function (poruka) {
        $('#korTel').css('border-color', 'red');
        $('#registracijaDIV :nth-child(1)').css('color', 'red');
        $('#telE').text(`\xA0${poruka}`);
    };

    let korTel = function (poruka) {

        $('#korTel').css('border-color', 'white');
        $('#registracijaDIV :nth-child(1)').css('color', 'white');
        $('#telE').text('');
    };



});

