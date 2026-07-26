const clinicConfig = {
  name: "Smile Dental",
  doctorName: "Dr. Ahmed Benali",
  speciality: "Dental Surgeon",
  phone: "+213 555 12 34 56",
  whatsapp: "213555123456", // Format without + or spaces for api link
  email: "contact@smiledental.dz",
  address: "123 Rue Didouche Mourad, Alger",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.873215682855!2d3.0531513!3d36.7616149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzQxLjgiTiAzwrAwMycxMS4zIkU!5e0!3m2!1sen!2sdz!4v1625000000000!3m2!1sen!2sdz",
  bookingLink: "https://cal.com/mehdi-mostefaoui-bn5qnq/", // Your Cal.com link
  facebook: "https://facebook.com/smiledental",
  instagram: "https://instagram.com/smiledental",
  
  // Analytics & Tracking IDs (Leave empty string "" if client doesn't use one)
  analytics: {
    ga4Id: "G-XXXXXXXXXX",      // Replace with real GA4 ID or leave ""
    metaPixelId: "1234567890"   // Replace with real Meta Pixel ID or leave ""
  },

  // Theme Overrides (Fallback variables handled in CSS)
  colors: {
    primary: "#0A84FF",
    secondary: "#18B7A8",
    background: "#F7F9FC",
    text: "#1B1B1B"
  },

  // Stats Counters
  stats: {
    experience: 12,
    patients: 5000,
    certificates: 15
  },

  // Dynamic Content Array
  services: [
    { icon: "🦷", title: "Détartrage & Nettoyage", desc: "Élimination de la plaque dentaire pour un sourire frais et sain." },
    { icon: "😁", title: "Blanchiment Dentaire", desc: "Éclaircissement professionnel pour redonner de l'éclat à vos dents." },
    { icon: "🪥", title: "Orthodontie", desc: "Alignement parfait des dents pour enfants et adultes." },
    { icon: "🦷", title: "Implants Dentaires", desc: "Remplacement durable de vos dents manquantes en toute sécurité." },
    { icon: "✨", title: "Facettes", desc: "Correction esthétique sur-mesure pour un sourire parfait." },
    { icon: "👶", title: "Dentisterie Pédiatrique", desc: "Des soins doux et adaptés pour la santé bucco-dentaire de vos enfants." },
    { icon: "🚨", title: "Urgences Dentaires", desc: "Prise en charge rapide de vos douleurs et accidents dentaires." }
  ],

  reviews: [
    { name: "Yacine B.", rating: 5, text: "Excellent dentiste ! Très professionnel, propre et ponctuel. Le système de rendez-vous en ligne est super pratique." },
    { name: "Amel T.", rating: 5, text: "Cabinet moderne, Dr. Benali explique tout en détail. Je n'ai ressenti aucune douleur pendant l'extraction." },
    { name: "Karim M.", rating: 5, text: "Une équipe accueillante et un service impeccable. Je recommande vivement pour toute la famille." }
  ],

  hours: [
    { days: "Samedi - Mercredi", time: "09:00 - 17:00" },
    { days: "Jeudi", time: "09:00 - 13:00" },
    { days: "Vendredi", time: "Fermé" }
  ]
};