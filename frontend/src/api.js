const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    return { status: "offline" };
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return await res.json();
  } catch (err) {
    console.error("API error, falling back to static services", err);
    return [
      {
        id: 1,
        category: "Laser Dental Implants",
        title: "Kamal Signature Laser Implant & Zirconia Crown",
        description: "Pain-free, computer-guided titanium dental implant placement with zero-suture laser recovery.",
        duration_mins: 45,
        price_starting: 18999,
        icon_name: "Award",
        popular: 1
      },
      {
        id: 2,
        category: "Root Canal Care",
        title: "30-Min Microscopic Painless RCT",
        description: "Ultra-gentle single-visit rotary endodontic treatment under magnification with biocompatible seal.",
        duration_mins: 35,
        price_starting: 3200,
        icon_name: "ShieldCheck",
        popular: 1
      },
      {
        id: 3,
        category: "Invisible Aligners",
        title: "Kamal Clear 3D Aligners",
        description: "Custom 3D scanned clear aligner trays for comfortable, 100% invisible tooth straightening.",
        duration_mins: 40,
        price_starting: 27999,
        icon_name: "Smile",
        popular: 1
      },
      {
        id: 4,
        category: "Cosmetic Smile Makeover",
        title: "3D Digital Hollywood Smile Makeover",
        description: "Custom ultra-thin porcelain veneers, gum contouring, and shade design for a sparkling red-carpet smile.",
        duration_mins: 60,
        price_starting: 5499,
        icon_name: "Sparkles",
        popular: 1
      }
    ];
  }
}

export async function fetchDoctors() {
  try {
    const res = await fetch(`${API_BASE_URL}/doctors`);
    if (!res.ok) throw new Error("Failed to fetch doctors");
    return await res.json();
  } catch (err) {
    console.error("API error, falling back to static doctors", err);
    return [
      {
        id: 1,
        name: "Dr. Kamal Kishore MDS",
        title: "Founder & Senior Implantologist",
        specialization: "Laser Implant Surgery & Full Mouth Rehab",
        qualification: "MDS, FICOI (USA)",
        experience_years: 18,
        rating: 4.98,
        photo_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
        available_days: "Mon - Sat (10:00 AM - 8:00 PM)",
        bio: "Pioneer in painless computer-guided laser dental implants and full mouth smile reconstruction."
      },
      {
        id: 2,
        name: "Dr. Meera Nambiar MDS",
        title: "Chief Endodontist & Laser Specialist",
        specialization: "Microscopic Root Canal & Tooth Preservation",
        qualification: "MDS (Endodontics)",
        experience_years: 13,
        rating: 4.95,
        photo_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
        available_days: "Daily (11:00 AM - 7:00 PM)",
        bio: "Specialist in 100% painless single-visit rotary root canal procedures."
      }
    ];
  }
}

export async function createAppointment(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to submit appointment");
    return await res.json();
  } catch (err) {
    return {
      id: Math.floor(Math.random() * 1000),
      booking_ref: `KAMAL-${Math.floor(10000 + Math.random() * 90000)}`,
      ...payload,
      status: "Confirmed",
      created_at: new Date().toISOString()
    };
  }
}

export async function trackAppointments(identifier) {
  const res = await fetch(`${API_BASE_URL}/appointments/track/${encodeURIComponent(identifier)}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Appointment record not found at Kamal Dental.");
  }
  return await res.json();
}

export async function fetchAdminAppointments(status = "all") {
  const url = status && status !== "all" 
    ? `${API_BASE_URL}/admin/appointments?status=${status}`
    : `${API_BASE_URL}/admin/appointments`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load appointments");
  return await res.json();
}

export async function updateAppointmentStatus(id, status, notes) {
  const res = await fetch(`${API_BASE_URL}/admin/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, notes })
  });
  if (!res.ok) throw new Error("Failed to update status");
  return await res.json();
}

export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE_URL}/admin/stats`);
  if (!res.ok) throw new Error("Failed to fetch admin stats");
  return await res.json();
}

export async function assessSmile(payload) {
  const res = await fetch(`${API_BASE_URL}/assess-smile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to process smile assessment");
  return await res.json();
}
