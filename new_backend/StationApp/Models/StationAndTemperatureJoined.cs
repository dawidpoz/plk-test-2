using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace StationApp.Models
{
    public class StationAndTemperatureJoined
    {
        public string Name {set; get;}

        public float Temperature {set; get;}

        public long Time { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime Date{ set; get; }
    }
}