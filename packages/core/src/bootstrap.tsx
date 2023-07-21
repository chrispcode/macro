export function bootstrap() {
  window.micro = {
    navbar: {
      async bootstrap() {
        import('navbar/bootstrap')
          .then(({ bootstrap }) => {
            bootstrap()
          })
          .catch((error) => {
            console.error('Failed to load Navbar', error);
          });
      }
    }
  }
}