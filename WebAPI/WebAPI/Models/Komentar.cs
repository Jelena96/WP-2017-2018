using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Komentar
    {
        public string Opis { get; set; }
        public DateTime VremeObjave { get; set; }
        public string KorisnikKomentar { get; set; }
        public int IdVoznje { get; set; }
        public int Ocena { get; set; }
    }
}