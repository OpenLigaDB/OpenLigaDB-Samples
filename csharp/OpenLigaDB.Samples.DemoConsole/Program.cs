using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace OpenLigaDB.Samples.DemoConsole
{
    class Program
    {
        static HttpClient client = new HttpClient();
        static void Main()
        {
            RunAsync().Wait();
        }

        static async Task RunAsync()
        {
            client.BaseAddress = new Uri("http://www.openligadb.de/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var matches = await GetMatchesAsync("api/getmatchdata/bl1/2016/8");

            foreach (var match in matches)
            {
                Console.WriteLine(string.Concat(match.MatchDateTime,": ", match.Team1.TeamName," : ", match.Team2.TeamName));
            }


            Console.ReadLine();
        }

        static async Task<List<Match>> GetMatchesAsync(string path)
        {
            List<Match> matches = null;
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                matches = await response.Content.ReadAsAsync<List<Match>>();
            }
            return matches;
        }
    }
}
