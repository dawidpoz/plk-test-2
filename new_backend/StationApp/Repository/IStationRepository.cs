using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StationApp.Models;

namespace StationApp.Repository
{
    public interface IStationRepository
    {
        Task<bool> SaveChanges();

        Task<IEnumerable<Station>> GetAllStations();
        Task<Station> GetStationById(int id);
        void CreateStation(Station st);
        Task<IEnumerable<StationAndTemperatureJoined>> GetTemperatures();
        Task<IEnumerable<Pomiary>> GetTemperaturesInfo(string name, string dateStart, string dateEnd);
        Task<IEnumerable<StationAndTemperatureJoined>> GetTemperaturesFiltered(DateTime dateStart, DateTime dateEnd, string stationName);
        void CreateTemperature(StationTemperature st);
        Task<StationTemperature> GetTemperatureById(int id);
    }
}