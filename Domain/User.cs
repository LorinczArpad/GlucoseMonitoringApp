using Domain.Common;
using Domain.Common.Enums;
using Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PasswordHash { get; set; }
        public UserType UserType { get; set; }
        public DateTime LastLogin { get; set; }


        public UserDTO MapToDTO()
        {
            return new UserDTO
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
        public UserDTO MapToDTOWithoutHash()
        {
            return new UserDTO
            {
                Id = Id,
                Name = Name,
                Email = Email,
                Phone = Phone,
                PasswordHash = "",
                UserType = UserType,
                LastLogin = LastLogin,
            };
        }
    }
}
