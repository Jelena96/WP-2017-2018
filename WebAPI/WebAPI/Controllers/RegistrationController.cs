using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/registration")]
    public class RegistrationController : ApiController
    {
        public List<Korisnik> listaKorisnika = new List<Korisnik>(); 

        [HttpPost]
        public HttpResponseMessage Post([FromBody]JToken jToken) {

            string result = "";
           
            var imeKor = jToken.Value<string>("korIme");
            var pasKor = jToken.Value<string>("korPas");
            var prezKor = jToken.Value<string>("korPrez");
            var potvrda = jToken.Value<string>("korPasP");
            var tel = jToken.Value<string>("korTel");
            var email = jToken.Value<string>("korEmail");

            Korisnik kor = new Korisnik();
            kor.iscitaj();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotModified) ;
        
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            bool isMatch = false;


            if (imeKor != "" && prezKor != "" && pasKor != "" && potvrda != "" && tel != "" && email != "")
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
                    listaKorisnika.Add(k);

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
