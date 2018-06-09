using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public abstract class Korisnik
    {
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Jmbg { get; set; }
        public string Email { get; set; }
        public Pol PolKorisnika { get; set; }
        public Uloga UlogaKorisnika { get; set; }
    }
}