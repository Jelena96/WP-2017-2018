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
        Korisnik k = new Korisnik();
        string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";

        [Route("IzmeniProfil")]
        public Korisnik IzmeniProfil([FromBody]Korisnik ko)
        {
            Korisnik korisnik = null;
            k.iscitaj();
            
            foreach (Korisnik k in k.listaKorisnika)
            {

                if (k.KorisnickoIme == ko.KorisnickoIme)
                {

                    korisnik = k;

                }
            }

            k.listaKorisnika.Remove(korisnik);
            File.WriteAllLines(putanja, File.ReadLines(putanja).Where(s => s != korisnik.Ime && s!=korisnik.Lozinka).ToList());

            Korisnik NoviK = new Korisnik();
            NoviK = ko;
            k.listaKorisnika.Add(NoviK);
            Upis(NoviK.Ime, NoviK.Lozinka);
            return NoviK;

        }

      

        [Route("Registration")]
        public Korisnik Registration([FromBody]Korisnik jToken)
        {
            Korisnik kor = new Korisnik();
            
            if (!provera(jToken))
            {

                kor.KorisnickoIme = jToken.KorisnickoIme;
                kor.Lozinka = jToken.Lozinka;
                Upis(kor.KorisnickoIme, kor.Lozinka);
                kor.listaKorisnika.Add(kor);

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
                if (korisnik.KorisnickoIme == jToken.KorisnickoIme)
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
