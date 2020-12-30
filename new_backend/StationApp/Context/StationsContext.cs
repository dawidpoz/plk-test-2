using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StationApp.Models;

namespace StationApp.Context
{
    public class StationsContext : IdentityDbContext
    {
        public StationsContext(DbContextOptions<StationsContext> opt) : base(opt)
        {
        }

        public DbSet<Station> Stations { get; set; }

        public DbSet<StationTemperature> StationTemperature { get; set; }

        public DbSet<Pomiary> Pomiary {get;set;}

    }
}