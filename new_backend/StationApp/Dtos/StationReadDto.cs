using System.ComponentModel.DataAnnotations;

namespace StationApp.Dtos{
    public class StationReadDto
    {
        [Key]
        public int StationId {set; get;}
        
        [Required]
        [MaxLength(120)]
        public string Name {set; get;}

        [Required]
        [MaxLength(120)]
        public string City {set; get;}
    }
}