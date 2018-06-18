
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
        
        var nameReg = /^[A-Za-z]+$/;
        var numberReg = /^\b\d{13}\b$/i;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = $('#korEmail').val();
        let telefon = $('#korTel').val();
        let podudaranje = true;

        if ($('#korIme').val() == "") {

            korImeZacrveni('Morate uneti ime');

        } else if ($('#korPrez').val() == "") {

            korPrezZacrveni('Morate uneti prezime');
            korIme();

        }
        else if (!numberReg.test($('#korJmbg').val())) {

            korJmbgZacrveni('Morate uneti jmbg(13 cifara)');
            korPrez();

        }
        else if ($('#korPas').val() == "") {
            korPasZacrveni('Morate uneti lozinku');
            korJmbg();

        }
        else if (isNaN($('#korTel').val()) || $('#korTel').val()=='') {

            korTelZacrveni('Niste uneli broj telefona');
            korPas();

            if ($('#korPas').val() != $('#korPasP').val()) {

                korPasPZacrveni('Lozinke se ne podudaraju');
                podudaranje = false;

            } else {

                korPas();
            }
        }

        else if ((!emailReg.test($('#korEmail').val())) || $('#korEmail').val()=="") {


            korEmailZacrveni('Niste uneli email');
            korTel();

        } else if (emailReg.test(email) && !isNaN(telefon) && email != '' && telefon != '' && podudaranje) {

            
            //validateEmail();
            let musterija = {

                Ime: $('#korIme').val(),
                Lozinka: $('#korPas').val(),

            };

            korEmail();
            if (musterija != null) {
                $.ajax({
                    type: "POST",
                    url: "/api/Registration/Registration",
                    data: JSON.stringify(musterija),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                }).done(function (data) {
                    if (data != null) {

                        sessionStorage.setItem('logged', JSON.stringify(data));
                        window.location.href = "Reg.html";
                        alert("Data"+data.Ime);
                    } else {

                        alert("Vec registrovan");
                    }



                });
            }



        }
        


           



    });

    function validateEmail() {
        let userinput = $('#korEmail').val();
        let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/;

            if (!pattern.test(userinput)) {

                korEmailZacrveni('Morate uneti validan email');


            } else {

                korEmail();
            }
    }

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
                }).done(function (data) {
                    if (data != null) {

                        sessionStorage.setItem('logged', JSON.stringify(data));
                        window.location.href = "Nalog.html";

                    } else {

                        alert("Nije registrovan");
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

