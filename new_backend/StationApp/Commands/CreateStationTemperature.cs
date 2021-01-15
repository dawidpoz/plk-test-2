using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Commands
{
    public class CreateStationTemperature : ICreateStationTemperature
    {
        private IStationRepository _repository;
        public CreateStationTemperature(IStationRepository repository){
            _repository = repository;
        }
        public async Task Execute(StationTemperature stationTemperatureModel)
        {
            await _repository.CreateTemperature(stationTemperatureModel);
            await _repository.SaveChanges();
        }
    }
}