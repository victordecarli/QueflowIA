import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full py-6 bg-black/30 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
        >
          Queflow IA
        </Link>
      </div>
    </header>
  );
}
