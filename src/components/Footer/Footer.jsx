
const Footer = () => {
  return (
    <footer className="bg-[#ccd8f1] p-7 text-center">
      <p className=" text-gray-500">
        Developed by{' '}
        <a 
          href="https://www.qoptars.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Qoptars Private Limited
        </a>{' '}
        and{' '}
        <a 
          href="https://enhub.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Enhub.ai
        </a>
      </p>
      <p className="text-gray-500">&copy; Created for India 2024</p>
    </footer>
  );
};

export default Footer;
