using AutoMapper;
using StationApp.Dtos;
using StationApp.Models;

namespace StationApp.Profiles
{
    public class StationProfile : Profile
    {
        public StationProfile()
        {
            CreateMap<Station, StationReadDto>();
            CreateMap<StationCreateDto, Station>();
            CreateMap<StationTemperature, JoinedStationAndTempReadDto>();
        }
    }
}