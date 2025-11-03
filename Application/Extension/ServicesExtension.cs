using Application.Services.Users.Application.User.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Extension
{
    public static class ServicesExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
  
            services.AddTransient<IUserService, UserService>();
            
        }
    }
}
