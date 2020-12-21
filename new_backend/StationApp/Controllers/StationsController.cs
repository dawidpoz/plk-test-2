using System.Collections.Generic;
using StationApp.Models;
using Microsoft.AspNetCore.Mvc;
using StationApp.Repository;
using AutoMapper;
using StationApp.Dtos;

namespace StationApp.Controllers
{
        [Route("api/stations")]
        [ApiController]
        public class StationsController : ControllerBase
        {
                private IStationRepository _repository;
                private IMapper _mapper;

                public StationsController(IStationRepository repository, IMapper mapper)
                {
                        _repository = repository;
                        _mapper = mapper;
                }

                // GET api/stations
                [HttpGet]
                public ActionResult <IEnumerable<StationReadDto>> GetAllStations()
                {
                        var stationItems = _repository.GetAllStations();
                        return Ok(_mapper.Map<IEnumerable<StationReadDto>>(stationItems));
                }

                // GET api/stations/{id}
                [HttpGet("{id}", Name="GetStationById")]
                public ActionResult <StationReadDto> GetStationById(int id)
                {
                        var stationItem = _repository.GetStationById(id);
                        if(stationItem != null)
                        {
                                return Ok(_mapper.Map<StationReadDto>(stationItem));
                        }
                        return NotFound();
                }

                // GET api/stations/joined
                [HttpGet("joined")]
                public ActionResult <string> GetTemperatures(){
                        return Ok(_repository.GetTemperatures());
                }

                // POST api/stations
                [HttpPost]
                public ActionResult <StationReadDto> CreateStation(StationCreateDto stationCreateDto)
                {
                        var stationModel = _mapper.Map<Station>(stationCreateDto);
                        _repository.CreateStation(stationModel);
                        _repository.SaveChanges();

                        var stationReadDto = _mapper.Map<StationReadDto>(stationModel);

                        return CreatedAtRoute(nameof(GetStationById), new {Id = stationReadDto.Id}, stationReadDto);
                        //return Ok(stationReadDto);
                }

        }
}