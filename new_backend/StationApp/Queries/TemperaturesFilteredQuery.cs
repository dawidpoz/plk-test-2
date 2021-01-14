using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Queries
{
    public class TemperaturesFilteredQuery : ITemperaturesFilteredQuery
    {
        private SqlStationsRepository _repository;
        public TemperaturesFilteredQuery(SqlStationsRepository repository){
            _repository = repository;
        }

        public async Task<IEnumerable<StationAndTemperatureJoined>> Query(DateTime dateStart, DateTime dateEnd, string stationName){
            return await _repository.GetTemperaturesFiltered(dateStart, dateEnd, stationName);
        }

    }
}