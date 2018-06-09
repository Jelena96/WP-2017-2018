
$(document).ready(function () {

    $('#registracijaForma').validate({ 
        rules: {
            korEmail: {
                required: true,
                email: true
            },
            korPas: {
                required: true,
                minlength: 5
            },
            korIme: {
                required: true,
                ime: true
            }
        }
    });


    $("#btnReg").click(function () {
        alert("Text:");
    });

});

