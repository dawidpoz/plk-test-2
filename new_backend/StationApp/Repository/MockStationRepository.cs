using System;
using System.Collections.Generic;
using StationApp.Models;

namespace StationApp.Repository
{
    public class MockStationRepository : IStationRepository
    {
        public void CreateStation(Station st)
        {
            throw new System.NotImplementedException();
        }

        public void CreateTemperature(StationTemperature st)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Station> GetAllStations(){
            var stations = new List<Station>
            {
                new Station{ StationId = 0, Name = "testName1", City = "testCity1" },
                new Station{ StationId = 1, Name = "testName2", City = "testCity2" },
                new Station{ StationId = 2, Name = "testName3", City = "testCity3" }
            };

            return stations;
        }

        public Station GetStationById(int id)
        {
            return new Station{ StationId = 0, Name = "testName", City = "testCity" };
        }

        public StationTemperature GetTemperatureById(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<StationAndTemperatureJoined> GetTemperatures()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<StationAndTemperatureJoined> GetTemperaturesFiltered(DateTime dateStart, DateTime dateEnd)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<StationAndTemperatureJoined> GetTemperaturesFiltered(DateTime dateStart, DateTime dateEnd, string stationName)
        {
            throw new NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new System.NotImplementedException();
        }
    }
}