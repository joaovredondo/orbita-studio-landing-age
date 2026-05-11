import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="logo-mark" aria-hidden="true" />
              <span>Órbita</span>
              <span className="logo-studio">Studio</span>
            </Link>
            <p className="footer-description">
              Você fala diretamente comigo do início ao fim.
              Sem intermediários, sem surpresas no meio do caminho.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Navegação</h4>
            <ul className="footer-links">
              <li><Link href="#servicos">Serviços</Link></li>
              <li><Link href="#processo">Processo</Link></li>
              <li><Link href="#portfolio">Portfolio</Link></li>
              <li><Link href="#sobre">Sobre</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Social</h4>
            <ul className="footer-links">
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-title">Contato Rápido</h4>
            <p className="footer-description">Pronto para começar seu projeto? Vamos conversar.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Seu melhor e-mail" className="newsletter-input" />
              <button type="submit" className="newsletter-btn">Enviar</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <span>Órbita Studio</span>
            {' '}· Todos os direitos reservados · João Victor Redondo
          </p>
        </div>
      </div>
    </footer>
  );
};
