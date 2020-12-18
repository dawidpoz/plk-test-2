using System.Collections.Generic;
using StationApp.Models;

namespace StationApp.Repository
{
    public interface IStationRepository
    {
        IEnumerable<Station> GetAllStations();
        Station GetStationById(int id);
    }
}