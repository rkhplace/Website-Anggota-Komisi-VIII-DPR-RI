'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NewsList, { NewsItem } from '@/components/NewsList';
import ProfileImage from '@/components/ProfileImage';
import Section from '@/components/Section';
import { buildStrapiMedia, fetchFromStrapi } from '@/lib/strapi';



type HomePageData = {
  data: {
    id: number;
    name: string;
    role: string;
    shortGreeting?: any; // Rich text field
    photo?: {
      id: number;
      name: string;
      url: string;
      formats?: {
        thumbnail?: {
          url: string;
        };
        small?: {
          url: string;
        };
      };
    } | null;
  }
};

type NewsListResponse = {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      slug: string;
      excerpt?: string | null;
      publishedAt?: string | null;
    }
  }>;
};

type ProfileResponse = {
  data: {
    id: number;
    biography: any; // Rich text field
    education: string[];
    experiences: string[];
    vision: any; // Rich text field
    mission: string[];
  }
};

type AgendaResponse = {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      location?: string | null;
      startDate: string;
      endDate?: string | null;
      description?: any | null; // Rich text field
    }
  }>;
};

type GalleryResponse = {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      media: {
        data: Array<{ attributes: { url: string } }>;
      };
    }
  }>;
};

// Helper function to extract text from rich text fields
function extractTextFromRichText(richText: any): string {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  if (Array.isArray(richText)) {
    return richText
      .map((block: any) => {
        if (block.children) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return block.text || '';
      })
      .join(' ');
  }
  return '';
}

