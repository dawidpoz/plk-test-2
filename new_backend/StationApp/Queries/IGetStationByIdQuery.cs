using System.Threading.Tasks;
using StationApp.Models;

namespace StationApp.Queries
{
    public interface IGetStationByIdQuery
    {
        Task<Station> Query(int id); 
    }
}