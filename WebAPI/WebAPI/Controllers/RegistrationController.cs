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
            Upis(NoviK);
            return NoviK;

        }

      

        [Route("Registration")]
        public Korisnik Registration([FromBody]Korisnik jToken)
        {
            Korisnik kor = new Korisnik();
            
            if (!provera(jToken))
            {

                kor = jToken ;
                Upis(kor);
                k.listaKorisnika.Add(kor);

            }
            else {

                kor = null;
            }

            return kor;
            
        }

        public bool provera([FromBody]Korisnik jToken) {

            bool isMatch = false;
            Korisnik kor = new Korisnik();
            k.iscitaj();
            foreach (Korisnik korisnik in k.listaKorisnika)
            {
                if (korisnik.KorisnickoIme == jToken.KorisnickoIme)
                {

                    isMatch = true;

                }
            }

            return isMatch;
        }

        public void Upis(Korisnik vozac)
        {
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            FileStream stream = new FileStream(putanja, FileMode.Append);
            //string ulicaD = k.Dolazak.Adresa.UlicaIBroj.Trim('*');
            //string ulicaO = k.Odrediste.Adresa.UlicaIBroj.Trim(new Char[] {'*'});
            using (StreamWriter tw = new StreamWriter(stream))
            {
                string korisnik = vozac.KorisnickoIme + "|" + vozac.Ime + "|" + vozac.Prezime + "|" + Convert.ToString(vozac.BrojTelefona)
            + "|" + vozac.Email + "|" + vozac.Jmbg + "|" + vozac.Lozinka + "|" + Convert.ToString(vozac.PolKorisnika)
            + "|" + Convert.ToString(vozac.UlogaKorisnika);

                tw.WriteLine(korisnik);
            }
            stream.Close();
        }
    
       
    }
}
