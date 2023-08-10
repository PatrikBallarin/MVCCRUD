using Microsoft.EntityFrameworkCore;

namespace ReactAspCrud.Models
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source =.; initial Catalog=MyDb; User Id=sa; password=123; TrustServerCertificate= True");
        }
    }
}
