using Cruise0.Blake.McClaer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cruise0.Blake.McClaer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        [HttpGet("")]
        [Authorize("read:offers")]
        public IActionResult GetMyOffers(int age, int daysSinceLastCruise)
        {
            IActionResult result         = null;
            CruiseOfferModel offer = null;

            if (age < 50)
            {
                if (daysSinceLastCruise < 150)
                {
                    offer = new CruiseOfferModel()
                    {
                        Title       = "Cheaper Carnival Cruise",
                        Vendor      = "Carinval Cruise Lines",
                        Price       = 100.50,
                        Description = "This is the cheaper option since you just been on a previous cruise.",
                        TotalDays   = 5
                    };
                }
                else
                {
                    offer = new CruiseOfferModel()
                    {
                        Title       = "Expensive Carnival Cruise",
                        Vendor      = "Carinval Cruise Lines",
                        Price       = 5000,
                        Description = "This is the expensive option since you not been on a recent cruise.",
                        TotalDays   = 15
                    };
                }
            }
            else
            {

                if (daysSinceLastCruise < 150)
                {
                    offer = new CruiseOfferModel()
                    {
                        Title       = "Cheaper PNO Cruise",
                        Vendor      = "PNO Cruise Lines",
                        Price       = 200,
                        Description = "This is the cheaper option since you just been on a previous cruise.",
                        TotalDays   = 6
                    };
                }
                else
                {
                    offer = new CruiseOfferModel()
                    {
                        Title       = "Expensive PNO Cruise",
                        Vendor      = "PNO Cruise Lines",
                        Price       = 12500,
                        Description = "This is the expensive option since you  have not been on a recent cruise.",
                        TotalDays   = 19
                    };
                }
                
            }

            result = Ok(offer);

            return result;
        }
    }
}
