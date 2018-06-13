
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

    $('#btnReg').click(function () {

        if ($('#korIme').val() == "") {

            korImeZacrveni('Morate uneti ime');

        } else if ($('#korPrez').val() == "") {

            korPrezZacrveni('Morate uneti prezime');
            korIme();

        } else if ($('#korPas').val() == "") {
            korPasZacrveni('Morate uneti lozinku');
            korPrez();

        }
        else if ($('#korTel').val() == '') {

            korTelZacrveni('Niste uneli broj telefona');
            korPas();
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
        else {

            korEmail();
            //window.location.replace("http://localhost:10482/Nalog.html");

        }

        korEmail();

        if ($('#korPas').val() != $('#korPasP').val()) {

            korPasPZacrveni('Lozinke se ne podudaraju');

        } else {

            korPasP();

        }

         
       //za uspesnost AJAX-a
        var musterija = new Object();
        musterija.Name = $('#korIme').val();
        musterija.Pas = $('#korPas').val();
        
        if (musterija != null) {
            $.ajax({
                type: "POST",
                url: "/api/registration",
                data: JSON.stringify(musterija),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response != null) {
                        alert("Name : " + response.Name);
                    } else {
                        window.location.href("login.html");
                        alert("Something went wrong");
                    }

                }

            });
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

