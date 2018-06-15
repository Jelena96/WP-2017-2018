using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    
    public class RegistrationController : ApiController
    {



        [HttpPost]
        public HttpResponseMessage Post([FromBody]Korisnik jToken) {

            string result = "";

            //var imeKor = jToken.Value<string>("korIme");
            //var pasKor = jToken.Value<string>("korPas");
            //var prezKor = jToken.Value<string>("korPrez");
            //var potvrda = jToken.Value<string>("korPasP");
            //var tel = jToken.Value<string>("korTel");
            //var email = jToken.Value<string>("korEmail");

            var imeKor = jToken.Ime;
            var pasKor = jToken.Lozinka;
            var prezKor = jToken.Prezime;
            var tel = jToken.BrojTelefona;
            var email = jToken.Email;

            Korisnik kor = new Korisnik();
            kor.iscitaj();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotModified) ;
        
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            bool isMatch = false;


            if (imeKor != "" && prezKor != "" && pasKor != ""  && email != "")
            {

                foreach (Korisnik korisnik in kor.listaKorisnika)
                {
                    if (imeKor == korisnik.Ime)
                    {

                        response = Request.CreateResponse(HttpStatusCode.BadRequest,"User alredy exsist");
                        isMatch = true;

                    }

                }

                if (!isMatch)
                {

                    Korisnik k = new Korisnik();
                    k.Ime = imeKor;
                    k.Lozinka = pasKor;
                    k.listaKorisnika.Add(k);

                    using (System.IO.StreamWriter file = new System.IO.StreamWriter(putanja, true))
                    {

                        file.WriteLine(k.Ime);
                        file.WriteLine(k.Lozinka);
                        response = Request.CreateResponse(HttpStatusCode.Moved);
                        response.Headers.Location = new Uri("http://localhost:10482/Reg.html");

                    }

                }
            }
            return response;
        }
    }
}
