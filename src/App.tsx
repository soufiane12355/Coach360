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
    <div className="min-h-screen bg-white font-sans text-brand-dark selection:bg-brand-green/10 selection:text-brand-green flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-green/5 rounded-full blur-[120px] opacity-70" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-slate-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <main className="relative w-full max-w-5xl">
        <PricingCalculator />
      </main>
    </div>
  );
}

