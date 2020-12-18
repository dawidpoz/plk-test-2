using System.Collections.Generic;
using StationApp.Models;

namespace StationApp.Repository
{
    public interface IStationRepository
    {
        IEnumerable<Station> GetAppStations();
        Station GetStationById(int id);
    }
}