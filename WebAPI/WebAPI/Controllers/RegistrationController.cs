using Newtonsoft.Json.Linq;
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
    [RoutePrefix("api/registration")]
    public class RegistrationController : ApiController
    {
      

        [HttpPost]
        public HttpResponseMessage Post([FromBody]JToken jToken) {

            string result = "";
           
            var imeKor = jToken.Value<string>("korIme");
            var pasKor = jToken.Value<string>("korPas");
            var prezKor = jToken.Value<string>("korPrez");
            Musterija m = new Musterija();
            m.Ime = imeKor;
            m.Lozinka = pasKor;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotModified) ;
            

            //Musterija m = new Musterija();
            //m.Ime = imeKor;
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            bool isMatch = false;

            
           
            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {
                     if(imeKor == lines[x])
                    {
                        sr.Close();
                        result = "Vec postoji";
                        isMatch = true;
                       // response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Korisnik vec postoji");
                        

                    }
                }

            }

            if (!isMatch)
            {
                if (!File.Exists(putanja))
                {
                    //ako ne postoji u fajlu ubaci datu musteriju
                    using (System.IO.StreamWriter file = new System.IO.StreamWriter(putanja))
                    {

                        file.WriteLine(imeKor);
                        file.WriteLine(pasKor);
                        file.WriteLine(prezKor);
                        result = "Dodat";
                        //response = Request.CreateResponse(HttpStatusCode.Created,m);
                         response = Request.CreateResponse(HttpStatusCode.Moved);
                        response.Headers.Location = new Uri("http://localhost:10482/Reg.html");


                    }
                }
                else {

                    using (System.IO.StreamWriter file =  new System.IO.StreamWriter(putanja, true))
                    {
                        
                        file.WriteLine(imeKor);
                        file.WriteLine(pasKor);
                        file.WriteLine(pasKor);
                        result = "Dodat";

                        //response = Request.CreateResponse(HttpStatusCode.Created, m);
                        response.Headers.Location = new Uri("http://localhost:10482/Reg.html");

                    }

                }
               
            }

            return response;
        }
    }
}
