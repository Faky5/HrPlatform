using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Candidates
    {
        public int CandidateId { get; set; }

        public string CandidateName { get; set; }

        public string CandidateBirthday { get; set; }

        public string CandidatePhone { get; set; }

        public string CandidateEmail { get; set; }

        public string SkillName { get; set; }
    }
}
