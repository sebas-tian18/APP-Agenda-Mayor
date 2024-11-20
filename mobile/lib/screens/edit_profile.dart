import 'package:flutter/material.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class EditProfileScreen extends StatefulWidget {
  final bool fromNavigationMenu;

  EditProfileScreen({super.key, this.fromNavigationMenu = true});

  @override
  EditProfileState createState() => EditProfileState();
}

class EditProfileState extends State<EditProfileScreen> {
  // Estado inicial del perfil
  Map<String, dynamic> profile = {
    'correo': '',
    'contrasena': '',
    'telefono': '',
    'direccion': '',
    'sexo': 'Masculino',
    'nacionalidad': 'Chileno',
    'problemasMovilidad': 'No',
    'foto': 'https://via.placeholder.com/150',
  };

  final _formKey = GlobalKey<FormState>();

  // Controladores de texto
  late TextEditingController correoController;
  late TextEditingController contrasenaController;
  late TextEditingController telefonoController;
  late TextEditingController direccionController;

  @override
  void initState() {
    super.initState();
    // Inicializar controladores con valores actuales
    correoController = TextEditingController(text: profile['correo']);
    contrasenaController = TextEditingController(text: profile['contrasena']);
    telefonoController = TextEditingController(text: profile['telefono']);
    direccionController = TextEditingController(text: profile['direccion']);
  }

  @override
  void dispose() {
    // Liberar los recursos de los controladores
    correoController.dispose();
    contrasenaController.dispose();
    telefonoController.dispose();
    direccionController.dispose();
    super.dispose();
  }

  // Método para enviar los datos al servidor
  Future<void> actualizarPerfil() async {
    if (_formKey.currentState?.validate() ?? false) {
      _formKey.currentState?.save();

      // Actualizar el estado local
      setState(() {
        profile['correo'] = correoController.text;
        profile['contrasena'] = contrasenaController.text;
        profile['telefono'] = telefonoController.text;
        profile['direccion'] = direccionController.text;
      });

      try {
        final response = await Future.delayed(
          const Duration(seconds: 2), // Simulación de petición
          () => 200, // Simula una respuesta exitosa
        );

        // Verificar si el widget sigue montado antes de acceder al contexto
        if (!mounted) return;

        if (response == 200) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Perfil actualizado con éxito')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Error al actualizar el perfil')),
          );
        }
      } catch (e) {
        // Verificar si el widget sigue montado antes de acceder al contexto
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e')),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Configuración',
        showBackButton: widget.fromNavigationMenu,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Foto de perfil
              Center(
                child: Stack(
                  children: [
                    CircleAvatar(
                      radius: 50,
                      backgroundImage: NetworkImage(profile['foto']),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: InkWell(
                        onTap: () {
                          // Implementar selector de imagen
                        },
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: const BoxDecoration(
                            color: Colors.green,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.camera_alt,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Campos del formulario
              TextFormField(
                controller: correoController,
                decoration: const InputDecoration(labelText: 'Correo'),
                onSaved: (value) {
                  if (value != null && value.isNotEmpty) {
                    profile['correo'] = value;
                  }
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'El correo no puede estar vacío';
                  }
                  if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                    return 'Ingrese un correo válido';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: contrasenaController,
                decoration: const InputDecoration(labelText: 'Contraseña'),
                obscureText: true,
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: telefonoController,
                decoration: const InputDecoration(labelText: 'Teléfono'),
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: direccionController,
                decoration: const InputDecoration(labelText: 'Dirección'),
              ),
              const SizedBox(height: 10),

              // Dropdowns
              DropdownButtonFormField<String>(
                value: profile['sexo'],
                decoration: const InputDecoration(labelText: 'Sexo'),
                items: ['Masculino', 'Femenino']
                    .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                    .toList(),
                onChanged: (value) => setState(() => profile['sexo'] = value),
              ),
              const SizedBox(height: 10),
              DropdownButtonFormField<String>(
                value: profile['nacionalidad'],
                decoration: const InputDecoration(labelText: 'Nacionalidad'),
                items: ['Chileno', 'Extranjero']
                    .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                    .toList(),
                onChanged: (value) =>
                    setState(() => profile['nacionalidad'] = value),
              ),
              const SizedBox(height: 10),
              DropdownButtonFormField<String>(
                value: profile['problemasMovilidad'],
                decoration:
                    const InputDecoration(labelText: 'Problemas de movilidad'),
                items: ['Sí', 'No']
                    .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                    .toList(),
                onChanged: (value) =>
                    setState(() => profile['problemasMovilidad'] = value),
              ),
              const SizedBox(height: 20),

              // Botón para guardar cambios
              Align(
                alignment: Alignment.topCenter,
                child: ElevatedButton(
                  onPressed: actualizarPerfil,
                  child: const Text('Guardar Cambios'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
