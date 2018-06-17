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
    [RoutePrefix("api/Registration")]
    public class RegistrationController : ApiController
    {



        [Route("Registration")]
        public Korisnik Registration([FromBody]Korisnik jToken)
        {
            Korisnik kor = new Korisnik();
            
            if (!provera(jToken))
            {

                kor.Ime = jToken.Ime;
                kor.Lozinka = jToken.Lozinka;
                Upis(kor.Ime, kor.Lozinka);

            }
            else {

                kor = null;
            }

            return kor;
            
        }

        public bool provera([FromBody]Korisnik jToken) {

            bool isMatch = false;
            Korisnik kor = new Korisnik();
            kor.iscitaj();
            foreach (Korisnik korisnik in kor.listaKorisnika)
            {
                if (korisnik.Ime == jToken.Ime)
                {

                    isMatch = true;

                }
            }

            return isMatch;
        }
        public void Upis(string ime,string pas) {

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            using (System.IO.StreamWriter file = new System.IO.StreamWriter(putanja, true))
            {

                file.WriteLine(ime);
                file.WriteLine(pas);

            }

        }
       
    }
}
