using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebAPI.Models
{
    public class Voznja
    {
        public int IdVoznje { get; set; }
        public DateTime DTPorudzbine { get; set; }
        public Lokacija Dolazak { get; set; }

        public TipAutomobila TipAutaVoznje { get; set; }

        public string MusterijaVoznja { get; set; }

        public Lokacija Odrediste { get; set; }

        public string DispecerVoznja { get; set; }

        public string VozacVoznja { get; set; }
        public double Iznos { get; set; }
        public Komentar Komentar { get; set; }
        public StatusVoznje StatusVoznje { get; set; }
       // public Voznja TrenutnaVoznja { get; set; }

        public List<Voznja> IzlistajVoznje()
        {
            
            List<Voznja> voznje = new List<Voznja>();
            string putanja = "~/Baza/Voznje.txt";
            putanja = HostingEnvironment.MapPath(putanja);

            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length; x++)
                {

                    string[] splitovano = lines[x].Split('|');

                   

                        Voznja korisnik = new Voznja();
                        korisnik.IdVoznje = Convert.ToInt32(splitovano[0]);

                  
                    DateTime dt = DateTime.ParseExact(splitovano[1], "dd.M.yyyy. HH:mm:ss",
                                       System.Globalization.CultureInfo.InvariantCulture);
                    korisnik.DTPorudzbine = dt;

                    Lokacija lokDol = new Lokacija();
                    Adresa adrDol = new Adresa();


                    lokDol.X = Convert.ToInt32(splitovano[2]);
                    lokDol.Y = Convert.ToInt32(splitovano[3]);
                    adrDol.UlicaIBroj = splitovano[4];
                    adrDol.NaseljenoMesto = splitovano[5];
                    adrDol.PozivniBroj = splitovano[6];

                    lokDol.Adresa = adrDol;
                    korisnik.Dolazak = lokDol;

                    string tip = splitovano[7];
                    TipAutomobila tipVozila = (TipAutomobila)Enum.Parse(typeof(TipAutomobila), tip, true);

                    korisnik.TipAutaVoznje = tipVozila;
                    korisnik.MusterijaVoznja = splitovano[8];

                    Lokacija lokOdr = new Lokacija();
                    Adresa adrOdr = new Adresa();


                    lokOdr.X = Convert.ToInt32(splitovano[9]);
                    lokOdr.Y= Convert.ToInt32(splitovano[10]);
                    adrOdr.UlicaIBroj = splitovano[11];
                    adrOdr.NaseljenoMesto = splitovano[12];
                    adrOdr.PozivniBroj = splitovano[13];

                    lokOdr.Adresa = adrOdr;
                    korisnik.Odrediste = lokOdr;
                    korisnik.VozacVoznja = splitovano[14];
                    korisnik.Iznos = Convert.ToInt32(splitovano[15]);
                    korisnik.DispecerVoznja = splitovano[16];

                    Komentar komentar = new Komentar();
                    
                    komentar.Opis = splitovano[17];
                   
                    komentar.IdVoznje = Convert.ToInt32(splitovano[18]);
                    DateTime dt2=DateTime.Now;
                    if (splitovano[19] != "")
                    {
                        dt2 = DateTime.ParseExact(splitovano[19], "dd.M.yyyy. HH:mm:ss",
                                           System.Globalization.CultureInfo.InvariantCulture);
                    }
                    komentar.VremeObjave = dt2;
                    komentar.Ocena = Convert.ToInt32(splitovano[20]);
                    korisnik.Komentar = komentar;
                    string tip2 = splitovano[21];
                    StatusVoznje status = (StatusVoznje)Enum.Parse(typeof(StatusVoznje), tip2, true);

                    korisnik.StatusVoznje = status;
                    


                    voznje.Add(korisnik);

                    }
                }

            return voznje;

            }

        }
}