import React, { useState, useEffect } from 'react'
import { Camera } from 'lucide-react'

function Input({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      />
    </div>
  )
}

function Select({ label, name, options, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function EditarPerfil() {
  const [profile, setProfile] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    sexo: 'Masculino',
    nacionalidad: 'Chileno',
    problemasMovilidad: 'No',
    foto: 'https://via.placeholder.com/150',
  })

  const token = sessionStorage.getItem('token') // Obtén el token del usuario

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://45.236.130.139:3000/api/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        } else {
          console.error('Error al obtener el perfil.')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchProfile()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://45.236.130.139:3000/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      })
      if (response.ok) {
        alert('Perfil actualizado con éxito.')
      } else {
        console.error('Error al actualizar el perfil.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Editar Perfil</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <img src={profile.foto} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover" />
              <label htmlFor="foto" className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer">
                <Camera className="text-white" size={20} />
                <input type="file" id="foto" name="foto" className="hidden" onChange={(e) => console.log(e.target.files)} />
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nombre" name="nombre" value={profile.nombre} onChange={handleChange} placeholder="Juan" />
            <Input label="Apellido Paterno" name="apellidoPaterno" value={profile.apellidoPaterno} onChange={handleChange} placeholder="Pérez" />
            <Input label="Apellido Materno" name="apellidoMaterno" value={profile.apellidoMaterno} onChange={handleChange} placeholder="González" />
            <Input label="RUT" name="rut" value={profile.rut} onChange={handleChange} placeholder="12345678-9" />
            <Input label="Correo" name="correo" type="email" value={profile.correo} onChange={handleChange} placeholder="juan.perez@ejemplo.com" />
            <Input label="Contraseña" name="contrasena" type="password" value={profile.contrasena} onChange={handleChange} placeholder="********" />
            <Input label="Teléfono" name="telefono" value={profile.telefono} onChange={handleChange} placeholder="+56912345678" />
            <Input label="Dirección" name="direccion" value={profile.direccion} onChange={handleChange} placeholder="Av. Principal 123, Ciudad" />
            <Select 
              label="Sexo" 
              name="sexo" 
              options={['Masculino', 'Femenino']} 
              value={profile.sexo} 
              onChange={handleChange} 
            />
            <Select 
              label="Nacionalidad" 
              name="nacionalidad" 
              options={['Chileno', 'Extranjero']} 
              value={profile.nacionalidad} 
              onChange={handleChange} 
            />
            <Select 
              label="Problemas de movilidad" 
              name="problemasMovilidad" 
              options={['Si', 'No']} 
              value={profile.problemasMovilidad} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarPerfil
