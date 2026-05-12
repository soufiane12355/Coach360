/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import PricingCalculator from './components/PricingCalculator';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark selection:bg-brand-green/10 selection:text-brand-green">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-green/5 rounded-full blur-[120px] opacity-70" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-slate-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <main className="relative p-6 lg:p-24 flex flex-col items-center">
        {/* Header Section */}
        <div className="max-w-3xl text-center mb-16 px-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/5 text-brand-green font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-brand-green/10">
            Licensing & Tarifs
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-brand-dark mb-8 leading-tight">
            Le tarif qui s'adapte à la <span className="text-brand-green">performance</span> de votre club.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Que vous soyez une petite académie ou un club Elite, Coach360 offre une structure flexible pour tous vos éducateurs.
          </p>
        </div>

        {/* The Calculator */}
        <PricingCalculator />

        {/* FAQ - Quick Info - Updated with brand colors */}
        <div className="mt-24 grid md:grid-cols-3 gap-12 max-w-5xl mx-auto px-4 border-t border-slate-100 pt-16">
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-green opacity-70">Accès Global Club</h4>
            <p className="text-slate-500 leading-relaxed text-sm">
              À partir de 36 éducateurs, bénéficiez d'un forfait fixe avantageux incluant jusqu'à 60 licences pour une gestion globale harmonisée.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-green opacity-70">Réduction Annuelle</h4>
            <p className="text-slate-500 leading-relaxed text-sm">
              Économisez sur vos coûts de fonctionnement en optant pour un paiement annuel. Une solution idéale pour la gestion budgétaire saisonnière.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-green opacity-70">Évolutivité Totale</h4>
            <p className="text-slate-500 leading-relaxed text-sm">
              Votre club grandit ? Ajoutez ou retirez des licences à tout moment. Le tarif s'ajuste automatiquement selon nos paliers dégressifs.
            </p>
          </div>
        </div>

        <footer className="mt-32 pb-12 text-slate-400 text-[10px] font-black tracking-[0.2em] flex flex-col items-center gap-6 mb-12">
          <div className="flex items-center gap-4 opacity-30">
            <span className="w-12 h-[1px] bg-brand-dark"></span>
            <span>COACH360 ECOSYSTEM</span>
            <span className="w-12 h-[1px] bg-brand-dark"></span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>© 2026 Coach360 App. Tous droits réservés.</p>
            <p className="text-[8px] opacity-50 tracking-normal">Une solution technique par Hashtag Knights</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

