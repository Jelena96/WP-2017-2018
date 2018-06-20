using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
    [RoutePrefix("api/Voznja")]
    public class VoznjaController : ApiController
    {
        Korisnik k = new Korisnik();
        Admini a = new Admini();
        Vozac v = new Vozac();
        Voznja vo = new Voznja();

        [Route("OtkaziVoznju")]
        public Voznja OtkaziVoznju([FromBody]Voznja voznja)
        {
            Voznja NovaVoznja = new Voznja();
            List<Voznja> voznje = vo.IzlistajVoznje();

            foreach (Voznja v in voznje)
            {
                if (voznja.DispecerVoznja != null) {

                    break;
                }
                else if (v.MusterijaVoznja == voznja.MusterijaVoznja)
                {
                    if (v.StatusVoznje == StatusVoznje.Kreirana)
                    {
                        v.StatusVoznje = StatusVoznje.Otkazana;
                    }

                }

                voznja = v;
            }
            return voznja;

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
    }
}
