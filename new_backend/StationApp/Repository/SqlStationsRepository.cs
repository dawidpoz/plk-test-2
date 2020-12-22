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

        public IEnumerable<StationAndTemperatureJoined> GetTemperatures()
        {
            //var _query = _context.StationTemperature.Include(a => a.Station).ToList();
            var _query = (from station in _context.Stations
                            join stationtemperature in _context.StationTemperature on station.StationId equals stationtemperature.StationId
                            select new { StationName = station.Name, Temperature = stationtemperature.Temperature});

            var array = new List<StationAndTemperatureJoined>();

            StationAndTemperatureJoined x;

            foreach(var c in _query){
                x = new StationAndTemperatureJoined{ Name = c.StationName, Temperature = c.Temperature };
                array.Add(x);
            }

            return array;
        }

        public void CreateTemperature(StationTemperature st)
        {
            if(st == null)
            {
                throw new ArgumentNullException(nameof(st));
            }

            _context.StationTemperature.Add(st);
        }

        public StationTemperature GetTemperatureById(int id)
        {
            return _context.StationTemperature.FirstOrDefault(p => p.TemperatureId == id);
        }
    }
}