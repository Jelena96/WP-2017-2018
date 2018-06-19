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

        public List<Vozac> vozaci = new List<Vozac>();

        public void iscitaj2()
        {
            Korisnik k = new Korisnik();
            k.iscitaj();
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";

            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {
                    string[] splitovano = lines[x].Split('|');

                    if (splitovano[7] == "Vozac")
                    {


                        Vozac korisnik = new Vozac();
                        korisnik.Ime = splitovano[0];
                        korisnik.Prezime = splitovano[1];
                        korisnik.BrojTelefona =Convert.ToInt32(splitovano[2]);
                        korisnik.Lozinka = splitovano[5];

                        Lokacija lokacija = new Lokacija();
                        Adresa adresa = new Adresa();

                        adresa.UlicaIBroj = splitovano[10];
                        adresa.PozivniBroj = splitovano[9];
                        adresa.NaseljenoMesto = splitovano[8];

                        lokacija.X = Convert.ToDouble(splitovano[11]);
                        lokacija.Y = Convert.ToDouble(splitovano[12]);

                        korisnik.Lokacija = lokacija;
                        korisnik.Lokacija.Adresa = adresa;

                        vozaci.Add(korisnik);
                        k.listaKorisnika.Add(korisnik);
                    }

                }

                //sr.Close();
            }
        }
        }
}