export default function HomePage() {
  const [profile, setProfile] = useState<HomePageData | null>(null);
  const [latestNews, setLatestNews] = useState<NewsListResponse | null>(null);
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [agendas, setAgendas] = useState<AgendaResponse | null>(null);
  const [galleries, setGalleries] = useState<GalleryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk scroll ke section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch data dari Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, newsRes, profileDataRes, agendasRes, galleriesRes] = await Promise.all([
          fetchFromStrapi<HomePageData>('/api/profile?populate=*'),
          fetchFromStrapi<NewsListResponse>('/api/news-articles', { 'sort': 'publishedAt:desc', 'pagination[pageSize]': 6 }),
          fetchFromStrapi<ProfileResponse>('/api/profile'),
          fetchFromStrapi<AgendaResponse>('/api/agenda-items', { sort: 'startDate:asc' }),
          fetchFromStrapi<GalleryResponse>('/api/gallery-albums?populate=media')
        ]);

        setProfile(profileRes);
        setLatestNews(newsRes);
        setProfileData(profileDataRes);
        setAgendas(agendasRes);
        setGalleries(galleriesRes);
      } catch (error) {
        console.error('Failed to fetch data from Strapi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const name = profile?.data?.name || 'Bunda Selly';
  const role = profile?.data?.role || 'Anggota DPR RI';
  const greeting = extractTextFromRichText(profile?.data?.shortGreeting) || 'Membangun Indonesia yang lebih baik melalui kebijakan yang tepat dan pelayanan yang optimal.';
  
  const photoUrl = profile?.data?.photo?.url ? 
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${profile.data.photo.url}` : null;

  const news: NewsItem[] = latestNews?.data?.map((n) => ({
    id: n.id,
    title: n.attributes.title,
    slug: n.attributes.slug,
    excerpt: n.attributes.excerpt || undefined,
    publishedAt: n.attributes.publishedAt || undefined,
  })) || [];

  const p = profileData?.data;
  const mediaItems = galleries?.data?.flatMap((g) => g.attributes.media?.data || []) || [];

  return (
    <>
      <Header />
      
            {/* Hero Section - Simple Smooth Fade In */}
      <section id="beranda" className="min-h-screen relative overflow-hidden">
        {/* Mobile Layout: Text First, Photo Second */}
        <div className="lg:hidden relative z-10 container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Status Badge */}
            <div className="flex items-center space-x-2 mb-4 animate-hero-fade-in group cursor-pointer">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-300"></div>
              <span className="text-sm text-gray-700 font-medium group-hover:text-green-600 transition-colors duration-300">Aktif melayani masyarakat</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 mb-8">
              <h1 className="text-responsive font-bold text-gray-900 leading-tight animate-hero-fade-in text-overflow-safe">
                {name}
              </h1>
              <p className="text-xl font-medium text-gray-800 leading-relaxed animate-hero-stagger-fade-in">
                {role}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed animate-hero-stagger-fade-in">
                {greeting}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col gap-4 w-full max-w-sm animate-hero-stagger-fade-in">
              <button 
                onClick={() => scrollToSection('kontak')}
                className="group bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <span className="flex items-center justify-center">
                  Hubungi Saya
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('agenda')}
                className="group border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <span className="flex items-center justify-center">
                  Lihat Agenda
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Description Text - Mobile */}
            <div className="mt-8 animate-hero-stagger-fade-in">
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                Sebagai anggota DPR RI yang berpengalaman, saya berdedikasi untuk mendengarkan aspirasi rakyat, 
                merumuskan kebijakan yang tepat, dan memastikan pelayanan publik yang optimal untuk kemajuan Indonesia.
              </p>
            </div>

            {/* Photo - Mobile */}
            <div className="mt-1 animate-hero-stagger-fade-in">
              <ProfileImage
                src={photoUrl}
                alt={name}
                className="w-auto h-screen max-h-[90vh] object-contain"
                effect="scale"
                gradientBlur={true}
              />
            </div>

            
          </div>
        </div>

        {/* Desktop Layout: Original Side-by-Side */}
        <div className="hidden lg:block">
          {/* Background Photo - Centered with gradient blur */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center photo-zoom-container">
              <ProfileImage
                src={photoUrl}
                alt={name}
                className="w-auto h-auto max-w-xl max-h-lg object-contain"
                effect="fade"
                gradientBlur={true}
              />
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/90 to-transparent animate-hero-stagger-fade-in"></div>
            </div>
          </div>

          {/* Content Overlay - Left Side */}
          <div className="relative z-10 container mx-auto px-6 py-40">
            <div className="flex flex-col lg:flex-row items-start min-h-[80vh] justify-center">
              {/* Left Content */}
              <div className="lg:w-1/2 space-y-8 pr-8 lg:pr-16">
                {/* Status Badge */}
                <div className="flex items-center space-x-2 mb-8 animate-hero-fade-in group cursor-pointer">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm text-gray-700 font-medium group-hover:text-green-600 transition-colors duration-300">Aktif melayani masyarakat</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-6 mb-12 max-w-3xl">
                  <h1 className="text-responsive font-bold text-gray-900 leading-tight animate-hero-fade-in text-overflow-safe">
                    {name}
                  </h1>
                  <p className="text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed animate-hero-stagger-fade-in">
                    {role}
                  </p>
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl animate-hero-stagger-fade-in">
                    {greeting}
                  </p>
                </div>

                {/* Description and CTA */}
                <div className="space-y-8 max-w-2xl animate-hero-stagger-fade-in">
                  {/* Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => scrollToSection('kontak')}
                      className="group bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="flex items-center justify-center">
                        Hubungi Saya
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                    <button 
                      onClick={() => scrollToSection('agenda')}
                      className="group border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="flex items-center justify-center">
                        Lihat Agenda
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Description Text */}
              <div className="lg:w-1/2 flex items-end justify-center pl-8 lg:pl-16 pt-20">
                <div className="max-w-md animate-hero-stagger-fade-in group">
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed text-center lg:text-left group-hover:text-gray-800 transition-colors duration-300">
                    Sebagai anggota DPR RI yang berpengalaman, saya berdedikasi untuk mendengarkan aspirasi rakyat, 
                    merumuskan kebijakan yang tepat, dan memastikan pelayanan publik yang optimal untuk kemajuan Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div className="absolute top-20 left-4 w-2 h-2 bg-gray-300 rounded-full animate-pulse animate-hero-stagger-fade-in"></div>
        <div className="absolute top-40 right-4 w-3 h-3 bg-gray-200 rounded-full animate-pulse animate-hero-stagger-fade-in"></div>
        <div className="absolute bottom-40 left-4 w-2 h-2 bg-gray-300 rounded-full animate-pulse animate-hero-stagger-fade-in"></div>
      </section>

      {/* Berita dan Informasi Section */}
      <Section id="berita" title="Berita dan Informasi" subtitle="Informasi terbaru seputar kegiatan dan kebijakan">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kolom Kiri - Berita Utama */}
          <div className="space-y-8 scroll-slide-left scroll-animate">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-scale scroll-animate">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 scroll-flip-x scroll-animate">Berita Utama</h3>
              <div className="space-y-6">
                {news && news.length > 0 ? (
                  news.slice(0, 3).map((article, index) => (
                    <div key={article.id} className="group bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 scroll-slide-up scroll-animate" style={{transitionDelay: `${(index + 1) * 0.1}s`}}>
                      <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Berita #{index + 1}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Terbaru</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 p-8 rounded-2xl text-center text-gray-500 border-2 border-dashed border-gray-200 scroll-bounce scroll-animate">
                    <p>Belum ada berita tersedia</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Kategori Berita */}
          <div className="space-y-8 scroll-slide-right scroll-animate">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-scale scroll-animate">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 scroll-flip-y scroll-animate">Kategori Berita</h3>
              <div className="grid grid-cols-2 gap-4">
                                  <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <span className="text-blue-600 text-2xl">📰</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Kebijakan</p>
                  </div>
                  <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <span className="text-blue-600 text-2xl">🏛️</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">DPR RI</p>
                  </div>
                  <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <span className="text-blue-600 text-2xl">👥</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Masyarakat</p>
                  </div>
                  <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <span className="text-blue-600 text-2xl">📊</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Data</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Profil dan Rekam Jejak Section */}
      <Section id="profil" title="Profil dan Rekam Jejak" subtitle="Mengenal lebih dekat dengan pengalaman dan visi">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom 1 - Biodata */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-left scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-x scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">👤</span>
              Biodata
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 scroll-slide-up scroll-animate scroll-stagger-3">
                <h4 className="font-semibold text-gray-900 mb-2">Nama Lengkap</h4>
                <p className="text-gray-700">{name || 'Nama belum tersedia'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 scroll-slide-up scroll-animate scroll-stagger-4">
                <h4 className="font-semibold text-gray-900 mb-2">Jabatan</h4>
                <p className="text-gray-700">{role || 'Jabatan belum tersedia'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 scroll-slide-up scroll-animate scroll-stagger-5">
                <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                <p className="text-green-600 font-semibold">Aktif</p>
              </div>
            </div>
          </div>

          {/* Kolom 2 - Pendidikan */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-scale scroll-animate scroll-stagger-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-y scroll-animate scroll-stagger-3">
              <span className="mr-3 text-3xl">🎓</span>
              Pendidikan
            </h3>
            <div className="space-y-3">
              {p?.education && p.education.length > 0 ? (
                p.education.map((edu: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 scroll-rotate scroll-animate" style={{transitionDelay: `${(index + 1) * 0.1}s`}}>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                        <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">{edu}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500 border-2 border-dashed border-gray-200 scroll-bounce scroll-animate">
                  <p className="text-sm">Data pendidikan belum tersedia</p>
                </div>
              )}
            </div>
          </div>

          {/* Kolom 3 - Pengalaman */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-right scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-x scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">💼</span>
              Pengalaman
            </h3>
            <div className="space-y-3">
              {p?.experiences && p.experiences.length > 0 ? (
                p.experiences.map((exp: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 scroll-slide-up scroll-animate">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                        <span className="text-orange-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">{exp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500 border-2 border-dashed border-gray-200 scroll-bounce scroll-animate">
                  <p className="text-sm">Data pengalaman belum tersedia</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visi & Misi - Full Width */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-left scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-x scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">🎯</span>
              Visi
            </h3>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 scroll-scale scroll-animate scroll-stagger-3">
              <p className="text-gray-700 leading-relaxed">
                {p?.vision ? extractTextFromRichText(p.vision) : 'Visi belum tersedia'}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-right scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-y scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">📋</span>
              Misi
            </h3>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 scroll-scale scroll-animate scroll-stagger-3">
              <div className="space-y-3">
                {p?.mission && p.mission.length > 0 ? (
                  p.mission.map((mission: string, index: number) => (
                    <div key={index} className="flex items-start scroll-slide-up scroll-animate" style={{transitionDelay: `${(index + 1) * 0.1}s`}}>
                      <span className="text-blue-600 mr-3 mt-1 text-lg">•</span>
                      <p className="text-gray-700 text-sm font-medium">{mission}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">Misi belum tersedia</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Agenda dan Jadwal Section */}
      <Section id="agenda" title="Agenda dan Jadwal" subtitle="Jadwal kegiatan resmi dan pertemuan penting">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kolom Kiri - Agenda Terdekat */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-left scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-x scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">📅</span>
              Agenda Terdekat
            </h3>
            <div className="space-y-6">
              {agendas?.data && agendas.data.length > 0 ? (
                agendas.data.slice(0, 3).map((agenda, index) => {
                  const a = agenda.attributes;
                  return (
                    <div key={agenda.id} className="group bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 scroll-slide-up scroll-animate">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {a.title}
                        </h4>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                          {new Date(a.startDate).toLocaleDateString('id-ID', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-3 text-lg">📍</span>
                          <span className="font-medium">{a.location || 'Lokasi belum ditentukan'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-3 text-lg">🕐</span>
                          <span className="font-medium">
                            {new Date(a.startDate).toLocaleTimeString('id-ID', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })} - {a.endDate ? new Date(a.endDate).toLocaleTimeString('id-ID', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            }) : 'Selesai'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-gray-50 p-8 rounded-2xl text-center text-gray-500 border-2 border-dashed border-gray-200 scroll-bounce scroll-animate">
                  <p>Belum ada agenda tersedia</p>
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan - Kategori Agenda */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-right scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center scroll-flip-y scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">🏷️</span>
              Kategori Agenda
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate scroll-stagger-3">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-red-600 text-2xl">🏛️</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Rapat DPR</p>
              </div>
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate scroll-stagger-4">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-red-600 text-2xl">👥</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Kunjungan</p>
              </div>
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate scroll-stagger-5">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-red-600 text-2xl">📊</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Hearing</p>
              </div>
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer scroll-rotate scroll-animate scroll-stagger-5">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-red-600 text-2xl">🎤</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Press</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Galeri dan Kegiatan Section */}
      <Section id="galeri" title="Galeri dan Kegiatan" subtitle="Dokumentasi visual dari berbagai kegiatan dan acara">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom 1 - Album Terbaru */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-3xl">📸</span>
              Album Terbaru
            </h3>
            <div className="space-y-6">
              {galleries?.data && galleries.data.length > 0 ? (
                galleries.data.slice(0, 2).map((album, index) => (
                  <div key={album.id} className="group bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200">
                    <div className="w-full h-40 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                      <span className="text-gray-500 text-4xl">🖼️</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {album.attributes.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">Album #{index + 1}</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">Baru</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-8 rounded-2xl text-center text-gray-500 border-2 border-dashed border-gray-200">
                  <p>Belum ada album tersedia</p>
                </div>
              )}
            </div>
          </div>

          {/* Kolom 2 - Kategori Media */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-3xl">🎬</span>
              Kategori Media
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <span className="text-violet-600 text-2xl">📷</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Foto</p>
              </div>
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <span className="text-violet-600 text-2xl">🎥</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Video</p>
              </div>
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <span className="text-violet-600 text-2xl">📄</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Dokumen</p>
              </div>
              <div className="group bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 cursor-pointer">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <span className="text-violet-600 text-2xl">🎭</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Event</p>
              </div>
            </div>
          </div>

          {/* Kolom 3 - Statistik Galeri */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-3xl">📊</span>
              Statistik Galeri
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  {galleries?.data ? galleries.data.length : 0}
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Album</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  {galleries?.data ? galleries.data.length * 5 : 0}
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Media</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  {galleries?.data ? Math.max(...galleries.data.map((_, i) => i + 1)) : 0}
                </div>
                <p className="text-sm text-gray-600 font-medium">Album Terbaru</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Kontak Section - Redesigned with Modern Cards */}
      <Section id="kontak" title="Hubungi Kami" subtitle="Kirim pesan, kunjungi kantor, atau hubungi tim kami">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kolom 1 - Form Kontak */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-left scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center scroll-flip-x scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">✉️</span>
              Kirim Pesan
            </h3>
            <form className="space-y-6" method="post" action={process.env.NEXT_PUBLIC_FORM_ENDPOINT || '#'}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="scroll-slide-up scroll-animate scroll-stagger-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Nama Lengkap</label>
                  <input 
                    name="name" 
                    required 
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="scroll-slide-up scroll-animate scroll-stagger-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>
              <div className="scroll-slide-up scroll-animate scroll-stagger-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Pesan</label>
                <textarea 
                  name="message" 
                  rows={6} 
                  required 
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button 
                type="submit" 
                className="group bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 scroll-bounce scroll-animate"
              >
                <span className="flex items-center justify-center">
                  Kirim Pesan
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          {/* Kolom 2 - Informasi Kontak */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-right scroll-animate scroll-stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center scroll-flip-y scroll-animate scroll-stagger-2">
              <span className="mr-3 text-3xl">📞</span>
              Informasi Kontak
            </h3>
            <div className="space-y-6">
              <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 scroll-scale scroll-animate scroll-stagger-3">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-blue-600 text-xl">📍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Alamat Kantor</h4>
                </div>
                <p className="text-gray-600 text-sm font-medium">Kompleks DPR RI, Senayan, Jakarta Pusat</p>
              </div>

              <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 scroll-scale scroll-animate scroll-stagger-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                    <span className="text-green-600 text-xl">📧</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                </div>
                <p className="text-gray-600 text-sm font-medium">kontak@dpr-ri.go.id</p>
              </div>

              <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 scroll-scale scroll-animate scroll-stagger-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                    <span className="text-purple-600 text-xl">📞</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Telepon</h4>
                </div>
                <p className="text-gray-600 text-sm font-medium">+62 21 5715 500</p>
              </div>

              <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 scroll-scale scroll-animate scroll-stagger-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                    <span className="text-orange-600 text-xl">🕐</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Jam Kerja</h4>
                </div>
                <p className="text-gray-600 text-sm font-medium">Senin - Jumat: 08:00 - 17:00 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Peta Lokasi - Full Width */}
        <div className="mt-16 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-slide-up scroll-animate scroll-stagger-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center scroll-flip-x scroll-animate scroll-stagger-2">
            <span className="mr-3 text-3xl">🗺️</span>
            Lokasi Kantor
          </h3>
          <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 scroll-scale scroll-animate scroll-stagger-3">
            <iframe 
              title="Peta Lokasi Kantor DPR RI" 
              className="w-full h-full" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              src={process.env.NEXT_PUBLIC_MAP_EMBED_URL || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6666666666667!2d106.79999999999999!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890'}
            />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}



