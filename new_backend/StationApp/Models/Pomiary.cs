using System.ComponentModel.DataAnnotations;

namespace StationApp.Models
{
    public class Pomiary
    {
        [Key]
        public float Count{set; get;}
        public float Avg{set; get;}
        public float Max{set; get;}
        public float Min{set; get;}
    }
}