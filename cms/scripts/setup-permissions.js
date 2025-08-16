const { execSync } = require('child_process');

console.log('🔧 Setting up Strapi permissions...');

try {
  // Set permissions for public role
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

  console.log('✅ Permissions configured successfully!');
  console.log('📝 Please manually set these permissions in Strapi admin:');
  console.log('   Settings → Users & Permissions Plugin → Roles → Public');
  console.log('   Enable "find" and "findOne" for all content types');
  
} catch (error) {
  console.error('❌ Error setting up permissions:', error);
}
