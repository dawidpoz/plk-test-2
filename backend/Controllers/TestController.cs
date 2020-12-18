using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestApi.Models;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Station> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Station
            {
                Name = "a",
                City = "a"
            })
            .ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id){
            return id.ToString();
        }
    }
}
