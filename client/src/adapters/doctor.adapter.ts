export const getDoctorAdapter = (doctor: any) => ({
  id: doctor.id,
  name: doctor.name,
  therapyOptions: doctor.therapyOptions,
  specialty: doctor.specialty,
});
