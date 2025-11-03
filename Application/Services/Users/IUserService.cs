using Domain.DTOs;

namespace Application.Services.Users.Application.User.Services
{
    public interface IUserService
    {
        Task AddUser(UserDTO user);
        Task<UserDTO> AuthenticateUser(string email, string password);
        Task DeleteUser(int userId);
        Task<IEnumerable<UserDTO>> GetAllUser();
        Task<UserDTO> GetUserById(int userId);
        string HashPassword(string password);
        Task<bool> UpdateUser(UserDTO user);
    }
}