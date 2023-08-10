using System.ComponentModel.DataAnnotations;

namespace ReactAspCrud.Models
{

    public class Customer
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }

        public string emailAddress { get; set; }
    }
}
