import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  Target,
  Trophy,
  Mail,
  User,
  Building,
  ArrowLeft
} from 'lucide-react';

// Pricing Logic Implementation
const calculatePrice = (licenses: number, isAnnual: boolean) => {
  let monthlyPrice = 0;
  let tierName = "";
  let pricePerUnit = 0;

  if (licenses <= 10) {
    pricePerUnit = 4.50;
    monthlyPrice = licenses * pricePerUnit;
    tierName = "Pack Découverte";
  } else if (licenses <= 20) {
    pricePerUnit = 4.20;
    monthlyPrice = licenses * pricePerUnit;
    tierName = "Pack Évolution";
  } else if (licenses <= 35) {
    pricePerUnit = 4.10;
    monthlyPrice = licenses * pricePerUnit;
    tierName = "Pack Performance";
  } else if (licenses <= 60) {
    monthlyPrice = 159;
    pricePerUnit = monthlyPrice / licenses;
    tierName = "Pack Global Club";
  } else {
    monthlyPrice = 159 + (licenses - 60) * 3;
    pricePerUnit = monthlyPrice / licenses;
    tierName = "Pack Club Pro";
  }

  const discountFactor = isAnnual ? 0.85 : 1;
  const finalMonthlyCost = monthlyPrice * discountFactor;
  const annualTotal = finalMonthlyCost * 12;

  return {
    monthlyBase: monthlyPrice,
    monthlyTotal: finalMonthlyCost,
    annualTotal: annualTotal,
    tierName,
    pricePerUnit: pricePerUnit * discountFactor,
  };
};

type ViewState = 'pricing' | 'form' | 'success';

