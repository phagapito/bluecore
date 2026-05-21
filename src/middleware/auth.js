const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const SECRET = 'bluecore_gcm_serra_2025';

const auth = async (req, res, next) => {
  try {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer ')) return res.status(401).json({ error: 'Token nao fornecido' });

    // Verify token
    let dec;
    try {
      dec = jwt.verify(h.slice(7), SECRET);
    } catch (e) {
      return res.status(401).json({ error: 'Token invalido ou expirado. Faca login novamente.' });
    }

    // Load agent from DB
    let rows;
    try {
      const result = await pool.query(
        'SELECT id,nome,funcional,setor,letra,perfil,permissoes_json,ativo FROM agentes WHERE id=?',
        [dec.id]
      );
      rows = result.rows;
    } catch (e) {
      console.error('Auth DB error:', e.message);
      // If column doesn't exist (old DB), try without permissoes_json
      try {
        const result2 = await pool.query(
          'SELECT id,nome,funcional,setor,letra,perfil,ativo FROM agentes WHERE id=?',
          [dec.id]
        );
        rows = result2.rows;
        if (rows.length) rows[0].permissoes_json = '{}';
      } catch (e2) {
        return res.status(500).json({ error: 'Erro interno de autenticacao' });
      }
    }

    if (!rows || !rows.length) return res.status(401).json({ error: 'Usuario nao encontrado' });
    if (!rows[0].ativo) return res.status(401).json({ error: 'Usuario inativo' });

    const ag = rows[0];
    try { ag.permissoes = JSON.parse(ag.permissoes_json || '{}'); } catch { ag.permissoes = {}; }
    req.agente = ag;
    next();
  } catch (e) {
    console.error('Auth unexpected error:', e.message);
    res.status(500).json({ error: 'Erro interno: ' + e.message });
  }
};

const perfil = (...ps) => (req, res, next) => {
  if (!ps.includes(req.agente.perfil)) return res.status(403).json({ error: 'Acesso nao autorizado' });
  next();
};

const modulo = (mod, perm) => (req, res, next) => {
  const ag = req.agente;
  if (ag.perfil === 'administrador') return next();
  if (ag.perfil === 'gestor_geral') {
    if (perm === 'any' || perm === 'usuario' || perm === 'gestor') return next();
  }
  if (ag.perfil === 'restrito') {
    const modPerm = (ag.permissoes || {})[mod] || 'bloqueado';
    if (modPerm === 'bloqueado') return res.status(403).json({ error: 'Acesso nao autorizado a este modulo' });
    if (perm === 'any') return next();
    if (perm === 'usuario') return next();
    if (perm === 'gestor' && modPerm === 'gestor') return next();
    return res.status(403).json({ error: 'Permissao insuficiente neste modulo' });
  }
  // Legacy perfis (gestor/usuario) - treat as gestor_geral and restrito respectively
  if (ag.perfil === 'gestor') return next();
  if (ag.perfil === 'usuario') {
    if (perm === 'any' || perm === 'usuario') return next();
    return res.status(403).json({ error: 'Permissao insuficiente' });
  }
  return res.status(403).json({ error: 'Acesso nao autorizado' });
};

module.exports = { auth, perfil, modulo, SECRET };
