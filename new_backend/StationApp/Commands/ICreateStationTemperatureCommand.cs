using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StationApp.Models;

namespace StationApp.Commands
{
    public interface ICreateStationTemperatureCommand
    {
        Task Execute(StationTemperature x);
    }
}