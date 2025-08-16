export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">DPR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Bunda Selly</h3>
                <p className="text-sm text-gray-400">Anggota DPR RI</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Berdedikasi untuk melayani masyarakat dan membangun Indonesia yang lebih baik melalui kebijakan yang tepat dan pelayanan yang optimal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Menu Utama</h4>
            <div className="space-y-3">
              <a href="#beranda" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Beranda
              </a>
              <a href="#berita" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Berita & Informasi
              </a>
              <a href="#profil" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Profil & Rekam Jejak
              </a>
              <a href="#agenda" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Agenda & Jadwal
              </a>
              <a href="#galeri" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Galeri & Kegiatan
              </a>
              <a href="#kontak" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Hubungi Kami
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Informasi Kontak</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Kompleks DPR RI</p>
                  <p className="text-gray-400 text-sm">Senayan, Jakarta Pusat</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">kontak@dpr-ri.go.id</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">+62 21 5715 500</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Bunda Selly - Anggota DPR RI. Semua hak dilindungi.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Dibuat dengan ❤️ untuk Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



