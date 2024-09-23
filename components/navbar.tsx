// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white text-xl font-bold">
            My Blog
          </Link>
        </div>
        <div>
          <Link
            href="/article"
            className="text-gray-300 hover:text-white transition-colors px-4"
          >
            Articles
          </Link>
          {/* Tambahkan link lain di sini jika perlu */}
          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition-colors px-4"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
