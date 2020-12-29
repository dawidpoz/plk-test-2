using System.ComponentModel.DataAnnotations;

namespace StationApp.Models
{
    public class Pomiary
    {
        [Key]
        public int Count{set; get;}
        public double Avg{set; get;}
        public double Max{set; get;}
        public double Min{set; get;}
    }
}