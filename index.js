require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

// Configurar Express para que sirva archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el body parser para manejar formularios
app.use(express.urlencoded({ extended: true }));

// Ruta principal para mostrar la interfaz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el formulario y guardar las credenciales
app.post('/set-credentials', (req, res) => {
  const { apiKey } = req.body;

  if (apiKey) {
    // Guardamos la clave API de manera temporal (en un archivo o variable de entorno)
    process.env.BOOKING_API_KEY = apiKey;
    res.send('Clave API configurada correctamente');
  } else {
    res.send('Por favor ingrese una clave API válida');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
