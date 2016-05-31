module.exports = function(grunt) {
  grunt.initConfig({
    'loopback_auto': {
      'db_autoupdate': {
        options: {
          dataSource: 'db',
          app: './server/server',
          config: './server/model-config',
          method: 'autoupdate'
        }
      },
      'db_automigrate': {
        options: {
          dataSource: 'db',
          app: './server/server',
          config: './server/model-config',
          method: 'automigrate'
        }
      }
    }
  });
  // Load the plugin 
  grunt.loadNpmTasks('grunt-loopback-auto');
  grunt.registerTask('updatedb', ['loopback_auto:db_autoupdate']);
  grunt.registerTask('migratedb', ['loopback_auto:db_automigrate']);
};