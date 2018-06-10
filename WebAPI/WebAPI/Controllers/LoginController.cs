using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                    if (imeKor == lines[x] && pasKor == lines[x])
                    {
                       
                        sr.Close();
                        result = "Vec postoji";
                        isMatch = true;
                    }
                }

            }

            if (isMatch)
            {
                Get();

            }
            else {

                Get();
            }
            return result;
            
        }

        public HttpResponseMessage Get()
        {
            var response = Request.CreateResponse(HttpStatusCode.Moved);
            response.Headers.Location = new Uri("http://localhost:10482/Nalog.html");
            return response;
        }

    }
}
