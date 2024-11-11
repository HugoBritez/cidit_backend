const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');

// Get all usuarios (protected)
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, nombre, email, rol FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get usuario by id (protected)
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, nombre, email, rol FROM usuarios WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update usuario (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?',
      [nombre, email, rol, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    res.json({ message: 'Usuario updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete usuario (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM usuarios WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    res.json({ message: 'Usuario deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;