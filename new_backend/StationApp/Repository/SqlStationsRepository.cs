using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using StationApp.Context;
using StationApp.Models;
using System.Threading.Tasks;

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

        public async Task<IEnumerable<Station>> GetAllStations()
        {
            await Task.Delay(60);
            return _context.Stations.ToList();
        }

        public async Task<Station> GetStationById(int id)
        {
            await Task.Delay(60);
            return _context.Stations.FirstOrDefault(p => p.StationId == id);
        }

        public async Task<bool> SaveChanges()
        {
            await Task.Delay(60);
            return (_context.SaveChanges() >= 0);
        }

        public async Task<IEnumerable<StationAndTemperatureJoined>> GetTemperatures()
        {
            await Task.Delay(60);
            //var _query = _context.StationTemperature.Include(a => a.Station).ToList();
            var _query = (from station in _context.Stations
                            join stationtemperature in _context.StationTemperature on station.StationId equals stationtemperature.StationId
                            orderby stationtemperature.Time, station.Name, stationtemperature.Temperature
                            select new { StationName = station.Name, Temperature = stationtemperature.Temperature, Date = stationtemperature.Date, Time = stationtemperature.Time});

            var array = new List<StationAndTemperatureJoined>();

            StationAndTemperatureJoined x;

            foreach(var c in _query){
                x = new StationAndTemperatureJoined{ Name = c.StationName, Temperature = c.Temperature, Date = c.Date, Time = c.Time };
                array.Add(x);
            }

            return array;
        }

        public async Task<IEnumerable<StationAndTemperatureJoined>> GetTemperaturesFiltered(DateTime dateStart, DateTime dateEnd, string stationName)
        {
            await Task.Delay(60);
            var _query = (from station in _context.Stations
                                join stationtemperature in _context.StationTemperature on station.StationId equals stationtemperature.StationId
                                where stationtemperature.Date >= dateStart && stationtemperature.Date <= dateEnd && station.Name == stationName
                                orderby stationtemperature.Time
                                select new { StationName = station.Name, Temperature = stationtemperature.Temperature, Date = stationtemperature.Date, Time = stationtemperature.Time});

            var array = new List<StationAndTemperatureJoined>();

            StationAndTemperatureJoined x;

            foreach(var c in _query){
                x = new StationAndTemperatureJoined{ Name = c.StationName, Temperature = c.Temperature, Date = c.Date, Time = c.Time*1000 };
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

        public async Task<StationTemperature> GetTemperatureById(int id)
        {
            await Task.Delay(60);
            return _context.StationTemperature.FirstOrDefault(p => p.TemperatureId == id);
        }

        public async Task<IEnumerable<Pomiary>> GetTemperaturesInfo(string name, string dateStart, string dateEnd)
        {
            // Console.Write(name);
            // Console.Write(dateStart);
            // Console.Write(dateEnd);
            await Task.Delay(60);
            return _context.Pomiary.FromSqlInterpolated($"EXEC PomiaryStoredProcedure @StationName = {name}, @StartDate = {dateStart}, @EndDate = {dateEnd}").ToList();
        }
    }
}