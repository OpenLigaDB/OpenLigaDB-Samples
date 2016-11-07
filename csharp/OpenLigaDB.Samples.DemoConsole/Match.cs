using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpenLigaDB.Samples.DemoConsole
{
    public class Match
    {
        public int MatchID { get; set; }
        public DateTime MatchDateTime { get; set; }

        public Team Team1 { get; set; }
        public Team Team2 { get; set; }
    }
}
