import React from 'react';

interface Props {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, subtitle, children, className = '' }: Props) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Modern Header with Better Typography */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Content Container */}
        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
}



