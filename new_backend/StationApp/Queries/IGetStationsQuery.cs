using System.Collections.Generic;
using System.Threading.Tasks;
using StationApp.Dtos;
using StationApp.Models;

namespace StationApp.Queries
{
    public interface IGetStationsQuery
    {
        Task<IEnumerable<Station>> Query();
    }
}