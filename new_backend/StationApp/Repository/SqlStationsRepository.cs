using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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

        public void CreateStation(Station st)
        {
            if(st == null)
            {
                throw new ArgumentNullException(nameof(st));
            }

            _context.Stations.Add(st);
        }

        public IEnumerable<Station> GetAllStations()
        {
            return _context.Stations.ToList();
        }

        public Station GetStationById(int id)
        {
            return _context.Stations.FirstOrDefault(p => p.StationId == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public List<string> GetTemperatures()
        {
            //var _query = _context.StationTemperature.Include(a => a.Station).ToList();
            var _query = (from station in _context.Stations
                            join stationtemperature in _context.StationTemperature on station.StationId equals stationtemperature.StationId
                            select new { StationName = station.Name});
            
            var array = new List<string>{};

            foreach(var c in _query){
                array.Add(c.StationName);
            }

            return array;
        }
    }
}