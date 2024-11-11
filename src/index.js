const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import all routes
const authRoutes = require('./routes/auth');
const categoriasRoutes = require('./routes/categorias');
const cursosRoutes = require('./routes/cursos');
const cursosInscriptosRoutes = require('./routes/cursosInscriptos');
const estadosRoutes = require('./routes/estados');
const permisosRoutes = require('./routes/permisos');
const rolesRoutes = require('./routes/roles');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/cursos-inscriptos', cursosInscriptosRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/permisos', permisosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});