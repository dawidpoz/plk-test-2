using System;
using System.Collections.Generic;
using StationApp.Models;
using Microsoft.AspNetCore.Mvc;
using StationApp.Repository;
using AutoMapper;
using StationApp.Dtos;
using System.Globalization;

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
                public ActionResult <List<StationAndTemperatureJoined>> GetTemperatures(){
                        return Ok(_repository.GetTemperatures());
                }

                // GET joinedfiltered/dateStart={dateStart}&dateEnd={dateEnd}&stationName={stationName}
                [HttpGet("joinedfiltered/dateStart={dateStart}&dateEnd={dateEnd}&stationName={stationName}")]
                public ActionResult <List<StationAndTemperatureJoined>> GetTemperaturesFiltered(string dateStart, string dateEnd, string stationName){
                        var cultureInfo = new CultureInfo("pl-PL");

                        Console.WriteLine(dateStart);
                        Console.WriteLine(dateEnd);
                        Console.WriteLine(stationName);

                        var dateS = DateTime.Parse(dateStart, cultureInfo);
                        var dateE = DateTime.Parse(dateEnd, cultureInfo);

                        return Ok(_repository.GetTemperaturesFiltered(dateS, dateE, stationName));
                }

                // POST api/stations
                [HttpPost]
                public ActionResult <StationReadDto> CreateStation(StationCreateDto stationCreateDto)
                {
                        var stationModel = _mapper.Map<Station>(stationCreateDto);
                        _repository.CreateStation(stationModel);
                        _repository.SaveChanges();

                        var stationReadDto = _mapper.Map<StationReadDto>(stationModel);

                        return CreatedAtRoute(nameof(GetStationById), new {Id = stationReadDto.StationId}, stationReadDto);
                        //return Ok(stationReadDto);
                }

                [HttpPost("temp")]
                public ActionResult <StationTemperatureCreateDto> CreateStationTemperature(StationTemperatureCreateDto stationTemperatureCreateDto)
                {
                        var stationTemperatureModel = _mapper.Map<StationTemperature>(stationTemperatureCreateDto);
                        //Console.WriteLine(stationTemperatureModel.Temperature);
                        //stationTemperatureModel.Temperature = stationTemperatureModel.Temperature + 1;
                        //stationTemperatureModel.Time = new TimeSpan(stationTemperatureModel.Time.Hours, stationTemperatureModel.Time.Minutes, stationTemperatureModel.Time.Seconds);
                        Console.WriteLine(stationTemperatureModel.Time);
                        //Console.WriteLine(new TimeSpan(1608624625781));
                        //Console.WriteLine(stationTemperatureModel.Hours + " " + stationTemperatureModel.Minutes + " " + stationTemperatureModel.Seconds);
                        //Console.WriteLine(UnixTimestampToDateTime(stationTemperatureModel.Time).Hour + ":" + UnixTimestampToDateTime(stationTemperatureModel.Time).Minute);


                        _repository.CreateTemperature(stationTemperatureModel);
                        _repository.SaveChanges();

                        var stationTemperatureReadDto = _mapper.Map<StationTemperatureReadDto>(stationTemperatureModel);

                        return CreatedAtRoute(nameof(GetStationById), new {Id = stationTemperatureReadDto.TemperatureId}, stationTemperatureReadDto);
                }

        }
}