using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CandidatesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                            select CandidateName, CandidateBirthday, CandidatePhone, CandidateEmail, SkillName, CandidateId 
                            from dbo.Candidates";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Candidates cnd)
        {
            string query = @"
                            insert into dbo.Candidates
                            (CandidateName, CandidateBirthday, CandidatePhone, CandidateEmail, SkillName)
                            values (@CandidateName, @CandidateBirthday, @CandidatePhone, @CandidateEmail, @SkillName)
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CandidateName", cnd.CandidateName);
                    myCommand.Parameters.AddWithValue("@CandidateBirthday", cnd.CandidateBirthday);
                    myCommand.Parameters.AddWithValue("@CandidatePhone", cnd.CandidatePhone);
                    myCommand.Parameters.AddWithValue("@CandidateEmail", cnd.CandidateEmail);
                    myCommand.Parameters.AddWithValue("@SkillName", cnd.SkillName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]

        public JsonResult Put(Candidates cnd)
        {
            string query = @"
                            update dbo.Candidates
                            set CandidateName=@CandidateName
                                CandidateBirthday=@CandidateBirthday
                                CandidatePhone=@CandidatePhone
                                CandidateEmail=@CandidateEmail
                                SkillName=@SkillName
                            where CandidateId=@CandidateId
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CandidateId", cnd.CandidateId);
                    myCommand.Parameters.AddWithValue("@CandidateName", cnd.CandidateName);
                    myCommand.Parameters.AddWithValue("@CandidateBirthday", cnd.CandidateBirthday);
                    myCommand.Parameters.AddWithValue("@CandidatePhone", cnd.CandidatePhone);
                    myCommand.Parameters.AddWithValue("@CandidateEmail", cnd.CandidateEmail);
                    myCommand.Parameters.AddWithValue("@SkillName", cnd.SkillName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Candidates
                            where CandidateId=@CandidateId
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CandidateId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
