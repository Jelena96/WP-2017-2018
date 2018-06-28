using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{

  

    [RoutePrefix("api/Registration")]
    public class RegistrationController : ApiController
    {
        Korisnik k = new Korisnik();
        Admini a = new Admini();
        string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";


        [Route("IzmeniProfilA")]
        public Korisnik IzmeniProfilA([FromBody]Admini ko)
        {
            Admini korisnik = null;
            Korisnik NoviKorisnik = null;

            a.iscitaj();

            foreach (Admini k in a.listaAdmina)
            {

                if (k.KorisnickoIme == ko.KorisnickoIme)
                {

                    korisnik = k;

                }
            }



            a.listaAdmina.Remove(korisnik);
            BrisiA(korisnik);

            Admini NoviK = new Admini();
            NoviK = ko;
            a.listaAdmina.Add(NoviK);
            UpisA(NoviK);
            return NoviK;

        }

        [Route("IzmeniProfil")]
        public Korisnik IzmeniProfil([FromBody]Korisnik ko)
        {
            Korisnik korisnik = null;
            Korisnik NoviKorisnik = null;
            
            k.iscitaj();
            
            foreach (Korisnik k in k.listaKorisnika)
            {

                if (k.KorisnickoIme == ko.KorisnickoIme)
                {

                    korisnik = k;
                  
                }
            }

            
           
            k.listaKorisnika.Remove(korisnik);
            Brisi(korisnik);

            Korisnik NoviK = new Korisnik();
            NoviK = ko;
            k.listaKorisnika.Add(NoviK);
            Upis(NoviK);
            return NoviK;

        }

        public void Brisi(Korisnik vozac)
        {
            string putanja = "~/Baza/Baza.txt";
            putanja = HostingEnvironment.MapPath(putanja);

            string tempFile = Path.GetTempFileName();

            using (var sr = new StreamReader(putanja))
            using (var sw = new StreamWriter(tempFile))
            {
                string line;

                while ((line = sr.ReadLine()) != null)
                {
                    if (!line.Contains(vozac.KorisnickoIme))
                        sw.WriteLine(line);
                }
            }

            File.Delete(putanja);
            File.Move(tempFile, putanja);
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

            kor.UlogaKorisnika = Uloga.Musterija;
            return kor;
            
        }

        public void BrisiA(Admini vozac)
        {
            string putanja = "~/Baza/Admin.txt";
            putanja = HostingEnvironment.MapPath(putanja);

            string tempFile = Path.GetTempFileName();

            using (var sr = new StreamReader(putanja))
            using (var sw = new StreamWriter(tempFile))
            {
                string line;

                while ((line = sr.ReadLine()) != null)
                {
                    if (!line.Contains(vozac.KorisnickoIme))
                        sw.WriteLine(line);
                }
            }

            File.Delete(putanja);
            File.Move(tempFile, putanja);
        }


        public void UpisA(Admini vozac)
        {
            string putanja = "~/Baza/Admin.txt";
            putanja = HostingEnvironment.MapPath(putanja);
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
            string putanja = "~/Baza/Baza.txt";
            putanja = HostingEnvironment.MapPath(putanja);
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
