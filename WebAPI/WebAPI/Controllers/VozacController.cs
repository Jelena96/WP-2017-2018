﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Vozac")]
    public class VozacController : ApiController
    {
        string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";

        RegistrationController rg = new RegistrationController();
        Vozac v = new Vozac();
        Korisnik k = new Korisnik();

        [Route("PromeniLokaciju")]
        public Vozac PromeniLokaciju([FromBody]JToken jToken)
        {
            Vozac korisnik = null;
            Vozac vozac2 = null;
            v.iscitaj2();
            k.iscitaj();
            var imeV = jToken.Value<string>("imeV");
            var ulicaibroj = jToken.Value<string>("ulica");
            var mesto = jToken.Value<string>("NaseljenoMesto");
            var pozivni = jToken.Value<string>("PozivniBroj");
            var xK = jToken.Value<string>("X");
            var yK = jToken.Value<string>("Y");

            foreach (Vozac vozac in v.vozaci) {
                if (vozac.Ime == imeV)
                {
                    korisnik = vozac;
                    vozac2 = vozac;
                }
            }

            if (korisnik != null)
            {
                k.listaKorisnika.Remove(korisnik);
                v.vozaci.Remove(korisnik);
                Brisi(korisnik);
                // File.WriteAllLines(putanja, File.ReadLines(putanja).Where(s => s != korisnik.Lokacija. && s != korisnik.Lozinka).ToList()); 
                vozac2.Lokacija.X = Convert.ToDouble(xK);
                vozac2.Lokacija.Y = Convert.ToDouble(yK);

                Adresa a = new Adresa();
                a.NaseljenoMesto = mesto;
                a.PozivniBroj = pozivni;
                a.UlicaIBroj = ulicaibroj;

                vozac2.Lokacija.Adresa = a;

                v.vozaci.Add(vozac2);
                k.listaKorisnika.Add(vozac2);
                Upis(vozac2);
            }
            return korisnik;
        }

        public void Brisi(Vozac vozac)
        {
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";

            string tempFile = Path.GetTempFileName();

            using (var sr = new StreamReader(putanja))
            using (var sw = new StreamWriter(tempFile))
            {
                string line;

                while ((line = sr.ReadLine()) != null)
                {
                    if (!line.Contains(vozac.Ime))
                        sw.WriteLine(line);
                }
            }

            File.Delete(putanja);
            File.Move(tempFile, putanja);
        }

                public void Upis(Vozac vozac) {

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            using (System.IO.StreamWriter file = new System.IO.StreamWriter(putanja, true))
            {
                string korisnik = vozac.Ime + "|" + vozac.Prezime + "|" + Convert.ToString(vozac.BrojTelefona)
            + "|" + vozac.Email + "|" + vozac.Jmbg + "|" + vozac.Lozinka + "|" + Convert.ToString(vozac.PolKorisnika)
            + "|" + Convert.ToString(vozac.UlogaKorisnika)
            + "|" + vozac.Lokacija.Adresa.NaseljenoMesto + "|" + vozac.Lokacija.Adresa.PozivniBroj 
            + "|" + vozac.Lokacija.Adresa.UlicaIBroj
           + "|" + Convert.ToString(vozac.Lokacija.X) + "|" + Convert.ToString(vozac.Lokacija.Y)+"|" /*+ Convert.ToString(vozac.Automobil.BrojVozila)+ "|" + Convert.ToString(vozac.Automobil.GodisteAuta)+ "|" + vozac.Automobil.RegistarskaOznaka+ "|" + vozac.Automobil.TipAuta+ "|" + vozac.Automobil.VozacAuta*/;
                file.WriteLine(korisnik);
              

            }

        }

        [Route("Dodaj")]//proveram u listi korisnik da li ima nekog sa tim imenom, ako nema dodaje u listu vozaca
            public Vozac Dodaj([FromBody]Vozac jToken)
            {
            Vozac kor = new Vozac();
            v.iscitaj();
            if (!provera(jToken))
            {
                v.vozaci.Add(jToken);
                v.listaKorisnika.Add(jToken);
                kor = jToken;
                kor.UlogaKorisnika = Uloga.Vozac;
                rg.Upis(jToken.Ime, jToken.Lozinka);
            }
            else
                kor = null;

            return kor;
            }

        public bool provera([FromBody]Korisnik jToken)
        {

            bool isMatch = false;
            Korisnik kor = new Korisnik();
            kor.iscitaj();
            foreach (Korisnik korisnik in kor.listaKorisnika)
            {
                if (korisnik.Ime == jToken.Ime)
                {

                    isMatch = true;

                }
                
            }

            return isMatch;
        }

        }
}
