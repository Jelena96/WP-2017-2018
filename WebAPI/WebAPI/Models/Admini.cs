using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Admini:Korisnik
    {
        public List<Admini> listaAdmina = new List<Admini>();
        public void iscitaj()
        {

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Admin.txt";

            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {



                    Admini korisnik = new Admini();
                    korisnik.Ime = lines[x];
                    korisnik.Lozinka = lines[x + 1];
                    listaAdmina.Add(korisnik);


                }

                sr.Close();
            }

        }
    }
}