const express = require('express');
const router = express.Router();
const db = require('../database').db;

// Get all estados
router.get('/', (req, res) => {
  db.all('SELECT * FROM estados', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get estado by id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM estados WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Estado not found' });
      return;
    }
    res.json(row);
  });
});

// Create new estado
router.post('/', (req, res) => {
  const { id, es_descripcion } = req.body;
  db.run('INSERT INTO estados (id, es_descripcion) VALUES (?, ?)',
    [id, es_descripcion],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Update estado
router.put('/:id', (req, res) => {
  const { es_descripcion } = req.body;
  db.run('UPDATE estados SET es_descripcion = ? WHERE id = ?',
    [es_descripcion, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    });
});

// Delete estado
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM estados WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;