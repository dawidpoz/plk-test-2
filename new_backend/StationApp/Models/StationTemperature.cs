using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace StationApp.Models
{
    public class StationTemperature
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

// Zapytanie biorące Name z dbo.Stations i reszta rzeczy z dbo.StationTemperature po INNER JOINie

// SELECT dbo.Stations.Name, dbo.StationTemperature.Temperature, dbo.StationTemperature.Time, dbo.StationTemperature.Date FROM dbo.StationTemperature
// INNER JOIN dbo.Stations
// ON dbo.Stations.StationId = dbo.StationTemperature.StationId