using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  
    public class LoginController : ApiController
    {
        Korisnik k = new Korisnik();
        Admini a = new Admini();

       
       
       
        [HttpPost]
        
        public string Post2([FromBody]Korisnik jToken)
        {
            k.iscitaj();
            a.iscitaj();
            string korisnik="";
            bool uspesno = false;
            /*var imeKor = jToken.Value<string>("korImeL");
            var pasKor = jToken.Value<string>("korPasL");*/
            var imeKor = jToken.Ime;
            var pasKor = jToken.Lozinka;

            var response= Request.CreateResponse(HttpStatusCode.NotModified);

            foreach (Korisnik k in k.listaKorisnika) {
                if (imeKor == k.Ime)
                {
                    if (pasKor == k.Lozinka)
                    {
                        response = Request.CreateResponse(HttpStatusCode.Moved);
                        response.Headers.Location = new Uri("http://localhost:10482/Nalog.html");

                        uspesno = true;
                        korisnik = k.Lozinka;
                        break;
                    }
                }
               
              }

            if (!uspesno)
            {
                foreach (Admini a in a.listaAdmina)
                {
                    if (imeKor == a.Ime)
                    {
                        if (pasKor == a.Lozinka)
                        {
                            response = Request.CreateResponse(HttpStatusCode.Moved);
                            response.Headers.Location = new Uri("http://localhost:10482/NalogAdmin.html");
                            
                            uspesno = true;
                            korisnik = a.Lozinka;
                            break;

                        }
                    }
                    else {

                        response = Request.CreateResponse(HttpStatusCode.Created);
                        response = Request.CreateResponse(HttpStatusCode.BadRequest, "User not registred");
                    
                }

                }

            }


            return korisnik;

        }

        public bool PretragaAdminTxt(string ime,string pas) {

            bool uspesno = false;
            string putanjaAdmin = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Admin.txt";

                using (StreamReader sr2 = File.OpenText(putanjaAdmin))
                {
                    string[] lines2 = File.ReadAllLines(putanjaAdmin);
                    for (int x = 0; x < lines2.Length - 1; x++)
                    {
                        if (ime == lines2[x])
                        {
                            if (pas == lines2[x + 1])
                            {
                                sr2.Close();

                            uspesno = true;
                            break;
                            
                            }

                        }



                    }
                }

            return uspesno;
        }

            
    }
}
