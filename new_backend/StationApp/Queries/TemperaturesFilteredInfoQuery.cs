using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Queries
{
    public class TemperaturesFilteredInfoQuery : ITemperaturesFilteredInfoQuery
    {
        private IStationRepository _repository;
        public TemperaturesFilteredInfoQuery(IStationRepository repository){
            _repository = repository;
        }
        public async Task<IEnumerable<Pomiary>> Query(string dateStart, string dateEnd, string stationName)
        {
            return (List<Pomiary>) await _repository.GetTemperaturesInfo(stationName, dateStart, dateEnd);
        }
    }
}