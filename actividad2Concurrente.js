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

const usuarios =  await obtenerUsuarios();

const promesas = usuarios.slice(0, 3).map(user => obtenerPublicaciones(user.id));
const resultados = await Promise.all(promesas);
resultados.forEach((publicaciones, i) => {
    console.log(`${usuarios[i].name} tiene ${publicaciones.length} publicaciones`);
  });

