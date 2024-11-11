const express = require('express');
const router = express.Router();
const db = require('../database').db;

// Get all permisos
router.get('/', (req, res) => {
  db.all('SELECT * FROM permisos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get permiso by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM permisos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Permiso not found' });
      return;
    }
    res.json(row);
  });
});

// Create new permiso
router.post('/', (req, res) => {
  const { id, pe_descripcion } = req.body;
  db.run('INSERT INTO permisos (id, pe_descripcion) VALUES (?, ?)',
    [id, pe_descripcion],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Update permiso
router.put('/:id', (req, res) => {
  const { pe_descripcion } = req.body;
  db.run('UPDATE permisos SET pe_descripcion = ? WHERE id = ?',
    [pe_descripcion, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    });
});

// Delete permiso
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM permisos WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;