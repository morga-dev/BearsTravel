import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import SplitText from '../Bits/SplitText';

// Componente principal de la página de inicio
export default function Home() {
  return (
    <div className="container mx-auto p-4 text-[var(--white)] ">
      {/* Header */}
      <header
        className="relative rounded-xl shadow-lg p-8 mb-8 flex flex-col items-center justify-center min-h-[320px] overflow-hidden">
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-[var(--dark-primary)] opacity-80 rounded-xl"></div>
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/Logo.png"
            alt="Bear's Travel"
            className="w-32 h-32 object-cover rounded-full border-4 border-[var(--gold)] mb-4 bg-[var(--dark-primary)] bg-opacity-80"
          />
          <SplitText
            text="Bear's Travel"
            className="text-4xl font-bold mb-2 text-[var(--gold)] text-center drop-shadow-lg"
            splitType="chars"
            delay={40}
          />
          <SplitText
            text="Tu puerta a la aventura. Especialistas en viajes desde CDMX a Los Cabos y Cancún."
            className="text-lg text-[var(--orange)] text-center drop-shadow"
            splitType="words"
            delay={30}
          />
        </div>
      </header>

      {/* Cards */}
      <div className='bg-[var(--dark-primary)] opacity-80 rounded-2xl p-4'>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up">

          <div className="bg-[var(--dark-primary)] rounded-2xl p-8 border border-gray-700/50 transition-all hover:transform hover:scale-105
          hover:border-[var(--orange)] duration-300">
            <div className="bg-hero-gradient p-4 rounded-xl w-fit mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-brand-purple/25 transition-all duration-300">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Destinos Exclusivos</h3>
            <p className="text-gray-400 leading-relaxed">Los Cabos y Cancún te esperan con experiencias únicas</p>
          </div>

          <div className="bg-[var(--dark-primary)] rounded-2xl p-8 border border-gray-700/50 transition-all hover:transform hover:scale-105
          hover:border-[var(--orange)] duration-300">
            <div className="bg-gradient-to-r from-brand-blue to-brand-green p-4 rounded-xl w-fit mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-brand-blue/25 transition-all duration-300">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Flexibilidad Total</h3>
            <p className="text-gray-400 leading-relaxed">Elige fechas que se adapten perfectamente a tu agenda</p>
          </div>

          <div className="bg-[var(--dark-primary)] rounded-2xl p-8 border border-gray-700/50 transition-all hover:transform hover:scale-105
          hover:border-[var(--orange)] duration-300">
            <div className="bg-gradient-to-r from-brand-green to-brand-orange p-4 rounded-xl w-fit mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-brand-green/25 transition-all duration-300">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Para Todos</h3>
            <p className="text-gray-400 leading-relaxed">Viajes individuales, en pareja o aventuras grupales</p>
          </div>
        </div>

        {/* Sección: Lema */}
        <div className='rounded-2xl p-4 mt-16 '>
          <section className="text-center p-4 text-justify-center">
            <h2 className="text-xl font-bold text-[var(--gold)]">
              ¡Viaja seguro, viaja feliz, viaja con Bear's Travel!
            </h2>
            <img
            src="/Mascota-Entusiasmo.png"
            alt="Mascot Bear"
            className="mascota w-32 h-full justify-center mx-auto"
          />
          </section>
        </div>
      </div>
    </div>
  );
}