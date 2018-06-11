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
      

        
        public string Post([FromBody]JToken jToken) {

            string result = "";

            var imeKor = jToken.Value<string>("korIme");
            var pasKor = jToken.Value<string>("korPas");
            var prezKor = jToken.Value<string>("korPrez");

            //Musterija m = new Musterija();
            //m.Ime = imeKor;
            string putanja = @"C:\Users\Jelena\Documents\GitHub\WP-2017-2018\WebAPI\Baza\Baza.txt";
            bool isMatch = false;

           
            using (StreamReader sr = File.OpenText(putanja))
            {
                string[] lines = File.ReadAllLines(putanja);
                for (int x = 0; x < lines.Length - 1; x++)
                {
                     if(imeKor == lines[x] && pasKor == lines[x])
                    {
                        sr.Close();
                        result = "Vec postoji";
                        isMatch = true;
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


                    }
                }
                else {

                    using (System.IO.StreamWriter file =  new System.IO.StreamWriter(putanja, true))
                    {
                        file.WriteLine(imeKor);
                        file.WriteLine(pasKor);
                        file.WriteLine(pasKor);
                        result = "Dodat";
                    }

                }
               
            }

            return result;
        }
    }
}
