using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StationApp.Models;

namespace StationApp.Queries
{
    public interface ITemperaturesFilteredQuery
    {
        Task<IEnumerable<StationAndTemperatureJoined>> Query(string x1, string x2, string x3);
    }
}