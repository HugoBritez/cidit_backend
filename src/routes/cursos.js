const express = require('express');
const router = express.Router();
const db = require('../database').db;

// Get all cursos
router.get('/', (req, res) => {
  db.all('SELECT * FROM cursos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get curso by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM cursos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Curso not found' });
      return;
    }
    res.json(row);
  });
});

// Create new curso
router.post('/', (req, res) => {
  const { id, cu_descripcion, cu_owner, cu_link_curso, cu_categorias, cu_created_at } = req.body;
  db.run(
    'INSERT INTO cursos (id, cu_descripcion, cu_owner, cu_link_curso, cu_categorias, cu_created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [id, cu_descripcion, cu_owner, cu_link_curso, cu_categorias, cu_created_at],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update curso
router.put('/:id', (req, res) => {
  const { cu_descripcion, cu_owner, cu_link_curso, cu_categorias, cu_created_at } = req.body;
  db.run(
    'UPDATE cursos SET cu_descripcion = ?, cu_owner = ?, cu_link_curso = ?, cu_categorias = ?, cu_created_at = ? WHERE id = ?',
    [cu_descripcion, cu_owner, cu_link_curso, cu_categorias, cu_created_at, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Delete curso
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM cursos WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;