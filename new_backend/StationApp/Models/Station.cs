using System.ComponentModel.DataAnnotations;

namespace StationApp.Models{
    public class Station
    {
        [Key]
        public int Id {set; get;}

        [Required]
        [MaxLength(120)]
        public string Name {set; get;}

        [Required]
        [MaxLength(120)]
        public string City {set; get;}
    }
}