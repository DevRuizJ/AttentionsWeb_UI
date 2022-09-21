export const schema = {
  Nombre: {
    presence: { allowEmpty: false, message: '. Su nombre es requerido.' },
    length: {
      maximum: 50
    }
  },
  ApellidoPat: {
    presence: { allowEmpty: false, message: '. Su apellido Paterno es requerido.' },
    length: {
      maximum: 50
    }
  },
  ApellidoMat: {
    presence: { allowEmpty: false, message: '. Su apellido Mataterno es requerido.' },
    length: {
      maximum: 50
    }
  },
  Sexo: {
    presence: { allowEmpty: false, message: ': Debe de seleccionar un genero.' },
    length: {
      maximum: 1
    }
  },
  FechaNac: {
    presence: { allowEmpty: false, message: ': Debe ingresar su fecha de nacimiento' },
    length: {
      minimum: 10
    }
  },
  Email: {
    presence: { allowEmpty: false, message: '. Su Email es requerido.' },
    email:true,
    length: {
      maximum: 50
    }
  }
}
