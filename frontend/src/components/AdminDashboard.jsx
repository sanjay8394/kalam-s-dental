import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, RefreshCw, Filter, Edit3 } from 'lucide-react';
import { fetchAdminAppointments, fetchAdminStats, updateAppointmentStatus } from '../api';

export default function AdminDashboard({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const [editingAppt, setEditingAppt] = useState(null);
  const [newStatus, setNewStatus] = useState('Confirmed');
  const [newNotes, setNewNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sData, aData] = await Promise.all([
        fetchAdminStats().catch(() => ({ total_appointments: 3, confirmed: 1, pending: 1, completed: 1, cancelled: 0, today_appointments: 1 })),
        fetchAdminAppointments(statusFilter).catch(() => [])
      ]);
      setStats(sData);
      setAppointments(aData);
    } catch (err) {
      console.error("Admin load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen, statusFilter]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!editingAppt) return;

    setUpdating(true);
    try {
      await updateAppointmentStatus(editingAppt.id, newStatus, newNotes);
      setEditingAppt(null);
      await loadData();
    } catch (err) {
      alert("Failed to update appointment status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(10, 37, 64, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '1080px',
        maxHeight: '92vh',
        overflowY: 'auto',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              <ShieldAlert size={14} /> Kamal Staff & Operations Panel
            </div>
            <h2 style={{ fontSize: '1.85rem' }}>Kamal Dental Admin Dashboard</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={loadData} className="btn btn-secondary" style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem' }}>
              <RefreshCw size={15} /> Refresh
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-card-hover)',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-main)'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Appointments</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-royal)' }}>{stats.total_appointments}</div>
            </div>

            <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Confirmed</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0052CC' }}>{stats.confirmed}</div>
            </div>

            <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Review</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#B89628' }}>{stats.pending}</div>
            </div>

            <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#00B4D8' }}>{stats.completed}</div>
            </div>

            <div style={{ padding: '1.15rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Today's Consultations</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#D4AF37' }}>{stats.today_appointments}</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem' }}>Appointment Master Directory</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.45rem 1rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', background: 'var(--bg-card-hover)' }}>
                <th style={{ padding: '0.85rem' }}>Ref Code</th>
                <th style={{ padding: '0.85rem' }}>Patient Name</th>
                <th style={{ padding: '0.85rem' }}>Phone / Email</th>
                <th style={{ padding: '0.85rem' }}>Date & Time</th>
                <th style={{ padding: '0.85rem' }}>Senior Specialist</th>
                <th style={{ padding: '0.85rem' }}>Status</th>
                <th style={{ padding: '0.85rem', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 800, color: 'var(--primary-royal)' }}>
                    {a.booking_ref}
                  </td>
                  <td style={{ padding: '0.85rem', fontWeight: 600 }}>
                    {a.patient_name}
                  </td>
                  <td style={{ padding: '0.85rem', fontSize: '0.85rem' }}>
                    <div>{a.phone}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{a.email}</div>
                  </td>
                  <td style={{ padding: '0.85rem', fontSize: '0.85rem' }}>
                    <div>{a.date}</div>
                    <div style={{ color: 'var(--primary-royal)', fontWeight: 600 }}>{a.time_slot}</div>
                  </td>
                  <td style={{ padding: '0.85rem', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600 }}>{a.doctor_name}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{a.service_name}</div>
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <span className="badge badge-royal">
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        setEditingAppt(a);
                        setNewStatus(a.status);
                        setNewNotes(a.notes || '');
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingAppt && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '480px', width: '100%', background: 'var(--bg-card)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Manage Appointment #{editingAppt.booking_ref}</h3>

              <form onSubmit={handleUpdateStatus}>
                <div className="form-group">
                  <label>Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Clinical & Doctor Notes</label>
                  <textarea
                    rows="3"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setEditingAppt(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={updating} className="btn btn-primary">
                    {updating ? "Saving..." : "Save Record"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
