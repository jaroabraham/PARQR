"use client";
import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect } from 'react';
import { Users, History, Check, X, Trash2, UserCheck, Shield, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'logs'

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoadingUsers(false);
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch('/api/access-logs');
      const data = await res.json();
      if (data.success) setLogs(data.logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
    setLoadingLogs(false);
  };

  const updateStatus = async (userId, newStatus) => {
    try {
      const res = await fetch(`/api/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      }
    } catch (error) {
      alert('Error actualizando estado');
    }
  };

  return (
    <DashboardLayout>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Panel de Administración</h1>
        <p style={{ color: '#94a3b8' }}>Control total de residentes y registros de acceso.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1px' }}>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ 
            padding: '0.75rem 1.5rem', background: 'none', border: 'none', 
            color: activeTab === 'users' ? 'var(--primary)' : '#94a3b8',
            borderBottom: activeTab === 'users' ? '2px solid var(--primary)' : 'none',
            cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} /> Usuarios
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          style={{ 
            padding: '0.75rem 1.5rem', background: 'none', border: 'none', 
            color: activeTab === 'logs' ? 'var(--primary)' : '#94a3b8',
            borderBottom: activeTab === 'logs' ? '2px solid var(--primary)' : 'none',
            cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={18} /> Registros de Acceso
          </div>
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="glass" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem' }}>Usuario</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Rol</th>
                <th style={{ padding: '1rem' }}>Estado</th>
                <th style={{ padding: '1rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingUsers ? (
                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Cargando usuarios...</td></tr>
              ) : users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--card-border)', color: 'white' }}>
                  <td style={{ padding: '1rem' }}>{user.name}</td>
                  <td style={{ padding: '1rem', color: '#94a3b8' }}>{user.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.25rem', 
                      fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', background: user.role === 'ADMIN' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.1)',
                      color: user.role === 'ADMIN' ? '#60a5fa' : 'white', width: 'fit-content'
                    }}>
                      {user.role === 'ADMIN' ? <Shield size={12} /> : null}
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', background: getStatusBg(user.status),
                      color: getStatusColor(user.status)
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {user.status !== 'APPROVED' && (
                        <button title="Aprobar" onClick={() => updateStatus(user.id, 'APPROVED')} className="btn-icon" style={{ color: 'var(--success)' }}><Check size={18} /></button>
                      )}
                      {user.status !== 'REJECTED' && (
                        <button title="Rechazar" onClick={() => updateStatus(user.id, 'REJECTED')} className="btn-icon" style={{ color: '#ef4444' }}><X size={18} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem' }}>Sujeto</th>
                <th style={{ padding: '1rem' }}>Tipo</th>
                <th style={{ padding: '1rem' }}>Acción</th>
                <th style={{ padding: '1rem' }}>Fecha/Hora</th>
              </tr>
            </thead>
            <tbody>
              {loadingLogs ? (
                <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Cargando registros...</td></tr>
              ) : logs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--card-border)', color: 'white' }}>
                  <td style={{ padding: '1rem' }}>
                    {log.user ? log.user.name : log.guest?.guestName}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {log.user ? 'Residente' : 'Invitado'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      color: log.action === 'ENTRY' ? 'var(--success)' : '#ef4444'
                    }}>
                      {log.action === 'ENTRY' ? <Check size={16} /> : <AlertCircle size={16} />}
                      {log.action === 'ENTRY' ? 'Entrada' : 'Denegado'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-icon:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </DashboardLayout>
  );
}

function getStatusBg(status) {
  if (status === 'APPROVED') return 'rgba(16, 185, 129, 0.2)';
  if (status === 'REJECTED') return 'rgba(239, 68, 68, 0.2)';
  return 'rgba(245, 158, 11, 0.2)';
}

function getStatusColor(status) {
  if (status === 'APPROVED') return '#10b981';
  if (status === 'REJECTED') return '#ef4444';
  return '#f59e0b';
}
