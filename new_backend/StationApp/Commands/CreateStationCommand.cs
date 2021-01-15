using System.Threading.Tasks;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Commands
{
    public class CreateStationCommand : ICreateStationCommand
    {
        private IStationRepository _repository;
        public CreateStationCommand(IStationRepository repository){
            _repository = repository;
        }
        public async Task Execute(Station x)
        {
            await _repository.CreateStation(x);
            await _repository.SaveChanges();
        }
    }
}