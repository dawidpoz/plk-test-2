using Microsoft.EntityFrameworkCore;
using StationApp.Models;

namespace StationApp.Context
{
    public class StationsContext : DbContext
    {
        public StationsContext(DbContextOptions<StationsContext> opt) : base(opt)
        {
            
        }

        public DbSet<Station> Stations { get; set; }
    }
}