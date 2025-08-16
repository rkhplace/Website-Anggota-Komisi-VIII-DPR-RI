'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up permissions for public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const permissions = {
        'api::profile.profile': {
          controllers: {
            profile: {
              find: { enabled: true, policy: '' },
              findOne: { enabled: true, policy: '' },
            },
          },
        },
        'api::news.news': {
          controllers: {
            news: {
              find: { enabled: true, policy: '' },
              findOne: { enabled: true, policy: '' },
            },
          },
        },
        'api::agendas.agendas': {
          controllers: {
            agendas: {
              find: { enabled: true, policy: '' },
              findOne: { enabled: true, policy: '' },
            },
          },
        },
        'api::galleries.galleries': {
          controllers: {
            galleries: {
              find: { enabled: true, policy: '' },
              findOne: { enabled: true, policy: '' },
            },
          },
        },
      };

      await strapi
        .query('plugin::users-permissions.role')
        .update({
          where: { id: publicRole.id },
          data: { permissions },
        });
    }

    // Create sample profile data if it doesn't exist
    const existingProfile = await strapi.entityService.findMany('api::profile.profile');
    if (!existingProfile || existingProfile.length === 0) {
      await strapi.entityService.create('api::profile.profile', {
        data: {
          name: 'Nama Anggota DPR RI',
          role: 'Anggota DPR RI',
          shortGreeting: 'Selamat datang di website resmi saya. Saya berkomitmen untuk melayani masyarakat dan membawa aspirasi rakyat ke dalam kebijakan nasional.',
          biography: 'Biografi lengkap anggota DPR RI yang berdedikasi untuk melayani masyarakat dan membangun bangsa.',
          education: [
            'S1 Universitas Indonesia',
            'S2 Universitas Gadjah Mada'
          ],
          experiences: [
            'Anggota DPR RI 2019-2024',
            'Ketua Komisi X DPR RI',
            'Mantan Bupati'
          ],
          vision: 'Mewujudkan Indonesia yang maju, mandiri, dan sejahtera melalui pembangunan yang berkelanjutan dan pemerintahan yang bersih.',
          mission: [
            'Meningkatkan kualitas pendidikan nasional',
            'Memperkuat ekonomi kerakyatan',
            'Membangun infrastruktur yang merata',
            'Mendorong inovasi dan teknologi'
          ],
          publishedAt: new Date(),
        },
      });
    }

    // Create sample news if none exist
    const existingNews = await strapi.entityService.findMany('api::news.news');
    if (!existingNews || existingNews.length === 0) {
      await strapi.entityService.create('api::news.news', {
        data: {
          title: 'Kunjungan Kerja ke Daerah Pemilihan',
          slug: 'kunjungan-kerja-daerah-pemilihan',
          excerpt: 'Anggota DPR RI melakukan kunjungan kerja ke daerah pemilihan untuk mendengar aspirasi masyarakat.',
          content: 'Kunjungan kerja ini dilakukan dalam rangka mendengar langsung aspirasi masyarakat dan melihat kondisi terkini di daerah pemilihan. Kegiatan ini penting untuk memastikan kebijakan yang dibuat sesuai dengan kebutuhan riil masyarakat.',
          publishedAt: new Date(),
        },
      });

      await strapi.entityService.create('api::news.news', {
        data: {
          title: 'Rapat Komisi X DPR RI',
          slug: 'rapat-komisi-x-dpr-ri',
          excerpt: 'Rapat membahas anggaran pendidikan dan kebudayaan untuk tahun 2024.',
          content: 'Rapat Komisi X DPR RI membahas alokasi anggaran untuk sektor pendidikan dan kebudayaan. Fokus utama adalah peningkatan kualitas pendidikan dan pelestarian budaya nasional.',
          publishedAt: new Date(),
        },
      });
    }

    // Create sample agendas if none exist
    const existingAgendas = await strapi.entityService.findMany('api::agendas.agendas');
    if (!existingAgendas || existingAgendas.length === 0) {
      await strapi.entityService.create('api::agendas.agendas', {
        data: {
          title: 'Rapat Komisi X DPR RI',
          location: 'Gedung DPR RI, Jakarta',
          startDate: new Date('2024-01-15'),
          description: 'Rapat membahas anggaran pendidikan 2024 dan program prioritas sektor pendidikan.',
          publishedAt: new Date(),
        },
      });

      await strapi.entityService.create('api::agendas.agendas', {
        data: {
          title: 'Kunjungan ke Sekolah Dasar',
          location: 'SDN 01 Jakarta Pusat',
          startDate: new Date('2024-01-20'),
          description: 'Kunjungan untuk melihat langsung kondisi pendidikan di tingkat dasar.',
          publishedAt: new Date(),
        },
      });
    }

    console.log('✅ Strapi bootstrap completed successfully!');
  },
};
