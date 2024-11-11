const express = require('express');
const router = express.Router();
const db = require('../database').db;

// Get all categorias
router.get('/', (req, res) => {
  db.all('SELECT * FROM categorias', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get categoria by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Categoria not found' });
      return;
    }
    res.json(row);
  });
});

// Create new categoria
router.post('/', (req, res) => {
  const { id, ca_descripcion } = req.body;
  db.run('INSERT INTO categorias (id, ca_descripcion) VALUES (?, ?)',
    [id, ca_descripcion],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Update categoria
router.put('/:id', (req, res) => {
  const { ca_descripcion } = req.body;
  db.run('UPDATE categorias SET ca_descripcion = ? WHERE id = ?',
    [ca_descripcion, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    });
});

// Delete categoria
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM categorias WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;