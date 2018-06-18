using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Vozac")]
    public class VozacController : ApiController
    {
        RegistrationController rg = new RegistrationController();
        Vozac v = new Vozac();
        
            [Route("Dodaj")]//proveram u listi korisnik da li ima nekog sa tim imenom, ako nema dodaje u listu vozaca
            public Vozac Dodaj([FromBody]Vozac jToken)
            {
            Vozac kor = new Vozac();
            if (!provera(jToken))
                kor = jToken;
            else
                kor = null;

            return kor;
            }

        public bool provera([FromBody]Korisnik jToken)
        {

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

        }
}
