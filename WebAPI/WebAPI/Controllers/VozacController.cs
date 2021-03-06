﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Vozac")]
    public class VozacController : ApiController
    {
        string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Vozaci.txt";

        RegistrationController rg = new RegistrationController();
        Vozac v = new Vozac();
        Korisnik k = new Korisnik();

        [Route("IzmeniProfil")]
        public Vozac IzmeniProfil([FromBody]Vozac ko)
        {
            Vozac korisnik = null;
            v.iscitaj2();
            
            foreach (Vozac k in v.vozaci)
            {

                if (k.KorisnickoIme == ko.KorisnickoIme)
                {

                    korisnik = k;

                }
            }

            Vozac NoviK = new Vozac();
            NoviK = ko;
            if (NoviK.Automobil != null && NoviK.Lokacija != null)
            {
                NoviK.Automobil = korisnik.Automobil;
                NoviK.Lokacija = korisnik.Lokacija;
                k.listaKorisnika.Remove(korisnik);
                Brisi(korisnik);


                k.listaKorisnika.Add(NoviK);
                v.vozaci.Add(NoviK);
                Upis(NoviK);
            }
            else {

                NoviK.Automobil = new Automobil();
                NoviK.Automobil.BrojVozila = 0;
                NoviK.Automobil.GodisteAuta = 0;
                NoviK.Automobil.RegistarskaOznaka = "";
                NoviK.Automobil.TipAuta = "";
                
                NoviK.Lokacija = new Lokacija();
                NoviK.Lokacija.Adresa = new Adresa();
                NoviK.Lokacija.Adresa.NaseljenoMesto = "";
                NoviK.Lokacija.Adresa.PozivniBroj = "";
                NoviK.Lokacija.Adresa.UlicaIBroj = "";
                NoviK.Lokacija.X = 0;
                NoviK.Lokacija.Y = 0;
                k.listaKorisnika.Remove(korisnik);
                Brisi(korisnik);


                k.listaKorisnika.Add(NoviK);
                v.vozaci.Add(NoviK);
                Upis(NoviK);
            }
            return NoviK;

        }

        [Route("IzmeniAuto")]
        public Vozac IzmeniAuto([FromBody]Vozac ko)
        {
            Vozac korisnik = null;
            v.iscitaj2();

            foreach (Vozac k in v.vozaci)
            {

                if (k.KorisnickoIme == ko.KorisnickoIme)
                {

                    korisnik = k;

                }
            }

            Vozac NoviK = new Vozac();
            NoviK = ko;
            NoviK.Lokacija = korisnik.Lokacija;
           
            k.listaKorisnika.Remove(korisnik);
            Brisi(korisnik);
           
            k.listaKorisnika.Add(NoviK);
            v.vozaci.Add(NoviK);
            Upis(NoviK);

            return NoviK;

        }

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
                if (vozac.KorisnickoIme == imeV)
                {
                    korisnik = vozac;
                    vozac2 = vozac;
                }
            }

            if (korisnik != null)
            {
                k.listaKorisnika.Remove(korisnik);
                v.vozaci.Remove(korisnik);
                
                vozac2 = korisnik;
                vozac2.Lokacija.X = Convert.ToDouble(xK);
                vozac2.Lokacija.Y = Convert.ToDouble(yK);

                Adresa a = new Adresa();
                a.NaseljenoMesto = mesto;
                a.PozivniBroj = pozivni;
                a.UlicaIBroj = ulicaibroj;
                BrisiPoImenu(imeV);
                vozac2.Lokacija.Adresa = a;

                v.vozaci.Add(vozac2);
                k.listaKorisnika.Add(vozac2);
                Upis(vozac2);
            }
            return vozac2;
        }

        public void Brisi(Vozac vozac)
        {
            string putanja = "~/Baza/Vozaci.txt";
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

        public void BrisiPoImenu(string ime)
        {
            string putanja = "~/Baza/Vozaci.txt";
            putanja = HostingEnvironment.MapPath(putanja);

            string tempFile = Path.GetTempFileName();

            using (var sr = new StreamReader(putanja))
            using (var sw = new StreamWriter(tempFile))
            {
                string line;

                while ((line = sr.ReadLine()) != null)
                {
                    if (!line.Contains(ime))
                        sw.WriteLine(line);
                }
            }

            File.Delete(putanja);
            File.Move(tempFile, putanja);
        }



        public void Upis(Vozac vozac)
        {
            string putanja = "~/Baza/Vozaci.txt";
            putanja = HostingEnvironment.MapPath(putanja);
            FileStream stream = new FileStream(putanja, FileMode.Append);
            //string ulicaD = k.Dolazak.Adresa.UlicaIBroj.Trim('*');
            //string ulicaO = k.Odrediste.Adresa.UlicaIBroj.Trim(new Char[] {'*'});
            using (StreamWriter tw = new StreamWriter(stream))
            {
                string korisnik = vozac.KorisnickoIme + "|" + vozac.Ime + "|" + vozac.Prezime + "|" + Convert.ToString(vozac.BrojTelefona)
                    + "|" + vozac.Email + "|" + vozac.Jmbg + "|" + vozac.Lozinka + "|" + Convert.ToString(vozac.PolKorisnika)
                    + "|" + Convert.ToString(vozac.UlogaKorisnika)
                    + "|" + vozac.Lokacija.Adresa.NaseljenoMesto + "|" + vozac.Lokacija.Adresa.PozivniBroj
                    + "|" + vozac.Lokacija.Adresa.UlicaIBroj
                   + "|" + Convert.ToString(vozac.Lokacija.X) + "|" + Convert.ToString(vozac.Lokacija.Y) + "|" + Convert.ToString(vozac.Automobil.BrojVozila) + "|" + Convert.ToString(vozac.Automobil.GodisteAuta) + "|" + vozac.Automobil.RegistarskaOznaka + "|" + vozac.Automobil.TipAuta + "|" + vozac.Zauzet;
                tw.WriteLine(korisnik);
            }
            stream.Close();
        }

       

        [Route("Dodaj")]//proveram u listi korisnik da li ima nekog sa tim imenom, ako nema dodaje u listu vozaca
            public Vozac Dodaj([FromBody]Vozac jToken)
            {
            Vozac kor = new Vozac();
            v.iscitaj();
            if (!provera(jToken))
            {
                jToken.Automobil = new Automobil();
                jToken.Lokacija = new Lokacija();
                jToken.Lokacija.Adresa = new Adresa();
                jToken.Lokacija.X = 0;
                jToken.Lokacija.Y = 0;
                jToken.Lokacija.Adresa.NaseljenoMesto = "";
                jToken.Lokacija.Adresa.PozivniBroj ="";
                jToken.Lokacija.Adresa.UlicaIBroj = "";
                jToken.Automobil.BrojVozila = 0;
                jToken.Automobil.GodisteAuta = 1996;
                jToken.Automobil.RegistarskaOznaka = "";
                jToken.Automobil.TipAuta = "";
                jToken.Automobil.VozacAuta = jToken;
                v.vozaci.Add(jToken);
                v.listaKorisnika.Add(jToken);
                kor = jToken;
                kor.UlogaKorisnika = Uloga.Vozac;
                rg.Upis(jToken);
                Upis(jToken);
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
                if (korisnik.KorisnickoIme == jToken.KorisnickoIme)
                {

                    isMatch = true;

                }
                
            }

            return isMatch;
        }

        }
}
