const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-end gap-x-4 py-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-md">
      <p>All rights reserved &copy; {new Date().getFullYear()}</p>
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/omar-ashraf2"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.2-1.3-1.5-1.3-1.5-1-.7.1-.7.1-.7 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.4 8a4.3 4.3 0 0 1 .1-3.1s1-.3 3.2 1.2a10.8 10.8 0 0 1 5.7 0c2.1-1.5 3.2-1.2 3.2-1.2a4.3 4.3 0 0 1 .1 3.1A4.7 4.7 0 0 1 18 12c0 4.6-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/omar-ashraf-338580182/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 transition-colors"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.25c-1 0-1.75-.75-1.75-1.75s.75-1.75 1.75-1.75 1.75.75 1.75 1.75-.75 1.75-1.75 1.75zm13 10.25h-3v-5c0-1.38-.56-2-1.5-2s-1.5.62-1.5 2v5h-3v-9h3v1.25c.73-.91 2.27-1.25 3.5-1.25 1.94 0 3.5 1.56 3.5 4v5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
