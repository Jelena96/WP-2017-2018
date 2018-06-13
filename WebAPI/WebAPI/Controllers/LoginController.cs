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
        [HttpPost]
        public HttpResponseMessage Post([FromBody]JToken jToken)
        {
            
            string result = "";
            var imeKor = jToken.Value<string>("korImeL");
            var pasKor = jToken.Value<string>("korPasL");

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            bool isMatch = false;
            var response = Request.CreateResponse(HttpStatusCode.NotModified);

            //if (imeKor!=null && pasKor!="")
            //{
                using (StreamReader sr = File.OpenText(putanja))
                {
                    string[] lines = File.ReadAllLines(putanja);
                    for (int x = 0; x < lines.Length - 1; x++)
                    {
                        if (imeKor == lines[x])
                        {
                            if (pasKor == lines[x + 1])
                            {
                                sr.Close();
                                Musterija m = new Musterija();
                                m.Ime = imeKor;
                                m.Lozinka = pasKor;
                                response = Request.CreateResponse(HttpStatusCode.Created, m);
                                response.Headers.Location = new Uri(Request.RequestUri + m.Ime);
                                isMatch = true;
                                response = Request.CreateResponse(HttpStatusCode.Moved);
                                response.Headers.Location = new Uri("http://localhost:10482/Nalog.html");

                            }
                            else
                            {

                                result = "Nije to ta lozinka";

                            }

                        }
                        else
                        {
                        response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User not exist");

                       
                    }


                }

                }

            //}
            return response;
            
        }

      

    }
}
