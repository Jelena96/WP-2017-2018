using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebAPI.Models
{
    public class Admini:Korisnik
    {
        public List<Admini> listaAdmina = new List<Admini>();
        public void iscitaj()
        {

            string putanja = "~/Baza/Admin.txt";
            putanja = HostingEnvironment.MapPath(putanja);
            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {

                    string[] splitovano = lines[x].Split('|');



                    Admini korisnik = new Admini();
                    korisnik.KorisnickoIme = splitovano[0];
                    korisnik.Ime = splitovano[1];
                    korisnik.Prezime = splitovano[2];
                    korisnik.BrojTelefona = Convert.ToInt32(splitovano[3]);
                    korisnik.Email = splitovano[4];
                    korisnik.Jmbg = splitovano[5];
                    korisnik.Lozinka = splitovano[6];
                    if (splitovano[8] == Convert.ToString(Uloga.Musterija))
                    {
                        korisnik.UlogaKorisnika = Uloga.Musterija;
                        // UpisMusterija(korisnik);
                    }
                    else if (splitovano[8] == Convert.ToString(Uloga.Admin))
                    {

                        korisnik.UlogaKorisnika = Uloga.Admin;
                    }
                    else
                    {
                        korisnik.UlogaKorisnika = Uloga.Vozac;
                        // UpisVozac(korisnik);
                    }
                    listaAdmina.Add(korisnik);
                    listaKorisnika.Add(korisnik);//zbog provere istih imena u bazi
                }
                sr.Close();
            }


        }
    }      
    
}