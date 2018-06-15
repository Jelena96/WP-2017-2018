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

        /*[HttpPost]
         public HttpResponseMessage Post([FromBody]JToken jToken)
         {
            var imeKor = jToken.Value<string>("korImeL");
            var pasKor = jToken.Value<string>("korPasL");
            HttpResponseMessage response= Request.CreateResponse(HttpStatusCode.NotModified);
            bool isMatch = false;

            if (Post2(jToken))
            {
                response = Request.CreateResponse(HttpStatusCode.Moved);
                response.Headers.Location = new Uri("http://localhost:10482/NalogAdmin.html");
                isMatch = true;

            }



            if (!isMatch)
            {


                if (!PretragaAdminTxt(imeKor, pasKor))
                {
                    response = Request.CreateResponse(HttpStatusCode.BadRequest, "User not registred");
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.Moved);
                    response.Headers.Location = new Uri("http://localhost:10482/NalogAdmin.html");


                }

            }

             return response;

                 }*/


       
       
        [HttpPost]
        public HttpResponseMessage Post2([FromBody]Korisnik jToken)
        {
            k.iscitaj();
            a.iscitaj();
            bool uspesno = false;
           /* var imeKor = jToken.Value<string>("korImeL");
            var pasKor = jToken.Value<string>("korPasL");*/

            var response= Request.CreateResponse(HttpStatusCode.NotModified);

            foreach (Korisnik k in k.listaKorisnika) {
                if (jToken.Ime == k.Ime)
                {
                    if (jToken.Lozinka == k.Lozinka)
                    {
                        response = Request.CreateResponse(HttpStatusCode.Moved);
                        response.Headers.Location = new Uri("http://localhost:10482/Nalog.html");

                        uspesno = true;
                        break;
                    }
                }
               
              }

            if (!uspesno)
            {
                foreach (Admini a in a.listaAdmina)
                {
                    if (jToken.Ime == a.Ime)
                    {
                        if (jToken.Lozinka == a.Lozinka)
                        {
                            response = Request.CreateResponse(HttpStatusCode.Moved);
                            response.Headers.Location = new Uri("http://localhost:10482/NalogAdmin.html");

                            uspesno = true;
                            break;
                        }
                    }
                    else {

                        response = Request.CreateResponse(HttpStatusCode.Created);
                        response = Request.CreateResponse(HttpStatusCode.BadRequest, "User not registred");
                    
                }

                }

            }


            return response;

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
                            else
                            {

                            

                            }


                        }



                    }
                }

            return uspesno;
        }

            
    }
}
