using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace Application.DTOs
    {
        public class PatientDTO
        {
            public int Id { get; set; }
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string MothersName { get; set; } = string.Empty;
            public DateTime BirthDate { get; set; }
            public string InsulinPump { get; set; } = string.Empty;
            public string CgmSensor { get; set; } = string.Empty;
            public int BodyWeight { get; set; }
            public string SocketUrl { get; set; } = string.Empty;
            public int DoctorId { get; set; }

            
            public Patient MapToEntity()
            {
                if (Id > 0)
                {
                    return new Patient
                    {
                        Id = Id,
                        FirstName = FirstName,
                        LastName = LastName,
                        MothersName = MothersName,
                        BirthDate = BirthDate,
                        InsulinPump = InsulinPump,
                        CgmSensor = CgmSensor,
                        BodyWeight = BodyWeight,
                        SocketUrl = SocketUrl,
                        DoctorId = DoctorId
                    };
                }
                else
                {
                    return new Patient
                    {
                        FirstName = FirstName,
                        LastName = LastName,
                        MothersName = MothersName,
                        BirthDate = BirthDate,
                        InsulinPump = InsulinPump,
                        CgmSensor = CgmSensor,
                        BodyWeight = BodyWeight,
                        SocketUrl = SocketUrl,
                        DoctorId = DoctorId
                    };
                }
            }

           
            public static PatientDTO MapToDTO(Patient entity)
            {
                return new PatientDTO
                {
                    Id = entity.Id,
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    MothersName = entity.MothersName,
                    BirthDate = entity.BirthDate,
                    InsulinPump = entity.InsulinPump,
                    CgmSensor = entity.CgmSensor,
                    BodyWeight = entity.BodyWeight,
                    SocketUrl = entity.SocketUrl,
                    DoctorId = entity.DoctorId
                };
            }

            
            public static PatientDTO MapToDTOWithoutDoctor(Patient entity)
            {
                return new PatientDTO
                {
                    Id = entity.Id,
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    MothersName = entity.MothersName,
                    BirthDate = entity.BirthDate,
                    InsulinPump = entity.InsulinPump,
                    CgmSensor = entity.CgmSensor,
                    BodyWeight = entity.BodyWeight,
                    SocketUrl = entity.SocketUrl,
                    DoctorId = 0 
                };
            }
        }
    }
