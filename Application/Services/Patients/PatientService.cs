using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Patients
{
    public interface IPatientService
    {
        Task AddPatient(PatientDTO patient);
        Task<bool> UpdatePatient(PatientDTO patient);
        Task DeletePatient(int patientId);
        Task<PatientDTO> GetPatientById(int patientId);
        Task<IEnumerable<PatientDTO>> GetAllPatients();
        Task<IEnumerable<PatientDTO>> GetPatientsForDoctor(int doctorId);
    }

    public class PatientService : IPatientService
    {
        private readonly GlucoseContext _dbContext;

        public PatientService(GlucoseContext ctx)
        {
            _dbContext = ctx;
        }

        public async Task AddPatient(PatientDTO patient)
        {
            await _dbContext.Patients.AddAsync(patient.MapToEntity());
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeletePatient(int patientId)
        {
            var patient = await _dbContext.Patients.FirstOrDefaultAsync(p => p.Id == patientId);
            if (patient != null)
            {
                patient.Deleted = true;
                _dbContext.Patients.Update(patient);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<PatientDTO> GetPatientById(int patientId)
        {
            var patient = await _dbContext.Patients.FindAsync(patientId);
            return patient != null ? PatientDTO.MapToDTO(patient) : null;
        }

        public async Task<IEnumerable<PatientDTO>> GetAllPatients()
        {
            var patients = await _dbContext.Patients.Where(p => !p.Deleted).ToListAsync();
            return patients.Select(PatientDTO.MapToDTO);
        }

        public async Task<IEnumerable<PatientDTO>> GetPatientsForDoctor(int doctorId)
        {
            var patients = await _dbContext.Patients
                .Where(p => !p.Deleted && p.DoctorId == doctorId)
                .ToListAsync();

            return patients.Select(PatientDTO.MapToDTO);
        }

        public async Task<bool> UpdatePatient(PatientDTO patient)
        {
            var patientEntity = await _dbContext.Patients.FirstOrDefaultAsync(p => p.Id == patient.Id);
            if (patientEntity != null)
            {
                patientEntity.FirstName = patient.FirstName;
                patientEntity.LastName = patient.LastName;
                patientEntity.MothersName = patient.MothersName;
                patientEntity.BirthDate = patient.BirthDate;
                patientEntity.InsulinPump = patient.InsulinPump;
                patientEntity.CgmSensor = patient.CgmSensor;
                patientEntity.BodyWeight = patient.BodyWeight;
                patientEntity.SocketUrl = patient.SocketUrl;
                patientEntity.DoctorId = patient.DoctorId;

                _dbContext.Patients.Update(patientEntity);
                return await _dbContext.SaveChangesAsync() > 0;
            }

            return false;
        }
    }
}
