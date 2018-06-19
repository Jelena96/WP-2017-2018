using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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

    }
}