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
            client.BaseAddress = new Uri("https://www.openligadb.de/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            do
            {
                try
                {
                    var matches = await GetMatchesAsync("api/getmatchdata/bl1/2016/11");

                    foreach (var match in matches)
                    {
                        Console.WriteLine(string.Concat(match.MatchDateTime, ": ", match.Team1.TeamName, " : ", match.Team2.TeamName));
                    }

                    System.Threading.Thread.Sleep(5000);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    System.Threading.Thread.Sleep(5000);

                }

            } while (true);


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
