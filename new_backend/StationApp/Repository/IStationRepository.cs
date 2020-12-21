using System.Collections.Generic;
using StationApp.Models;

namespace StationApp.Repository
{
    public interface IStationRepository
    {
        bool SaveChanges();

        IEnumerable<Station> GetAllStations();
        Station GetStationById(int id);
        void CreateStation(Station st);
    }
}