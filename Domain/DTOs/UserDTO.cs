using Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }
        public UserType UserType { get; set; }
        public DateTime LastLogin { get; set; }

        public User MapToEntity()
        {
            if (Id > 0)
            {
                return new User
                {
                    Id = Id,
                    Name = Name,
                    Email = Email,
                    Phone = Phone,
                    PasswordHash = PasswordHash,
                    UserType = UserType,
                    LastLogin = LastLogin,
                };
            }
            else
            {
                return new User
                {
                    Name = Name,
                    Email = Email,
                    Phone = Phone,
                    PasswordHash = PasswordHash,
                    UserType = UserType,
                    LastLogin = LastLogin,
                };
            }

        }
    }
}
