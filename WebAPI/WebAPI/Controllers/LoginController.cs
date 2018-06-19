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
  [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        Korisnik k = new Korisnik();
        Admini a = new Admini();
        Vozac v = new Vozac();




        [Route("Login")]
        public Korisnik Login([FromBody]Korisnik jToken)
        {
            k.iscitaj();
            a.iscitaj();
            string korisnik="";
            bool uspesno = false;
           /* var imeKor = jToken.Value<string>("korImeL");
            var pasKor = jToken.Value<string>("korPasL");*/
            Korisnik kor = new Korisnik();
            //kor = null;
            var imeKor = jToken.Ime;
            var pasKor = jToken.Lozinka;

            var response= Request.CreateResponse(HttpStatusCode.NotModified);

            foreach (Korisnik k in k.listaKorisnika) {
                if (imeKor == k.Ime)
                {
                    if (pasKor == k.Lozinka)
                    {
                        //response = Request.CreateResponse(HttpStatusCode.Moved);
                        //response.Headers.Location = new Uri("http://localhost:10482/Nalog.html");
                        kor = k;
                        uspesno = true;
                        korisnik = k.Ime;
                        break;
                    }
                    else
                    {

                        kor = null;
                    }
                }
                else {

                    kor = null;
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
                            kor = a;
                            // response = Request.CreateResponse(HttpStatusCode.Moved);
                            //response.Headers.Location = new Uri("http://localhost:10482/NalogAdmin.html");

                            uspesno = true;
                            korisnik = a.Ime;
                            break;

                        }
                        else
                        {

                            kor = null;
                        }
                    }
                    else
                    {

                        kor = null;

                    }

                }
            }

                v.iscitaj2();
                if (!uspesno)
                {
                    foreach (Vozac a in v.vozaci)
                    {
                        if (imeKor == a.Ime)
                        {
                            if (pasKor == a.Lozinka)
                            {
                                kor = a;
                                // response = Request.CreateResponse(HttpStatusCode.Moved);
                                //response.Headers.Location = new Uri("http://localhost:10482/NalogAdmin.html");

                                uspesno = true;
                                korisnik = a.Ime;
                                break;

                            }
                            else
                            {

                                kor = null;
                            }
                        }
                        else
                        {

                            kor = null;

                        }

                    }

                }


            return kor;

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
