export function bootstrap() {
  window.macro = {
    navbar: {
      async bootstrap() {
        import('navbar/bootstrap')
          .then((navbar) => {
            navbar.bootstrap()
          })
          .catch((error) => {
            console.error('🙀 Navbar failed to load because', error);
          });
      }
    }
  }
}