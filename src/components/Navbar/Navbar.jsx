import Weather from '../Dashboard/Weather.jsx';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center m-5 lg:max-w-[900px] lg:mx-auto">
            <img className="w-[98px] h-[106px]" src="../assets/logos/andhra-pradesh-state-new-emblem-logo-ECDF9406BD-seeklogo.com.png" alt="" />
            <Weather />
        </nav>
    );
};

export default Navbar;
