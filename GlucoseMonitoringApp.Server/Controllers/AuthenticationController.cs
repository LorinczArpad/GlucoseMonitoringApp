using Application.Services.Users.Application.User.Services;
using Domain;
using GlucoseMonitoringApp.Server.Authentication;
using GlucoseMonitoringApp.Server.Responses;
using Microsoft.AspNetCore.Mvc;
using YamlDotNet.Core.Tokens;

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
        public async Task<LoginResponse> LoginAsync(string email, string password)
        {
            
            try
            {
                var user = await _userService.AuthenticateUser(email, password);
                
                if (user is not null)
                {
                    var token = _jwtAuthManager.GenerateToken(user);
                    return new LoginResponse
                    {
                        Token = token,
                        User = user
                    }
                    ;
                }
            }
            catch
            {
                return new LoginResponse
                {
                    Token = "Invalid username or password.",
                    User = null
                }
           ;
                ;
            }


            return new LoginResponse
            {
                Token = "Invalid username or password.",
                User = null
            }
      ;
        }

        [HttpPost("AuthRole")]
        public bool AuthRole(string token)
        {
            return _jwtAuthManager.IsUserSuperAdmin(token);
        }
    }
}
