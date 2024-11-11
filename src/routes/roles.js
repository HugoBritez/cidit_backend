const express = require('express');
const router = express.Router();
const db = require('../database').db;

// Get all roles
router.get('/', (req, res) => {
  db.all('SELECT * FROM roles', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get rol by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM roles WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Rol not found' });
      return;
    }
    res.json(row);
  });
});

// Create new rol
router.post('/', (req, res) => {
  const { id, rol, permisos } = req.body;
  db.run('INSERT INTO roles (id, rol, permisos) VALUES (?, ?, ?)',
    [id, rol, permisos],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Update rol
router.put('/:id', (req, res) => {
  const { rol, permisos } = req.body;
  db.run('UPDATE roles SET rol = ?, permisos = ? WHERE id = ?',
    [rol, permisos, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    });
});

// Delete rol
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM roles WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;