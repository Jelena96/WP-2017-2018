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
    public class DispecerController : ApiController
    {
        Admini admini = new Admini();

        public void Dodaj()
        {
            string putanja= @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Admini.txt";
            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {
                    admini.KorisnickoIme = lines[x];
                    admini.Prezime = lines[x + 1];
                }

            }

        }

    }
}
