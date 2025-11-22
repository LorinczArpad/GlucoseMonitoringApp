using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Patient : BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string MothersName { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public string InsulinPump { get; set; } = string.Empty;
        public string CgmSensor { get; set; } = string.Empty;
        public int BodyWeight { get; set; }
        public string SocketUrl { get; set; } = string.Empty;
        public int DoctorId { get; set; }
    }
}
