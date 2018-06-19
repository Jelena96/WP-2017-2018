using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

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

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";

            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {

                    string[] splitovano = lines[x].Split('|');

                    //if (splitovano[8] == Convert.ToString(Uloga.Musterija))
                    
                        Korisnik korisnik = new Korisnik();
                        korisnik.KorisnickoIme = splitovano[0];
                        korisnik.Ime = splitovano[1];
                    korisnik.Prezime = splitovano[2];
                    korisnik.BrojTelefona = Convert.ToInt32( splitovano[3]);
                    korisnik.Email = splitovano[4];
                    korisnik.Jmbg = splitovano[5];
                    korisnik.Lozinka = splitovano[6];
                    

                    korisnik.UlogaKorisnika = Uloga.Musterija;
                        listaKorisnika.Add(korisnik);
                    
                    
                }

                //sr.Close();
            }

        }
    }
}