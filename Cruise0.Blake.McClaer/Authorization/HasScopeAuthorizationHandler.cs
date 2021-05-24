using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Cruise0.Blake.McClaer.Authorization.HasCruiseScopeRequirement;

namespace Cruise0.Blake.McClaer.Authorization
{
    public class HasScopeAuthorizationHandler : AuthorizationHandler<HasCruiseScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasCruiseScopeRequirement requirement)
        {
            // If user does not have the scope claim, get out of here
            if (!context.User.HasClaim(c => c.Type == "scope" && c.Issuer == requirement.Issuer))
            {
                return Task.CompletedTask;
            }

            // Split the scopes string into an array
            var scopes = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issuer).Value.Split(' ');

            // Succeed if the scope array contains the required scope
            if (scopes.Any(s => s == requirement.Scope))
            {
                context.Succeed(requirement);
            }


            return Task.CompletedTask;
        }
    }
}
