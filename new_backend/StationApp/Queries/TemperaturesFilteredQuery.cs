using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using StationApp.Models;
using StationApp.Repository;

namespace StationApp.Queries
{
    public class TemperaturesFilteredQuery : ITemperaturesFilteredQuery
    {
        private IStationRepository _repository;
        public TemperaturesFilteredQuery(IStationRepository repository){
            _repository = repository;
        }

        public async Task<IEnumerable<StationAndTemperatureJoined>> Query(string dateStart, string dateEnd, string stationName){
            var cultureInfo = new CultureInfo("pl-PL");

            var dateS = DateTime.Parse(dateStart, cultureInfo);
            var dateE = DateTime.Parse(dateEnd, cultureInfo);

            return await _repository.GetTemperaturesFiltered(dateS, dateE, stationName);
        }

    }
}