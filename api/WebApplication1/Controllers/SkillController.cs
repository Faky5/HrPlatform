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
    public class SkillController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SkillController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                            select SkillName, SkillId from
                            dbo.Skill";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand (query,myCon))
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

        public JsonResult Post(Skill skl)
        {
            string query = @"
                            insert into dbo.Skill
                            (SkillName)
                            values (@SkillName)
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SkillName", skl.SkillName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]

        public JsonResult Put(Skill skl)
        {
            string query = @"
                            update dbo.Skill
                            set SkillName=@SkillName
                            where SkillId=@SkillId
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SkillId", skl.SkillId);
                    myCommand.Parameters.AddWithValue("@SkillName", skl.SkillName);
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
                            delete from dbo.Skill
                            where SkillId=@SkillId
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CandidatesAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SkillId", id);
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
