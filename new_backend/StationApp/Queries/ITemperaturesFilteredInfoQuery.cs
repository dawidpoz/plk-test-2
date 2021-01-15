using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StationApp.Models;

namespace StationApp.Queries
{
    public interface ITemperaturesFilteredInfoQuery
    {
        Task<IEnumerable<Pomiary>> Query(string dateStart, string dateEnd, string stationName);
    }
}