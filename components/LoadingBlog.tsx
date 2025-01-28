import { Header } from './Header';
import { Footer } from './Footer';

export function LoadingBlog() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8 space-y-4">
            <div className="h-12 bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-6 bg-gray-800 rounded-lg animate-pulse w-3/4" />
            <div className="h-4 bg-gray-800 rounded-lg animate-pulse w-24" />
          </div>
          <div className="space-y-4 mb-16">
            <div className="h-4 bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-800 rounded-lg animate-pulse w-5/6" />
            <div className="h-4 bg-gray-800 rounded-lg animate-pulse w-4/6" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
