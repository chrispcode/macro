export function bootstrap() {
  window.micro = {
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