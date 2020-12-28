using System;
using StationApp.Models;

namespace StationApp.Dtos
{
    public class StationTemperatureCreateDto
    {
        public int TemperatureId { set; get; }
        
        public float Temperature{ set; get; }

        public long Time { get; set; }
        public DateTime Date{ set; get; }

        public int StationId{ set; get; }
        public Station Station{ set; get; }
    }
}