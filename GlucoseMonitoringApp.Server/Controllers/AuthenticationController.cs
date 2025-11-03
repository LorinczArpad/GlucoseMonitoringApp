using Application.Services.Users.Application.User.Services;
using GlucoseMonitoringApp.Server.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace GlucoseMonitoringApp.Server.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IUserService _userService;

        public AuthenticationController(IJwtAuthManager jwtAuthManager, IUserService userService)
        {
            _jwtAuthManager = jwtAuthManager;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<string> LoginAsync(string email, string password)
        {
            try
            {
                var user = await _userService.AuthenticateUser(email, password);
                if (user is not null)
                {
                    var token = _jwtAuthManager.GenerateToken(user);
                    return token;
                }
            }
            catch
            {
                return "Invalid username or password.";
            }
    

            return "Invalid username or password.";
        }

        [HttpPost("AuthRole")]
        public bool AuthRole(string token)
        {
            return _jwtAuthManager.IsUserSuperAdmin(token);
        }
    }
}
