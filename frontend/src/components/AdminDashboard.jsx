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
      background: 'rgba(7, 25, 47, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '1020px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
              <ShieldAlert size={13} /> Kalam Staff Operations Panel
            </div>
            <h2 style={{ fontSize: '1.6rem' }}>Kalam Dental Admin Dashboard</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button onClick={loadData} className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={13} /> Refresh
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-card-hover)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-main)'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Appointments</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-royal)' }}>{stats.total_appointments}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Confirmed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0052CC' }}>{stats.confirmed}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Review</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>{stats.pending}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#00B4D8' }}>{stats.completed}</div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Today's Consultations</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>{stats.today_appointments}</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem' }}>Appointment Master Directory</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={14} color="var(--text-muted)" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.825rem' }}
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
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', background: 'var(--bg-card-hover)' }}>
                <th style={{ padding: '0.65rem' }}>Ref Code</th>
                <th style={{ padding: '0.65rem' }}>Patient Name</th>
                <th style={{ padding: '0.65rem' }}>Phone / Email</th>
                <th style={{ padding: '0.65rem' }}>Date & Time</th>
                <th style={{ padding: '0.65rem' }}>Senior Specialist</th>
                <th style={{ padding: '0.65rem' }}>Status</th>
                <th style={{ padding: '0.65rem', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.65rem', fontWeight: 800, color: 'var(--primary-royal)' }}>
                    {a.booking_ref}
                  </td>
                  <td style={{ padding: '0.65rem', fontWeight: 600 }}>
                    {a.patient_name}
                  </td>
                  <td style={{ padding: '0.65rem', fontSize: '0.8rem' }}>
                    <div>{a.phone}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{a.email}</div>
                  </td>
                  <td style={{ padding: '0.65rem', fontSize: '0.8rem' }}>
                    <div>{a.date}</div>
                    <div style={{ color: 'var(--primary-royal)', fontWeight: 600 }}>{a.time_slot}</div>
                  </td>
                  <td style={{ padding: '0.65rem', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 600 }}>{a.doctor_name}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{a.service_name}</div>
                  </td>
                  <td style={{ padding: '0.65rem' }}>
                    <span className="badge badge-royal">
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        setEditingAppt(a);
                        setNewStatus(a.status);
                        setNewNotes(a.notes || '');
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      <Edit3 size={12} /> Edit
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
            <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '440px', width: '100%', background: 'var(--bg-card)' }}>
              <h3 style={{ marginBottom: '0.85rem', fontSize: '1.2rem' }}>Manage Appointment #{editingAppt.booking_ref}</h3>

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

                <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                  <button type="button" onClick={() => setEditingAppt(null)} className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={updating} className="btn btn-primary" style={{ padding: '0.45rem 1.15rem', fontSize: '0.8rem' }}>
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
