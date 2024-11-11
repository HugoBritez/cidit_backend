CREATE DATABASE IF NOT EXISTS cursos_db;
USE cursos_db;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `ca_descripcion` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `cursos` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `cu_descripcion` VARCHAR(255),
  `cu_owner` BIGINT,
  `cu_link_curso` VARCHAR(255),
  `cu_categorias` BIGINT,
  `cu_created_at` BIGINT
);

CREATE TABLE IF NOT EXISTS `cursos_inscriptos` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `ci_estudiante` BIGINT,
  `ci_curso` BIGINT,
  `estado` BIGINT,
  `fecha_inscripcion` DATE DEFAULT NULL,
  `progreso` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `estados` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `es_descripcion` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `permisos` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `pe_descripcion` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `roles` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `rol` VARCHAR(255),
  `permisos` BIGINT
);

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` BIGINT
);

ALTER TABLE `categorias` ADD CONSTRAINT `categorias_id_fk` FOREIGN KEY (`id`) REFERENCES `cursos` (`cu_categorias`);
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_cu_owner_fk` FOREIGN KEY (`cu_owner`) REFERENCES `usuarios` (`id`);
ALTER TABLE `cursos_inscriptos` ADD CONSTRAINT `cursos_inscriptos_ci_curso_fk` FOREIGN KEY (`ci_curso`) REFERENCES `cursos` (`id`);
ALTER TABLE `cursos_inscriptos` ADD CONSTRAINT `cursos_inscriptos_ci_estudiantes_fk` FOREIGN KEY (`ci_estudiante`) REFERENCES `usuarios` (`id`);
ALTER TABLE `cursos_inscriptos` ADD CONSTRAINT `cursos_inscriptos_estado_fk` FOREIGN KEY (`estado`) REFERENCES `estados` (`id`);
ALTER TABLE `roles` ADD CONSTRAINT `roles_permisos_fk` FOREIGN KEY (`permisos`) REFERENCES `permisos` (`id`);
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_rol_fk` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);

CREATE INDEX idx_cursos_cu_owner ON `cursos` (`cu_owner`);
CREATE INDEX idx_cursos_inscriptos_ci_estudiante ON `cursos_inscriptos` (`ci_estudiante`);
CREATE INDEX idx_cursos_inscriptos_ci_curso ON `cursos_inscriptos` (`ci_curso`);
CREATE INDEX idx_roles_permisos ON `roles` (`permisos`);
CREATE INDEX idx_usuarios_rol ON `usuarios` (`rol`);