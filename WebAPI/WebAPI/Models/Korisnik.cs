using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebAPI.Models
{
    public class Korisnik
    {
        public string KorisnickoIme { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Lozinka { get; set; }
        public int BrojTelefona { get; set; }
        public string Jmbg { get; set; }
        public string Email { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Pol PolKorisnika { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Uloga UlogaKorisnika { get; set; }

        public List<Korisnik> listaKorisnika = new List<Korisnik>();
        public void iscitaj()
        {

            string putanja = "~/Baza/Baza.txt";
            putanja = HostingEnvironment.MapPath(putanja);

            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length; x++)
                {

                    string[] splitovano = lines[x].Split('|');

                    

                        Korisnik korisnik = new Korisnik();
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
                    else {
                        korisnik.UlogaKorisnika = Uloga.Vozac;
                       // UpisVozac(korisnik);
                    }
                    listaKorisnika.Add(korisnik);
                }
                }

                //sr.Close();
            }

       

    }
    }
