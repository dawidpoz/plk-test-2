using System.Threading.Tasks;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Queries
{
    public class GetStationByIdQuery : IGetStationByIdQuery
    {
        private IStationRepository _repository;
        public GetStationByIdQuery(IStationRepository repository){
            _repository = repository;
        }
        public async Task<Station> Query(int id)
        {
            return await _repository.GetStationById(id);
        }
    }
}