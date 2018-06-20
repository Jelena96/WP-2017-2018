using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Vozac:Korisnik
    {
        public Automobil Automobil { get; set; }
        public Lokacija Lokacija { get; set; }
        public bool Zauzet { get; set; }

        public List<Vozac> vozaci = new List<Vozac>();

        public void iscitaj2()
        {

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Vozaci.txt";


            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length; x++)
                {
                    string[] splitovano = lines[x].Split('|');

                    if (splitovano[8] == "Vozac")
                    {


                        Vozac korisnik = new Vozac();
                        korisnik.KorisnickoIme = splitovano[0];
                        korisnik.Ime = splitovano[1];
                        korisnik.Prezime = splitovano[2];
                        korisnik.BrojTelefona =Convert.ToInt32(splitovano[3]);
                        korisnik.Lozinka = splitovano[6];
                        korisnik.Email = splitovano[4];
                        korisnik.Jmbg = splitovano[5];

                        Lokacija lokacija = new Lokacija();
                        Adresa adresa = new Adresa();

                        adresa.UlicaIBroj = splitovano[11];
                        adresa.PozivniBroj = splitovano[10];
                        adresa.NaseljenoMesto = splitovano[9];

                        lokacija.X = Convert.ToDouble(splitovano[12]);
                        lokacija.Y = Convert.ToDouble(splitovano[13]);

                        korisnik.Lokacija = lokacija;
                        korisnik.Lokacija.Adresa = adresa;

                        Automobil a = new Automobil();
                        a.BrojVozila = Convert.ToInt32( splitovano[14]);
                        a.GodisteAuta= Convert.ToInt32(splitovano[15]);
                        a.RegistarskaOznaka = splitovano[16];
                        a.TipAuta = splitovano[17];
                        //korisnik.Zauzet =  (splitovano[18]);
                        korisnik.Automobil = a;

                        vozaci.Add(korisnik);
                        //k.listaKorisnika.Add(korisnik);
                    }

                }

                //sr.Close();
            }
        }
        }
}