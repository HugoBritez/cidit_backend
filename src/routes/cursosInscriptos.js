const express = require('express');
const router = express.Router();
const db = require('../database').db;

// Get all inscripciones
router.get('/', (req, res) => {
  db.all('SELECT * FROM cursos_inscriptos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get inscripcion by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM cursos_inscriptos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Inscripción not found' });
      return;
    }
    res.json(row);
  });
});

// Create new inscripcion
router.post('/', (req, res) => {
  const { id, ci_estudiante, ci_curso, estado, fecha_inscripcion, progreso } = req.body;
  db.run(
    'INSERT INTO cursos_inscriptos (id, ci_estudiante, ci_curso, estado, fecha_inscripcion, progreso) VALUES (?, ?, ?, ?, ?, ?)',
    [id, ci_estudiante, ci_curso, estado, fecha_inscripcion, progreso],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update inscripcion
router.put('/:id', (req, res) => {
  const { ci_estudiante, ci_curso, estado, fecha_inscripcion, progreso } = req.body;
  db.run(
    'UPDATE cursos_inscriptos SET ci_estudiante = ?, ci_curso = ?, estado = ?, fecha_inscripcion = ?, progreso = ? WHERE id = ?',
    [ci_estudiante, ci_curso, estado, fecha_inscripcion, progreso, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Delete inscripcion
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM cursos_inscriptos WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;