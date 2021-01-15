using System.Collections.Generic;
using System.Threading.Tasks;
using StationApp.Dtos;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Queries
{
    public class GetStationsQuery : IGetStationsQuery
    {
        private IStationRepository _repository;
        public GetStationsQuery(IStationRepository repository){
            _repository = repository;
        }

        public async Task<IEnumerable<Station>> Query()
        {
            return await _repository.GetAllStations();
        }
    }
}