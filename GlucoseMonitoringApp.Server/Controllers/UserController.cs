using Application.DTOs;
using Application.Services.Users.Application.User.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlucoseMonitoringApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("AddUser")]
        //[Authorize(Roles = "Superadmin")]
        public async Task<IActionResult> AddUser(UserDTO user)
        {
            try
            {
                await _userService.AddUser(user);
                return Ok("User has been added");
            }
            catch
            {
                return BadRequest("User cant be added");
            }
        }

   
        [HttpGet("GetUserById")]
        [Authorize(Roles = "Superadmin,Coach")]
        public async Task<UserDTO> GetUserById(int userId)
        {
            return await _userService.GetUserById(userId);
        }

        [HttpGet("GetAllUser")]
        [Authorize(Roles = "Superadmin,Coach")]
        public async Task<IEnumerable<UserDTO>> GetAllUser()
        {
            return await _userService.GetAllUser();
        }

        [HttpDelete("DeleteUser")]
        [Authorize(Roles = "Superadmin")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            try
            {
                await _userService.DeleteUser(userId);
                return Ok("User has been deleted");
            }
            catch
            {
                return BadRequest("Cant  delete user");
            }
        }

        [HttpPut("UpdateUser")]
        [Authorize(Roles = "Superadmin")]
        public async Task<IActionResult> UpdateUser(UserDTO user)
        {
            try
            {
                if (await _userService.UpdateUser(user))
                {
                    return Ok("User has been successfully updated.");
                }
                else
                {
                    return BadRequest("User update returned false. Bad parameters or inexistent user.");
                }
            }
            catch
            {
                return BadRequest("Unexpected error during user update.");
            }

        }

    

  
    }
}
