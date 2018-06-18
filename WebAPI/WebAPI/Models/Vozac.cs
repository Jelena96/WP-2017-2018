using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Vozac:Korisnik
    {
        public Automobil Automobil { get; set; }
        public Lokacija Lokacija { get; set; }

        public List<Vozac> vozaci = new List<Vozac>();
    }
}