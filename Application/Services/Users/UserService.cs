using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Users
{
    using Domain.DTOs;

    using Infrastructure;
  
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;

    namespace Application.User.Services
    {
        public class UserService : IUserService
        {
            private readonly GlucoseContext _dbContext;
            public UserService(GlucoseContext ctx)
            {
                this._dbContext = ctx;
            }

            public async Task AddUser(UserDTO user)
            {
                user.PasswordHash = this.HashPassword(user.PasswordHash);
                user.LastLogin = new DateTime(1970, 1, 1);
                await _dbContext.AddAsync<Domain.User>(user.MapToEntity());
                _dbContext.SaveChanges();
            }

            public async Task DeleteUser(int userId)
            {
                var item = await _dbContext.Users.Where(x => x.Id == userId).FirstAsync();
                item.Deleted = true;
                _dbContext.Update<Domain.User>(item);
                _dbContext.SaveChanges();
            }

            public async Task<UserDTO> GetUserById(int userId)
            {
                var user = await _dbContext.Users.FindAsync(userId);
                return user.MapToDTO();
            }

            public async Task<IEnumerable<UserDTO>> GetAllUser()
            {
                var users = await _dbContext.Users.ToListAsync();
                return users.Select(x => x.MapToDTOWithoutHash());
            }

            public async Task<UserDTO> AuthenticateUser(string email, string password)
            {
                //if(email == "string")
                //{
                //    return (await _dbContext.Users.Where(x => x.Email == email).FirstOrDefaultAsync()).MapToDTO();
                //}
                var user = await _dbContext.Users.Where(x => x.Email == email && HashPassword(password) == x.PasswordHash).FirstOrDefaultAsync();
                if (user == null)
                    return null;
                return user.MapToDTO();
            }

            public async Task<bool> UpdateUser(UserDTO user)
            {
                var userEntity = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == user.Id);
                if (userEntity != null)
                {
                    if (userEntity.PasswordHash != "")
                    {
                        userEntity.PasswordHash = this.HashPassword(user.PasswordHash);
                    }

                    userEntity.Name = user.Name;
                    userEntity.Email = user.Email;
                    userEntity.Phone = user.Phone;
                    userEntity.UserType = user.UserType;

                    _dbContext.Users.Update(userEntity);
                    return await _dbContext.SaveChangesAsync() > 0;
                }
                return false;
            }


            public string HashPassword(string password)
            {
                var Password = password;
                using (var sha256 = SHA256.Create())
                {
                    var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(Password));
                    return Convert.ToBase64String(hashBytes);
                }
            }
        }
    }
}
