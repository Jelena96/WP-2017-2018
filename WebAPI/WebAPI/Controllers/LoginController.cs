using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpPost]
        public string Post([FromBody]JToken jToken)
        {
            var response = "" ;
            string result = "";
            var imeKor = jToken.Value<string>("korIme");
            var pasKor = jToken.Value<string>("korPas");

            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            bool isMatch = false;


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
                            isMatch = true;
                            Index();
                            result = "Vec postoji";
                            
                        }
                        else
                        {

                            result = "Nije to ta lozinka";

                        }

                    }
                   
                }

            }

          
            return result;
            
        }

        [HttpGet]
        [ActionName("Index")]
        public HttpResponseMessage Index()
        {
            var path = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\WebAPI\Nalog.html";
            var response = new HttpResponseMessage();
            response.Content = new StringContent(File.ReadAllText(path));
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            return response;
        }

    }
}
