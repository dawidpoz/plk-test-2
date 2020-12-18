using System.Collections.Generic;
using System.Linq;
using StationApp.Context;
using StationApp.Models;

namespace StationApp.Repository
{
    public class SqlStationsRepository : IStationRepository
    {
        private readonly StationsContext _context;
        public SqlStationsRepository(StationsContext context)
        {
            _context = context;
        }

        public IEnumerable<Station> GetAllStations()
        {
            return _context.Stations.ToList();
        }

        public Station GetStationById(int id)
        {
            return _context.Stations.FirstOrDefault(p => p.Id == id);
        }

    }
}