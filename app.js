const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const puerto = process.env.PUERTO || 3000;

app.use(cors());
app.use(express.json());

// Servir imágenes desde el directorio "fotos"
app.use('/fotos', express.static('fotos'));

// Conexión a MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'maria',
  password: 'Maria1991#',
  database: 'ProyectoFundacionSH'
});

// Verificar conexión
conexion.connect(function (error) {
  if (error) {
    console.error('Error de conexión:', error);
    throw error;
  } else {
    console.log('¡Conexión exitosa a la base de datos!');
  }
});

// Ruta de prueba
app.get('/', function (req, res) {
  res.send('Ruta INICIO');
});

// ✅ Ruta para obtener mascotas
app.get('/api/mascotas_mascota', (req, res) => {
  const consulta = 'SELECT * FROM mascotas_mascota'; // Asegúrate que esta tabla exista
  conexion.query(consulta, (err, resultados) => {
    if (err) {
      console.error('Error en la consulta:', err); // Esto ayuda a depurar
      res.status(500).json({ error: 'Error en la consulta' });
    } else {
      res.json(resultados);
    }
  });
});

// Escuchar el servidor una sola vez
app.listen(puerto, () => {
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});
