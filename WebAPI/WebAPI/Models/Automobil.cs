using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Automobil
    {
        public Vozac VozacAuta { get; set; }
        public int GodisteAuta { get; set; }
        public string RegistarskaOznaka { get; set; }
        public int BrojVozila { get; set; }
        public string TipAuta { get; set; }

       
    }
}