export default function PricingCalculator() {
  const [view, setView] = useState<ViewState>('pricing');
  const [licenses, setLicenses] = useState(15);
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    club: ''
  });

  const pricing = useMemo(() => calculatePrice(licenses, isAnnual), [licenses, isAnnual]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicenses(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/mpqbbnlk', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          club: formData.club,
          licenses: licenses,
          billing: isAnnual ? 'Annuel (-15%)' : 'Mensuel',
          total_monthly: pricing.monthlyTotal.toFixed(2) + '€',
          pack_name: pricing.tierName
        }),
      });

      if (response.ok) {
        setView('success');
      } else {
        alert("Erreur lors de l'envoi vers Formspree. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Error sending form:', error);
      alert("Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-w-5xl mx-auto min-h-[700px]" id="coach360-pricing-container">
      
      {/* Left Column: Interactive Settings / Form */}
      <div className="p-8 lg:p-12 space-y-10 bg-slate-50/50">
        <AnimatePresence mode="wait">
          {view === 'pricing' && (
            <motion.div 
              key="pricing-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider">
                  <Trophy size={14} />
                  Calculateur de tarif
                </div>
                <h2 className="text-4xl font-bold text-brand-dark tracking-tight leading-tight">
                  Configurez votre offre <span className="text-brand-green">Coach360</span>
                </h2>
                <p className="text-slate-600">
                  Ajustez le curseur pour simuler le coût mensuel selon le nombre d'éducateurs dans votre structure.
                </p>
              </div>

              {/* Licenses Input */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-brand-dark uppercase tracking-wide flex items-center gap-2">
                    <Users size={18} className="text-brand-green" />
                    Nombre de licences
                  </label>
                  <div className="text-right">
                    <span className="text-4xl font-black text-brand-dark">{licenses}</span>
                    <span className="text-slate-500 font-medium ml-1 text-sm">licences</span>
                  </div>
                </div>
                
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={licenses}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-green focus:outline-none"
                  />
                  <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-black px-1 uppercase tracking-tighter">
                    <span>5</span>
                    <span>10</span>
                    <span>20</span>
                    <span>35</span>
                    <span>60</span>
                    <span>100</span>
                    <span>150+</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button 
                    onClick={() => setLicenses(Math.max(5, licenses - 1))}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white text-brand-dark hover:bg-slate-50 hover:border-brand-green/30 transition-all font-bold"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => setLicenses(Math.min(200, licenses + 1))}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white text-brand-dark hover:bg-slate-50 hover:border-brand-green/30 transition-all font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Billing Cycle Toggle */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-brand-dark uppercase tracking-wide flex items-center gap-2">
                  <CreditCard size={18} className="text-brand-green" />
                  Mode de facturation
                </label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200 rounded-2xl relative">
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={`relative z-10 py-3 rounded-xl text-sm font-bold transition-all ${!isAnnual ? 'text-brand-green bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Mensuel
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={`relative z-10 py-3 rounded-xl text-sm font-bold transition-all ${isAnnual ? 'text-brand-green bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Annuel
                    <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase">
                      -15%
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'form' && (
            <motion.div 
              key="contact-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setView('pricing')}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-green font-bold text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                Retour au calculateur
              </button>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-brand-dark tracking-tight">Finalisez votre demande</h2>
                <p className="text-slate-600">Offre sélectionnée : <span className="font-bold text-brand-green">{pricing.tierName} ({licenses} licences)</span></p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Votre Adresse Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="email"
                      placeholder="nom@club.com"
                      className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nom & Prénom</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="Jean Dupont"
                      className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nom du Club</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="FC Exemple"
                      className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                      value={formData.club}
                      onChange={e => setFormData({...formData, club: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-green hover:brightness-105 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-brand-green/20 uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                >
                  Confirmer ma demande
                  <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div 
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
            >
              <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark">Demande envoyée !</h2>
              <p className="text-slate-600 text-lg max-w-sm">
                Merci <span className="font-bold text-brand-dark">{formData.name}</span>, nous avons bien reçu votre demande pour le <span className="font-bold text-brand-dark">{formData.club}</span>.
              </p>
              <div className="p-4 bg-brand-green/5 text-brand-green rounded-2xl font-bold">
                On va vous contacter dans peu de temps.
              </div>
              <button 
                onClick={() => {
                  setView('pricing');
                  setFormData({ email: '', name: '', club: '' });
                }}
                className="text-slate-400 hover:text-brand-green font-bold transition-colors mt-8"
              >
                Retour au calculateur
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Summary & Features */}
      <div className="p-8 lg:p-12 bg-brand-dark text-white relative flex flex-col">
        <div className="relative z-10 h-full flex flex-col">
          <div className="space-y-1">
            <div className="text-brand-green font-black uppercase tracking-[0.2em] text-[10px]">Votre Devis Estimatif</div>
            <h3 className="text-3xl font-black tracking-tight">{pricing.tierName}</h3>
          </div>

          <div className="mt-8 mb-10">
            <div className="flex items-baseline gap-2">
              <motion.span 
                key={pricing.monthlyTotal}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black tracking-tighter"
              >
                {pricing.monthlyTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
              </motion.span>
              <span className="text-slate-400 font-bold text-xl">/ mois</span>
            </div>
            
            {isAnnual && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-brand-green text-sm font-bold flex items-center gap-2"
              >
                <CheckCircle2 size={14} />
                Économie annuelle appliquée (-15%)
              </motion.div>
            )}

            <div className="mt-6 flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10">
              <Target size={20} className="text-brand-green shrink-0" />
              <p className="text-sm text-slate-300">
                Soit environ <span className="text-white font-bold">{pricing.pricePerUnit.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span> par licence / mois
              </p>
            </div>
          </div>

          {/* Features - Updated with the specific text provided */}
          <div className="mt-auto space-y-8">
            <div className="space-y-4">
              {[
                "Gestion des rôles & accès",
                "Catalogue interne du club",
                "Partage & diffusion instantanée",
                "Planification globale du club",
                "Suivi & reporting des séances",
                "Jim & Génération IA"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-brand-green/20 p-1 rounded-full shrink-0">
                    <CheckCircle2 size={14} className="text-brand-green" />
                  </div>
                  <span className="text-sm font-bold text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            {view === 'pricing' && (
              <button 
                onClick={() => setView('form')}
                className="w-full bg-brand-green hover:brightness-105 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-dark/50 group uppercase tracking-widest text-sm"
              >
                Choisir cette formule
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} className="text-brand-green" />
            Sans engagement • Données sécurisées
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/10 blur-[120px] -mr-40 -mt-40 rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/5 blur-[120px] -ml-40 -mb-40 rounded-full" />
      </div>
    </div>
  );
}
