using System.Threading.Tasks;
using StationApp.Models;

namespace StationApp.Commands
{
    public interface ICreateStationCommand
    {
        Task Execute(Station x);
    }
}