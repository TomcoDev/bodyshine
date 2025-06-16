
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-2xl font-serif text-primary mb-2">BodyShine</p>
        <p>&copy; {new Date().getFullYear()} BodyShine. Todos los derechos reservados.</p>
        <p className="text-sm text-neutral-400 mt-2">
          Empoderando tu belleza y bienestar integral.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-primary">Facebook</a>
          <a href="#" className="hover:text-primary">Instagram</a>
          <a href="#" className="hover:text-primary">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
