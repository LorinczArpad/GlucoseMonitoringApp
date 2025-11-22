using Application.DTOs;

namespace GlucoseMonitoringApp.Server.Responses
{
    public class LoginResponse
    {
        public string Token {  get; set; }
        public UserDTO User { get; set; }
    }
}
