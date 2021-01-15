using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Commands
{
    public class CreateStationTemperatureCommand : ICreateStationTemperatureCommand
    {
        private IStationRepository _repository;
        public CreateStationTemperatureCommand(IStationRepository repository){
            _repository = repository;
        }
        public async Task Execute(StationTemperature stationTemperatureModel)
        {
            await _repository.CreateTemperature(stationTemperatureModel);
            await _repository.SaveChanges();
        }
    }
}