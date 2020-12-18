using System.Collections.Generic;
using StationApp.Models;
using Microsoft.AspNetCore.Mvc;
using StationApp.Repository;

namespace StationApp.Controllers
{
        [Route("api/stations")]
        [ApiController]
        public class StationsController : ControllerBase
        {
                private IStationRepository _repository;

                public StationsController(IStationRepository repository)
                {
                        _repository = repository;
                }

                // GET api/stations
                [HttpGet]
                public ActionResult <IEnumerable<Station>> GetAllStations()
                {
                        var stationItems = _repository.GetAppStations();
                        return Ok(stationItems);
                }

                // GET api/stations/5
                [HttpGet("{id}")]
                public ActionResult <Station> GetStationById(int id)
                {
                        var stationItem = _repository.GetStationById(id);
                        return Ok(stationItem);
                }
        }
}