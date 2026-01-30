const express = require('express');
const router = express.Router();

const {
  getParticipants,
  listMatches,
  createMatch,
  setMatchResult,
} = require('../controllers/matches');
const { authenticateToken } = require('../middleware/auth');

router.get('/participants', authenticateToken, getParticipants);
router.get('/', authenticateToken, listMatches);
router.post('/', authenticateToken, createMatch);
router.put('/:id/result', authenticateToken, setMatchResult);

module.exports = router;
