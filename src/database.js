const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create tables
      db.run(`CREATE TABLE IF NOT EXISTS categorias (
        id BIGINT PRIMARY KEY,
        ca_descripcion VARCHAR(255)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS cursos (
        id BIGINT PRIMARY KEY,
        cu_descripcion VARCHAR(255),
        cu_owner BIGINT,
        cu_link_curso VARCHAR(255),
        cu_categorias BIGINT,
        cu_created_at BIGINT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS cursos_inscriptos (
        id BIGINT PRIMARY KEY,
        ci_estudiante BIGINT,
        ci_curso BIGINT,
        estado BIGINT,
        fecha_inscripcion DATE,
        progreso VARCHAR(255)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS estados (
        id BIGINT PRIMARY KEY,
        es_descripcion VARCHAR(255)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS permisos (
        id BIGINT PRIMARY KEY,
        pe_descripcion VARCHAR(255)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS roles (
        id BIGINT PRIMARY KEY,
        rol VARCHAR(255),
        permisos BIGINT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id BIGINT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        rol BIGINT
      )`);

      // Create indexes
      db.run('CREATE INDEX IF NOT EXISTS idx_cursos_cu_owner ON cursos (cu_owner)');
      db.run('CREATE INDEX IF NOT EXISTS idx_cursos_inscriptos_ci_estudiante ON cursos_inscriptos (ci_estudiante)');
      db.run('CREATE INDEX IF NOT EXISTS idx_cursos_inscriptos_ci_curso ON cursos_inscriptos (ci_curso)');
      db.run('CREATE INDEX IF NOT EXISTS idx_roles_permisos ON roles (permisos)');
      db.run('CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios (rol)');
    });

    resolve();
  });
}

module.exports = {
  db,
  initializeDatabase
};