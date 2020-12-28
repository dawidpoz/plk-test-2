using System;
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
                public ActionResult <List<(string, int)>> GetTemperatures(){
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

                public static DateTime UnixTimestampToDateTime(long unixTime)
                {
                        DateTime unixStart = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                        long unixTimeStampInTicks = (long) (unixTime * TimeSpan.TicksPerSecond);
                        return new DateTime(unixStart.Ticks + unixTimeStampInTicks, System.DateTimeKind.Utc);
                }

        }
}