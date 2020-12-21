using System.ComponentModel.DataAnnotations;

namespace StationApp.Dtos
{
    public class JoinedStationAndTempReadDto
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