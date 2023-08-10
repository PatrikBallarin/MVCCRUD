using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext _CustomerDbContext;


        public CustomerController(CustomerDbContext CustomerDbContext)
        {
            _CustomerDbContext = CustomerDbContext;
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _CustomerDbContext.Customer.ToListAsync();
        }

        [HttpPost]
        [Route("AddCustomer")]
        public async Task<Customer> AddCustomer(Customer objCustomer)
        {
            _CustomerDbContext.Customer.Add(objCustomer);
            await _CustomerDbContext.SaveChangesAsync();
            return objCustomer;
        }

        [HttpPatch]
        [Route("UpdateCustomer/{id}")]
        public async Task<Customer> UpdateCustomer(Customer objCustomer)
        {
            _CustomerDbContext.Entry(objCustomer).State = EntityState.Modified;
            await _CustomerDbContext.SaveChangesAsync();
            return objCustomer;
        }

        [HttpDelete]
        [Route("DeleteCustomer/{id}")]
        public bool DeleteCustomer(int id) 
        {
            bool a = false;
            var Customer = _CustomerDbContext.Customer.Find(id);
            if (Customer != null)
            {
                a = true;
                _CustomerDbContext.Entry(Customer).State = EntityState.Deleted;
                _CustomerDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }
    }
}
