import React, { useState } from 'react';
import { Star, Package, UserCircle, X, Shield, Mail, Phone, MapPin, Building2, Languages, BadgeCheck, Ban } from 'lucide-react';

const StarRating = ({ value, onChange, readOnly = false, size = 20 }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="stars" style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={`star ${(hovered || value) >= n ? 'active' : ''}`}
          style={{ 
            fontSize: size, 
            cursor: readOnly ? 'default' : 'pointer', 
            userSelect: 'none',
            color: (hovered || value) >= n ? 'var(--amber-400)' : 'var(--slate-300)',
            transition: 'all 0.2s'
          }}
          onClick={() => !readOnly && onChange && onChange(n)}
          onMouseEnter={() => !readOnly && setHovered(n)}
          onMouseLeave={() => !readOnly && setHovered(0)}
        >
          { (hovered || value) >= n ? '★' : '☆' }
        </span>
      ))}
    </div>
  );
};

export const MockPayModal = ({ amount, label, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess();
  };
  return (
    <div className="modal-overlay">
      <div className="mock-pay-modal">
        <div className="mock-pay-logo">razorpay</div>
        <p style={{ fontSize: '.8rem', color: '#666', marginBottom: 4 }}>Payment for</p>
        <p style={{ fontWeight: 700, color: '#1e293b', fontSize: '.9rem' }}>{label}</p>
        <div className="mock-pay-amount">₹{Number(amount).toLocaleString('en-IN')}</div>
        <p className="mock-pay-note">🧪 Test Mode — No real money charged</p>
        <button className="btn-mock-pay" onClick={handlePay} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        <button onClick={onClose} style={{ marginTop: 12, color: '#94a3b8', fontSize: '.8rem', display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export const ReviewModal = ({ order, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return alert('Please select a rating');
    setLoading(true);
    await onSubmit(order, rating, comment);
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 440 }}>
        <h2 className="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>Rate Your Experience</h2>
        <p className="modal-sub" style={{ fontSize: '.85rem', color: 'var(--slate-500)', marginBottom: 20 }}>
          For order with <strong>{order.company?.companyName || 'the vendor'}</strong>
        </p>
        <div style={{ marginBottom: 20 }}>
          <label className="form-label">Your Rating</label>
          <StarRating value={rating} onChange={setRating} size={32} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label className="form-label">Comment (optional)</label>
          <textarea
            className="form-input"
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your experience with this vendor..."
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--slate-200)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" style={{ flex: 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          <button className="btn-reject" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  const detailRows = [
    { label: 'Email', value: user.email, icon: <Mail size={16} /> },
    { label: 'Role', value: user.role, icon: <Shield size={16} /> },
    { label: 'Approved', value: user.isApproved ? 'Yes' : 'No', icon: <BadgeCheck size={16} /> },
    { label: 'Suspended', value: user.isSuspended ? 'Yes' : 'No', icon: <Ban size={16} /> },
    { label: 'Phone', value: user.phone || 'Not provided', icon: <Phone size={16} /> },
    { label: 'Address', value: user.address || 'Not provided', icon: <MapPin size={16} /> },
    { label: 'Company', value: user.companyName || 'Not provided', icon: <Building2 size={16} /> },
    { label: 'Preferred Language', value: user.preferredLanguage || 'en', icon: <Languages size={16} /> }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal user-details-modal">
        <div className="user-details-header">
          <div className="user-details-hero">
            <div className="user-details-avatar">
              <UserCircle size={34} />
            </div>
            <div className="user-details-heading">
              <h2 className="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 4 }}>User Details</h2>
              <p className="modal-sub" style={{ fontSize: '.85rem', color: 'var(--slate-500)', marginBottom: 0 }}>
                Governance view for <strong>{user.name}</strong>
              </p>
            </div>
          </div>
          <button className="user-details-close" onClick={onClose} aria-label="Close user details">
            <X size={18} />
          </button>
        </div>

        <div className="user-details-topline">
          <span className="user-details-pill">{user.role.toUpperCase()}</span>
          <span className={`user-details-pill ${user.isApproved ? 'is-good' : 'is-muted'}`}>{user.isApproved ? 'Approved' : 'Pending Approval'}</span>
          <span className={`user-details-pill ${user.isSuspended ? 'is-danger' : 'is-good'}`}>{user.isSuspended ? 'Suspended' : 'Active'}</span>
        </div>

        <div className="user-details-grid">
          <div className="user-details-item feature">
            <span className="user-details-item-icon"><UserCircle size={18} /></span>
            <div>
              <p className="user-details-label">Name</p>
              <p className="user-details-value">{user.name}</p>
            </div>
          </div>
          {detailRows.map((item) => (
            <div key={item.label} className="user-details-item">
              <span className="user-details-item-icon">{item.icon}</span>
              <div>
                <p className="user-details-label">{item.label}</p>
                <p className="user-details-value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="user-details-footer">
          <button className="btn-secondary user-details-footer-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
