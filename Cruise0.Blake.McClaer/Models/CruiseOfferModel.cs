using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cruise0.Blake.McClaer.Models
{
    public class CruiseOfferModel
    {
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("vendor")]
        public string Vendor { get; set; }
        [JsonProperty("total_days")]
        public int TotalDays { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("price")]
        public double Price { get; set; }
    }
}
