using System;
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
        IEnumerable<StationAndTemperatureJoined> GetTemperatures();
        IEnumerable<StationAndTemperatureJoined> GetTemperaturesFiltered(DateTime dateStart, DateTime dateEnd);
        void CreateTemperature(StationTemperature st);
        StationTemperature GetTemperatureById(int id);
    }
}