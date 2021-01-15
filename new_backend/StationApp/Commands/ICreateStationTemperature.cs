using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StationApp.Models;

namespace StationApp.Commands
{
    public interface ICreateStationTemperature
    {
        Task Execute(StationTemperature x);
    }
}