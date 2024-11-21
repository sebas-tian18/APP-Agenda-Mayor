class Cita {
  final int idCita;
  final DateTime fecha;
  final String horaInicio;
  final String horaTermino;
  final int asistencia;
  final int atencionADomicilio;
  final String nombreProfesional;
  final String nombreEstado;
  final String nombreResolucion;
  bool vista; // Nueva propiedad para marcar como vista

  Cita({
    required this.idCita,
    required this.fecha,
    required this.horaInicio,
    required this.horaTermino,
    required this.asistencia,
    required this.atencionADomicilio,
    required this.nombreProfesional,
    required this.nombreEstado,
    required this.nombreResolucion,
    this.vista = false, // Por defecto no ha sido vista
  });

  // Mapear desde JSON
  factory Cita.fromJson(Map<String, dynamic> json) {
    return Cita(
      idCita: json['id_cita'],
      fecha: DateTime.parse(json['fecha']),
      horaInicio: json['hora_inicio'],
      horaTermino: json['hora_termino'],
      asistencia: json['asistencia'],
      atencionADomicilio: json['atencion_a_domicilio'],
      nombreProfesional: json['nombre_profesional'],
      nombreEstado: json['nombre_estado'],
      nombreResolucion: json['nombre_resolucion'],
      vista: json['vista'] ?? false, // Carga desde JSON, si existe
    );
  }
}
