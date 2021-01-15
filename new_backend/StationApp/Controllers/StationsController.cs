using System.Runtime.Intrinsics.X86;
using System;
using System.Collections.Generic;
using StationApp.Models;
using Microsoft.AspNetCore.Mvc;
using StationApp.Repository;
using AutoMapper;
using StationApp.Dtos;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using StationApp.Queries;
using StationApp.Commands;

namespace StationApp.Controllers
{
        [Route("api/stations")]
        [ApiController]
        public class StationsController : ControllerBase
        {
                private IStationRepository _repository;
                private IMapper _mapper;
                private readonly UserManager<IdentityUser> _userManager;
                private readonly SignInManager<IdentityUser> _signInManager;
                public readonly ITemperaturesFilteredQuery _temperaturesFilteredQuery;
                public readonly ICreateStationTemperatureCommand _createStationTemperatureCommand;
                public readonly ICreateStationCommand _createStationCommand;
                public readonly ITemperaturesFilteredInfoQuery _temperaturesFilteredInfoQuery;
                public readonly IGetStationsQuery _getStationsQuery;
                public readonly IGetStationByIdQuery _getStationByIdQuery;

                public StationsController(IStationRepository repository,
                                          IMapper mapper,
                                          UserManager<IdentityUser> userManager,
                                          SignInManager<IdentityUser> signInManager,
                                          ITemperaturesFilteredQuery temperaturesFilteredQuery,
                                          ICreateStationTemperatureCommand createStationTemperatureCommand,
                                          ICreateStationCommand createStationCommand,
                                          ITemperaturesFilteredInfoQuery temperaturesFilteredInfoQuery,
                                          IGetStationsQuery getStationsQuery,
                                          IGetStationByIdQuery getStationByIdQuery
                                          )
                {
                        _repository = repository;
                        _mapper = mapper;
                        _userManager = userManager;
                        _signInManager = signInManager;
                        _temperaturesFilteredQuery = temperaturesFilteredQuery;
                        _createStationTemperatureCommand = createStationTemperatureCommand;
                        _createStationCommand = createStationCommand;
                        _temperaturesFilteredInfoQuery = temperaturesFilteredInfoQuery;
                        _getStationsQuery = getStationsQuery;
                        _getStationByIdQuery = getStationByIdQuery;
                }

                // GET api/stations
                [HttpGet]
                public async Task<ActionResult <IEnumerable<StationReadDto>>> GetAllStations()
                {
                        var stationItems = await _getStationsQuery.Query();
                        return Ok(_mapper.Map<IEnumerable<StationReadDto>>(stationItems));
                }

                // GET api/stations/{id}
                [HttpGet("{id}", Name="GetStationById")]
                public async Task<ActionResult <StationReadDto>> GetStationById(int id)
                {
                        //var stationItem = await _repository.GetStationById(id);
                        var stationItem = await _getStationByIdQuery.Query(id);
                        if(stationItem != null)
                        {
                                return Ok(_mapper.Map<StationReadDto>(stationItem));
                        }
                        return NotFound();
                }

                // GET api/stations/joined // nieużywane aktualnie - testowanie joina
                // [HttpGet("joined")]
                // public async Task<ActionResult <List<StationAndTemperatureJoined>>> GetTemperatures(){
                //         return Ok(await _repository.GetTemperatures());
                // }

                [HttpGet("joinedinfo/dateStart={dateStart}&dateEnd={dateEnd}&stationName={stationName}")]
                public async Task<ActionResult <List<Pomiary>>> GetTemperaturesInfo(string stationName, string dateStart, string dateEnd){
                        //return Ok(await _repository.GetTemperaturesInfo(stationName, dateStart, dateEnd));
                        return Ok(await _temperaturesFilteredInfoQuery.Query(dateStart, dateEnd, stationName));
                }

                // GET joinedfiltered/dateStart={dateStart}&dateEnd={dateEnd}&stationName={stationName}
                [HttpGet("joinedfiltered/dateStart={dateStart}&dateEnd={dateEnd}&stationName={stationName}")]
                public async Task<ActionResult <List<StationAndTemperatureJoined>>> GetTemperaturesFiltered(string dateStart, string dateEnd, string stationName){
                        return Ok(await _temperaturesFilteredQuery.Query(dateStart, dateEnd, stationName));
                        //return Ok(await _repository.GetTemperaturesFiltered(dateS, dateE, stationName)); stara wersja przed CQRS
                }

                // POST api/stations
                [HttpPost]
                public async Task<ActionResult <StationReadDto>> CreateStation(StationCreateDto stationCreateDto)
                {
                        var stationModel = _mapper.Map<Station>(stationCreateDto);

                        await _createStationCommand.Execute(stationModel);

                        var stationReadDto = _mapper.Map<StationReadDto>(stationModel);

                        return CreatedAtRoute(nameof(GetStationById), new {Id = stationReadDto.StationId}, stationReadDto);
                }

                // POST api/stations/temp
                [HttpPost("temp")]
                public async Task<ActionResult <StationTemperatureCreateDto>> CreateStationTemperature(StationTemperatureCreateDto stationTemperatureCreateDto)
                {
                        var stationTemperatureModel = _mapper.Map<StationTemperature>(stationTemperatureCreateDto);

                        long timeStamp = DateTimeOffset.Now.ToUnixTimeSeconds();

                        if(timeStamp < stationTemperatureModel.Time)
                        {
                                return BadRequest("Data z przyszłości");
                        }

                        else if(timeStamp - stationTemperatureModel.Time > 172800){
                                return BadRequest("Data starsza niż 2 dni");
                        }

                        await _createStationTemperatureCommand.Execute(stationTemperatureModel);

                        var stationTemperatureReadDto = _mapper.Map<StationTemperatureReadDto>(stationTemperatureModel);

                        return CreatedAtRoute(nameof(GetStationById), new {Id = stationTemperatureReadDto.TemperatureId}, stationTemperatureReadDto);
                }

                // USER AUTH

                [HttpPost("login")]
                public async Task<ActionResult<LoginInfoDto>> Login(LoginDto loginDto)
                {
                        var user = await _userManager.FindByNameAsync(loginDto.Login);

                        if(user != null){
                                var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);

                                if(result.Succeeded){
                                        var roles = await _userManager.GetRolesAsync(user);
                                        return new LoginInfoDto{Role = roles[0], Login = loginDto.Login};
                                }
                        }

                        return BadRequest("Nie udało się zalogować");
                }

                //[HttpPost("register")] wyłączone bo dwóch wystarczy
                public async Task<ActionResult<RegisterDto>> Register(RegisterDto registerDto)
                {
                        // Console.Write(registerDto.Login);
                        // Console.Write(registerDto.Password);

                        var user = new IdentityUser
                        {
                                UserName = registerDto.Login,
                                Email = "",
                        };

                        var result = await _userManager.CreateAsync(user, registerDto.Password);

                        if(result.Succeeded)
                        {
                                return Ok();
                        }

                        return BadRequest("Nie udało się zarejestrować");
                }

                public async Task<IActionResult> LogOut()
                {
                        await _signInManager.SignOutAsync();
                        return Ok();
                }

        }

}