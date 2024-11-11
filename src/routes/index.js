const express = require('express');
const router = express.Router();

const categoriasRoutes = require('./categorias');
const cursosRoutes = require('./cursos');
const cursosInscriptosRoutes = require('./cursosInscriptos');
const estadosRoutes = require('./estados');
const permisosRoutes = require('./permisos');
const rolesRoutes = require('./roles');
const usuariosRoutes = require('./usuarios');

router.use('/categorias', categoriasRoutes);
router.use('/cursos', cursosRoutes);
router.use('/cursos-inscriptos', cursosInscriptosRoutes);
router.use('/estados', estadosRoutes);
router.use('/permisos', permisosRoutes);
router.use('/roles', rolesRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;