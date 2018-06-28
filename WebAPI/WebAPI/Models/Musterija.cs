using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebAPI.Models
{
    public class Musterija:Korisnik
    {

        public List<Musterija> listaMusterija = new List<Musterija>();
        public void iscitajMusterije()
        {

            string putanja = "~/Baza/Baza.txt";
            putanja = HostingEnvironment.MapPath(putanja);

            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {

                    string[] splitovano = lines[x].Split('|');

                    if (splitovano[8] == Convert.ToString(Uloga.Musterija))
                    {

                        Musterija korisnik = new Musterija();
                        korisnik.KorisnickoIme = splitovano[0];
                        korisnik.Ime = splitovano[1];
                        korisnik.Prezime = splitovano[2];
                        korisnik.BrojTelefona = Convert.ToInt32(splitovano[3]);
                        korisnik.Email = splitovano[4];
                        korisnik.Jmbg = splitovano[5];
                        korisnik.Lozinka = splitovano[6];


                        korisnik.UlogaKorisnika = Uloga.Musterija;
                        listaKorisnika.Add(korisnik);
                        listaMusterija.Add(korisnik);

                    }
                }

                //sr.Close();
            }

        }
        }
}