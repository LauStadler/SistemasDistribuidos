async function obtenerUsuarios() {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await respuesta.json();
  return usuarios;
}

async function obtenerPublicaciones(userId) {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const publicaciones = await respuesta.json();
  return publicaciones;
}

const usuarios = await obtenerUsuarios();
const publicaciones = await obtenerPublicaciones(1);
//usuarios.slice(0, 3).forEach(user => console.log(user.name));

for (const user of usuarios.slice(0, 3)) { 
    const publicaciones = await obtenerPublicaciones(user.id);
    console.log(`${user.name} tiene ${publicaciones.length} publicaciones`);
  }

