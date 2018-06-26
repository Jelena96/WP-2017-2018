using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Voznja")]
    public class VoznjaController : ApiController
    {
        VozacController vc = new VozacController();
        Korisnik k = new Korisnik();
        Admini a = new Admini();
        Vozac v = new Vozac();
        Voznja vo = new Voznja();
        Musterija m = new Musterija();

        [Route("Sortiranje")]
        public HttpResponseMessage Sortiranje([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            var vrsta = jtoken.Value<string>("vrstaS");
            List<Voznja>voznje = vo.IzlistajVoznje();
            
            List<Voznja> NovaList = new List<Voznja>();
            
            if (vrsta == "Datum")
            {
               voznje.OrderBy(x => x.DTPorudzbine).ToList();
            }
            else {

                voznje = voznje.OrderBy(x => x.Komentar.Ocena).ToList();
            }

            var json = JsonConvert.SerializeObject(voznje);

            return Request.CreateResponse(HttpStatusCode.OK, json);
            
        }



        [Route("PromeniStanjeVozac")]
        public Voznja PromeniStanjeVozac([FromBody]JToken jtoken)
        {
            Voznja NovaVoznja = null;
            Voznja StaraVoznja = null;

            bool isMatch = false;

            Vozac NoviVozac = null;
            Vozac StariVozac = null;

            var id = jtoken.Value<string>("i");
            var ime = jtoken.Value<string>("izabrano");
            var imeVozaca = jtoken.Value<string>("imee");

            List<Voznja> voznje = vo.IzlistajVoznje();


            foreach (Voznja voznja in voznje)
            {
                if (voznja.IdVoznje == Convert.ToInt32(id))
                {
                    StaraVoznja = voznja;
                    NovaVoznja = voznja;
                    
                    isMatch = true;
                   
                }

            }

            v.iscitaj2();
            foreach (Vozac v in v.vozaci)
            {
                if (v.KorisnickoIme == imeVozaca) {

                    StariVozac = v;
                    NoviVozac = v;

                }

            }

            if (NoviVozac != null || StariVozac != null)
            {
                NoviVozac.Zauzet = false;
                vc.Brisi(StariVozac);
                v.vozaci.Remove(StariVozac);
                vc.Upis(NoviVozac);
                v.vozaci.Add(NoviVozac);
            }

            if (isMatch)
            {
                Brisi(StaraVoznja);
                if (ime == "Neuspesna")
                {

                    if (NovaVoznja.StatusVoznje == StatusVoznje.Formirana || NovaVoznja.StatusVoznje == StatusVoznje.Obradjena || NovaVoznja.StatusVoznje == StatusVoznje.Prihvacena)
                        NovaVoznja.StatusVoznje = StatusVoznje.Neuspesna;
                    else
                        NovaVoznja = null;
                }
                else
                {

                    if (NovaVoznja.StatusVoznje == StatusVoznje.Formirana || NovaVoznja.StatusVoznje == StatusVoznje.Obradjena || NovaVoznja.StatusVoznje == StatusVoznje.Prihvacena)
                        NovaVoznja.StatusVoznje = StatusVoznje.Uspesna;
                    else
                        NovaVoznja = null;
                  
                }

                if (NovaVoznja != null)
                {
                    voznje.Remove(StaraVoznja);
                    voznje.Add(NovaVoznja);
                    Upis(NovaVoznja);
                }
                    
              }

            return NovaVoznja;

        }

        [Route("UcitajNeobradjene")]
        public HttpResponseMessage UcitajNeobradjene([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            List<Voznja> voznjeKorisnik = new List<Voznja>();

            foreach (Voznja v in vo.IzlistajVoznje())
            {
                if (v.MusterijaVoznja != "" && v.VozacVoznja == "" && v.StatusVoznje != StatusVoznje.Otkazana)
                {
                    voznjeKorisnik.Add(v);

                }
                
            }


            var json = JsonConvert.SerializeObject(voznjeKorisnik);

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        


        [Route("UnesiOdredisteVozac")]
        public Voznja UnesiOdredisteVozac([FromBody]JToken voznja)
        {
            bool isMatch = false;
            Voznja k = new Voznja();
            Voznja NovaVoznja = new Voznja();
            Voznja privremena = new Voznja();

            var id = voznja.Value<string>("IdVoznje");
            var mesto = voznja.Value<string>("mesto");
            var broj = voznja.Value<string>("broj");
            var ulica = voznja.Value<string>("ulica");
            var x = voznja.Value<string>("x");
            var y = voznja.Value<string>("y");
            var iznos = voznja.Value<string>("iznos");





            List<Voznja> voznje = k.IzlistajVoznje();

            foreach (Voznja v in voznje)
            {
                if (v.IdVoznje == Convert.ToInt32(id))
                {

                    privremena = v;
                    isMatch = true;
                }

            }

            if (isMatch)
            {
                NovaVoznja = privremena;
                NovaVoznja.DTPorudzbine = privremena.DTPorudzbine;
                NovaVoznja.StatusVoznje = privremena.StatusVoznje;

                NovaVoznja.DispecerVoznja = privremena.DispecerVoznja;
                NovaVoznja.VozacVoznja = privremena.VozacVoznja;

                NovaVoznja.Komentar = new Komentar();
                NovaVoznja.Komentar.IdVoznje = privremena.Komentar.IdVoznje;
                NovaVoznja.Komentar.KorisnikKomentar = privremena.Komentar.KorisnikKomentar;
                NovaVoznja.Komentar.Ocena = privremena.Komentar.Ocena;
                NovaVoznja.Komentar.Opis = privremena.Komentar.Opis;
                NovaVoznja.Komentar.VremeObjave = DateTime.Now;

                

                NovaVoznja.Odrediste = new Lokacija();
                NovaVoznja.Odrediste.Adresa = new Adresa();
                NovaVoznja.Odrediste.Adresa.NaseljenoMesto = mesto;
                NovaVoznja.Odrediste.Adresa.PozivniBroj = broj;
                NovaVoznja.Odrediste.Adresa.UlicaIBroj = ulica;
                NovaVoznja.Iznos = Convert.ToInt32(iznos);
                NovaVoznja.Odrediste.X = Convert.ToInt32(x);
                NovaVoznja.Odrediste.Y = Convert.ToInt32(y);


                Brisi(privremena);
                voznje.Remove(privremena);
                voznje.Add(NovaVoznja);
                Upis(NovaVoznja);
            }
            else
            {

                NovaVoznja = null;
            }

            return NovaVoznja;
        }

        [Route("UcitajKreirane")]
        public HttpResponseMessage UcitajKreirane([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            List<Voznja> voznjeKorisnik = new List<Voznja>();

            foreach (Voznja v in vo.IzlistajVoznje())
            {
                if (v.StatusVoznje == StatusVoznje.Kreirana)
                {
                    voznjeKorisnik.Add(v);

                }

            }


            var json = JsonConvert.SerializeObject(voznjeKorisnik);

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        [Route("UcitajVozac")]
        public HttpResponseMessage UcitajVozac([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            List<Voznja> voznjeKorisnik = new List<Voznja>();

            foreach (Voznja v in vo.IzlistajVoznje())
            {
                if (v.VozacVoznja == ime)
                {
                    voznjeKorisnik.Add(v);
                }
            }


            var json = JsonConvert.SerializeObject(voznjeKorisnik);

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        [Route("UcitajSve")]
        public HttpResponseMessage UcitajSve([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            List<Voznja> voznjeKorisnik = new List<Voznja>();

            foreach (Voznja v in vo.IzlistajVoznje())
            {
              
                voznjeKorisnik.Add(v);
            }


            var json = JsonConvert.SerializeObject(voznjeKorisnik);

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        [Route("ObradiVoznju")]
        public Voznja ObradiVoznju([FromBody]JToken jtoken)
        {
            bool isMatch = false;
            Vozac NoviVozac = null;
            Voznja NovaVoznja = null;
            Voznja ReturnVoznja = null;
            Voznja ZaBrisanjeVoznja = null;
            List<Voznja> voznje =  vo.IzlistajVoznje();
            List<Voznja> saAdminima = new List<Voznja>();
           v.iscitaj2();

           var id = jtoken.Value<string>("id");

            foreach (Vozac vozac in v.vozaci)
            {
                if (!vozac.Zauzet)
                {
                    vozac.Zauzet = true;
                    NoviVozac = vozac;
                }

            }

            for (int i = 0; i < voznje.Count; i++)
            {
                if (voznje[i].DispecerVoznja!="")
                {
                    saAdminima.Add(voznje[i]);
                }

            }

                for (int i = 0; i < saAdminima.Count; i++)
            {
                
                NovaVoznja = saAdminima[saAdminima.Count-1];
            }

            foreach (Voznja v in voznje)
            {
                
                if (v.IdVoznje == Convert.ToInt32(id))
                {
                    ZaBrisanjeVoznja = v;
                    v.VozacVoznja = NoviVozac.KorisnickoIme;
                    v.DispecerVoznja = NovaVoznja.DispecerVoznja;
                    ReturnVoznja = v;
                    ReturnVoznja.StatusVoznje = StatusVoznje.Obradjena;
                    isMatch = true;
                }
    
            }

            if (isMatch)
            {
                Brisi(ZaBrisanjeVoznja);
                Upis(ReturnVoznja);

            }

            return ReturnVoznja;
        }

        [Route("UcitajAdmin")]
        public HttpResponseMessage UcitajAdmin([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            List<Voznja> voznjeKorisnik = new List<Voznja>();

            foreach (Voznja v in vo.IzlistajVoznje())
            {
                if (v.DispecerVoznja == ime)
                {
                    voznjeKorisnik.Add(v);
                    
                }
            }


            var json = JsonConvert.SerializeObject(voznjeKorisnik);

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        [Route("ZakaziVoznjuAdmin")]
        public Voznja ZakaziVoznjuAdmin([FromBody]Voznja jToken)
        {
            string ime = "";
            Voznja voznja = new Voznja();
            v.iscitaj2();

            foreach (Vozac v in v.vozaci)
            {
                if (v.Zauzet == false)
                    ime = v.KorisnickoIme;

            }
            voznja.DispecerVoznja = jToken.DispecerVoznja;
            voznja.VozacVoznja = ime;
            voznja.MusterijaVoznja = "";
            voznja.TipAutaVoznje = jToken.TipAutaVoznje;
            voznja.IdVoznje = GetHashCode();
            voznja.DTPorudzbine = DateTime.Now;

            voznja.Dolazak = jToken.Odrediste;

            //izmenii
            voznja.Odrediste = jToken.Odrediste;

            voznja.Komentar = new Komentar();
            voznja.Komentar.IdVoznje = voznja.IdVoznje;
            voznja.Komentar.VremeObjave = DateTime.Now;
            Upis(voznja);
            return voznja;
        }

        [Route("PromeniVoznju")]
        public Voznja PromeniVoznju([FromBody]Voznja voznja)
        {
            bool isMatch = false;
            Voznja k = new Voznja();
            Voznja NovaVoznja = new Voznja();
            Voznja privremena = new Voznja();

            List<Voznja> voznje = k.IzlistajVoznje();

            foreach (Voznja v in voznje)
            {
                if (v.IdVoznje == voznja.IdVoznje)
                {
                   
                    privremena = v;
                    isMatch = true;
                }
                
            }

            if (isMatch)
            {
                NovaVoznja = voznja;
                NovaVoznja.DTPorudzbine = privremena.DTPorudzbine;
                NovaVoznja.StatusVoznje = voznja.StatusVoznje;
                
                NovaVoznja.DispecerVoznja = "";
                NovaVoznja.VozacVoznja = "";
                NovaVoznja.Komentar = new Komentar();
                NovaVoznja.Komentar.IdVoznje = voznja.Komentar.IdVoznje;
                NovaVoznja.Komentar.KorisnikKomentar = voznja.Komentar.KorisnikKomentar;
                NovaVoznja.Komentar.Ocena = voznja.Komentar.Ocena;
                NovaVoznja.Komentar.Opis = voznja.Komentar.Opis;
                NovaVoznja.Komentar.VremeObjave = DateTime.Now;

                NovaVoznja.Dolazak = new Lokacija();
                NovaVoznja.Dolazak.Adresa = new Adresa();
                NovaVoznja.Dolazak.Adresa.NaseljenoMesto = voznja.Dolazak.Adresa.NaseljenoMesto;
                NovaVoznja.Dolazak.Adresa.PozivniBroj = voznja.Dolazak.Adresa.PozivniBroj;
                NovaVoznja.Dolazak.Adresa.UlicaIBroj = voznja.Dolazak.Adresa.UlicaIBroj;

                NovaVoznja.Dolazak.X = voznja.Dolazak.X;
                NovaVoznja.Dolazak.Y = voznja.Dolazak.Y;



                Brisi(privremena);
                voznje.Remove(privremena);
                voznje.Add(NovaVoznja);
                Upis(NovaVoznja);
            }
            else {

                NovaVoznja = null;
            }

            return NovaVoznja;
                }

        [Route("OtkaziVoznju")]
        public Voznja OtkaziVoznju([FromBody]JToken voznja)
        {
            Voznja NovaVoznja = new Voznja();
            Admini a = new Admini();
            Korisnik k = new Korisnik();
            k.iscitaj();
            a.iscitaj();

            bool isMatch = false;
            bool isMatchIme = false;
            List<Voznja> voznje = vo.IzlistajVoznje();

            var ime = voznja.Value<string>("ime");
            var id = voznja.Value<string>("i");
            Voznja privremena = null;

            foreach (Voznja v in voznje)
            {
                foreach (Admini admin in a.listaAdmina)
                {
                    if (v.MusterijaVoznja==admin.KorisnickoIme) {

                        isMatchIme = true;
                    }

                }

            }

            if (!isMatchIme)
            {
                foreach (Voznja v in voznje)
                {

                    if (v.IdVoznje == Convert.ToInt32(id) && v.StatusVoznje == StatusVoznje.Kreirana && v.MusterijaVoznja == ime)
                    {
                        isMatch = true;
                        NovaVoznja = v;
                        privremena = v;
                    }

                }
            }
            else {
                NovaVoznja = null;

            }

            if (isMatch)
            {
                Brisi(privremena);
                voznje.Remove(privremena);
                NovaVoznja.StatusVoznje = StatusVoznje.Otkazana;
               
                
                voznje.Add(NovaVoznja);
               
               for(int i=0; i<voznje.Count; i++)
                Upis(voznje[i]);
            }
            else {

                NovaVoznja = null;
            }
                
            return NovaVoznja;

        }

        [Route("KomentarisiVoznju")]
        public Voznja KomentarisiVoznju([FromBody]Komentar komentar)
        {
            Voznja voznja = new Voznja();
            Voznja NovaVoznja = new Voznja();
            Voznja StaraVoznja = new Voznja();
            List<Voznja> voznje = voznja.IzlistajVoznje();
            bool isMatchV = false;
            bool isMatchA = false;
            bool isMatchM = false;

            foreach (Voznja v in voznje) {
                
                if (v.IdVoznje == komentar.IdVoznje) {

                   
                    NovaVoznja = v;
                    StaraVoznja = v;
                    NovaVoznja.Komentar = komentar;
                    NovaVoznja.Komentar.VremeObjave = DateTime.Now;
                }
             }

          
            
            voznje.Add(NovaVoznja);
            Brisi(StaraVoznja);
            voznje.Remove(StaraVoznja);
            Upis(NovaVoznja);
           
           
            return NovaVoznja;

        }
        [Route("Ucitaj")]
        public HttpResponseMessage Ucitaj([FromBody]JToken jtoken)
        {
            var ime = jtoken.Value<string>("ime");
            List<Voznja> voznjeKorisnik = new List<Voznja>();
            
            foreach (Voznja v in vo.IzlistajVoznje())
            {
                if (v.MusterijaVoznja == ime)
                {
                    voznjeKorisnik.Add(v);
                   
                }
              }


            var json = JsonConvert.SerializeObject(voznjeKorisnik);

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        [Route("ZakaziVoznju")]
        public Voznja ZakaziVoznju([FromBody]Voznja jToken)
        {
            Voznja voznja = new Voznja();
            //da li je vozac ili musterija ili admin
            v.iscitaj2();
            k.iscitaj();
            a.iscitaj();

            bool isMatchM = false;
            bool isMatchV = false;
            bool isMatchA = false;
            string korIme = jToken.MusterijaVoznja;
            /*var korIme = jToken.Value<string>("korime");
            var adresa = jToken.Value<string>("Odrediste");
            var tip = jToken.Value<string>("tipVozila");*/

            foreach (Vozac v in v.vozaci)
            {
                if (v.KorisnickoIme == korIme)
                {
                    voznja.VozacVoznja = korIme;
                    v.Zauzet = true;
                    isMatchV = true;
                }
                else {
                    voznja.VozacVoznja = "";
                }

            }

            if (!isMatchV)
            {
                //prepravo u musteriju
                foreach (Korisnik v in k.listaKorisnika)
                {
                    if (v.KorisnickoIme == korIme)
                    {
                        voznja.MusterijaVoznja = korIme;
                        voznja.StatusVoznje = StatusVoznje.Kreirana;
                        isMatchM = true;
                    }
                    else
                    {
                        voznja.MusterijaVoznja = "";
                    }

                }
            }

            if (!isMatchM && !isMatchV)
            {
                foreach (Admini v in a.listaAdmina)
                {
                    if (v.KorisnickoIme == korIme)
                    {
                        voznja.DispecerVoznja = korIme;
                        voznja.StatusVoznje = StatusVoznje.Formirana;
                    }
                   

                }

            }
            else
            {
                voznja.DispecerVoznja = "";
            }

            voznja.TipAutaVoznje = jToken.TipAutaVoznje;
            voznja.IdVoznje = GetHashCode();
            voznja.DTPorudzbine = DateTime.Now;
            
            voznja.Dolazak = jToken.Odrediste;
            
            //izmenii
            voznja.Odrediste = jToken.Odrediste;
            
            voznja.Komentar = new Komentar();
            voznja.Komentar.IdVoznje = voznja.IdVoznje;
            voznja.Komentar.VremeObjave = DateTime.Now;
            Upis(voznja);
            return voznja;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
        private void Upis(Voznja k)
        {
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Voznje.txt";
            FileStream stream = new FileStream(putanja ,FileMode.Append);
            //string ulicaD = k.Dolazak.Adresa.UlicaIBroj.Trim('*');
            //string ulicaO = k.Odrediste.Adresa.UlicaIBroj.Trim(new Char[] {'*'});
            using (StreamWriter tw = new StreamWriter(stream))
            {
                string upis = k.IdVoznje.ToString() + '|' + k.DTPorudzbine.ToString() + '|' + 
                    k.Dolazak.X.ToString() + '|' + k.Dolazak.Y.ToString() + '|' +
                    k.Dolazak.Adresa.UlicaIBroj + '|' + k.Dolazak.Adresa.NaseljenoMesto + 
                    '|' + k.Dolazak.Adresa.PozivniBroj + '|' + k.TipAutaVoznje + '|' +
                    k.MusterijaVoznja  + '|' + k.Odrediste.X.ToString() + '|' +
                    k.Odrediste.Y.ToString() + '|' + k.Odrediste.Adresa.UlicaIBroj + '|' 
                    + k.Odrediste.Adresa.NaseljenoMesto + '|' + k.Odrediste.Adresa.PozivniBroj +
                    '|' + k.VozacVoznja + '|' + k.Iznos.ToString() + '|' + k.DispecerVoznja + '|'
                    + k.Komentar.Opis  +  '|' + k.Komentar.IdVoznje.ToString() + '|' + k.Komentar.VremeObjave.ToString()+"|"+
                    k.Komentar.Ocena.ToString() + '|' + k.StatusVoznje;
                tw.WriteLine(upis);
            }
            stream.Close();
        }

        public void Brisi(Voznja vozac)
        {
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Voznje.txt";

            string tempFile = Path.GetTempFileName();

            using (var sr = new StreamReader(putanja))
            using (var sw = new StreamWriter(tempFile))
            {
                string line;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] sp = line.Split('|');
                    if (!sp[0].Equals(vozac.IdVoznje.ToString()))
                        sw.WriteLine(line);
                }
            }

            File.Delete(putanja);
            File.Move(tempFile, putanja);
        }
    }
}
