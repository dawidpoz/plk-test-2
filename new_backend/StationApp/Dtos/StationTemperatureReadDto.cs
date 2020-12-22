using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StationApp.Models;

namespace StationApp.Dtos
{
    public class StationTemperatureReadDto
    {
        [Key]
        public int TemperatureId { set; get; }
        
        public int Temperature{ set; get; }

        [DataType(DataType.Time)]
        public TimeSpan Time { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime Date{ set; get; }

        public int StationId{ set; get; }
        public Station Station{ set; get; }
    }
}