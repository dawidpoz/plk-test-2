using System.Collections.Generic;
using StationApp.Models;

namespace StationApp.Repository
{
    public class MockStationRepository : IStationRepository
    {
        public IEnumerable<Station> GetAllStations(){
            var stations = new List<Station>
            {
                new Station{ Id = 0, Name = "testName1", City = "testCity1" },
                new Station{ Id = 1, Name = "testName2", City = "testCity2" },
                new Station{ Id = 2, Name = "testName3", City = "testCity3" }
            };

            return stations;
        }

        public Station GetStationById(int id)
        {
            return new Station{ Id = 0, Name = "testName", City = "testCity" };
        }
    }
}