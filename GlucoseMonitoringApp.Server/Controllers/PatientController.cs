using Application.Common.Models;
using Application.DTOs;
using Application.Services.Patients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GlucoseMonitoringApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpPost("AddPatient")]
        [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<IActionResult> AddPatient(PatientDTO patient)
        {
            try
            {
                await _patientService.AddPatient(patient);
                return Ok("Patient has been added");
            }
            catch
            {
                return BadRequest("Patient can't be added");
            }
        }

        [HttpGet("GetPatientById")]
        [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<PatientDTO> GetPatientById(int patientId)
        {
            return await _patientService.GetPatientById(patientId);
        }

        [HttpGet("GetAllPatients")]
        [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<IEnumerable<PatientDTO>> GetAllPatients()
        {
            return await _patientService.GetAllPatients();
        }

        [HttpGet("GetPatientsForDoctor")]
       [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<IEnumerable<PatientDTO>> GetPatientsForDoctor(int doctorId)
        {
            return await _patientService.GetPatientsForDoctor(doctorId);
        }

        [HttpDelete("DeletePatient")]
        [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<IActionResult> DeletePatient(int patientId)
        {
            try
            {
                await _patientService.DeletePatient(patientId);
                return Ok("Patient has been deleted");
            }
            catch
            {
                return BadRequest("Can't delete patient");
            }
        }

        [HttpPut("UpdatePatient")]
        [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<IActionResult> UpdatePatient(PatientDTO patient)
        {
            try
            {
                if (await _patientService.UpdatePatient(patient))
                {
                    return Ok("Patient has been successfully updated.");
                }
                else
                {
                    return BadRequest("Patient update returned false. Bad parameters or inexistent patient.");
                }
            }
            catch
            {
                return BadRequest("Unexpected error during patient update.");
            }
        }
        [HttpGet("DoctorPaged")]
        [Authorize(Roles = "Superadmin,Doctor")]
        public async Task<PageList<PatientDTO>> GetPatientsForDoctorPaged([FromQuery] int doctorId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
         
                var pagedPatients = await _patientService.GetPatientsForDoctorPaged(doctorId, pageNumber, pageSize);
            
                return pagedPatients;
            
        }
    }
}
