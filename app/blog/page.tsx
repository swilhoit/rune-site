import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  excerpt?: string;
  publishedAt: string;
  author?: {
    name: string;
    image?: any;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
}

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    }
  }`;
  
  return client.fetch(query);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <div className="min-h-screen relative bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Beta Warning Banner */}
        <div className="relative z-10 bg-[#725556] text-center py-3 px-6 animate-fadeIn">
          <p className="text-sm text-white font-mono">
            This is a beta version using AI. Use as a guide only and consult a medical professional for accurate advice.
          </p>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-16 py-10 animate-fadeIn animation-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-16">
            <Link href="/">
              <Image
                src="/rune-logo-white 1.png"
                alt="Rune"
                width={120}
                height={35}
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <div className="hidden lg:flex items-center gap-10">
              <a href="#" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">How it Works</a>
              <a href="#" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">FAQ</a>
              <Link href="/health-database" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">Health Database</Link>
              <Link href="/biomarkers" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">Biomarkers</Link>
              <Link href="/blog" className="text-orange-500 hover:text-orange-400 hover:underline transition-all font-mono text-sm">Blog</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-8 py-3 text-white border border-gray-600 rounded-md hover:border-gray-400 hover:text-gray-300 transition-all font-mono text-sm uppercase">
              LOG IN
            </button>
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all font-mono text-sm uppercase">
              SIGN UP
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 container mx-auto px-16 py-12 pb-20">
          <h1 className="text-[72px] font-normal text-white mb-6 font-headline leading-[0.9] animate-fadeInUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Blog
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mb-8 animate-scaleIn opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}></div>
          <p className="text-xl text-gray-300 font-mono max-w-2xl animate-fadeInUp opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            Insights and updates on health, wellness, and the latest research in biomarkers and natural remedies.
          </p>
        </div>

        {/* Main Content */}
        <section className="relative py-24">
          <div className="absolute inset-0 z-0">
            <Image
              src="/light-background.png"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10 container mx-auto px-16">
            {posts.length === 0 ? (
              <div className="text-center py-24 bg-white/90 backdrop-blur rounded-2xl">
                <h2 className="text-3xl font-headline text-gray-900 mb-4">No posts yet</h2>
                <p className="text-gray-600 font-mono">Check back soon for health insights and updates!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="block"
                  >
                    <article
                      className="bg-white/95 backdrop-blur rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 hover:border-orange-200 animate-fadeInUp opacity-0 cursor-pointer h-full flex flex-col"
                      style={{ animationDelay: `${(index % 6) * 100 + 400}ms`, animationFillMode: 'forwards' }}
                    >
                      {post.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={urlForImage(post.mainImage).width(600).height(400).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="text-2xl font-normal mb-3 font-headline text-gray-900">
                          {post.title}
                        </h2>
                        
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {post.categories.map((category) => (
                              <span
                                key={category.slug.current}
                                className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-mono uppercase"
                              >
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {post.excerpt && (
                          <p className="text-gray-600 font-mono text-sm line-clamp-3 mb-4 flex-1">
                            {post.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 font-mono">
                          {post.author && (
                            <span className="flex items-center gap-2">
                              {post.author.image && (
                                <Image
                                  src={urlForImage(post.author.image).width(40).height(40).url()}
                                  alt={post.author.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              )}
                              {post.author.name}
                            </span>
                          )}
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#323232] text-white py-16">
        <div className="container mx-auto px-16">
          <div className="flex flex-col items-center mb-12">
            <Image
              src="/big-logo.png"
              alt="Rune"
              width={400}
              height={150}
              className="h-32 w-auto mb-8"
            />
            <div className="flex gap-12 mb-8">
              <a href="#" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">How it Works</a>
              <a href="#" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">FAQ</a>
              <Link href="/health-database" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">Health Database</Link>
              <Link href="/biomarkers" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">Biomarkers</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">Blog</Link>
            </div>
            <div className="flex gap-4 mb-8">
              <button className="px-8 py-3 text-white border border-gray-600 rounded-md hover:border-gray-400 hover:bg-white/10 transition-all font-mono text-sm uppercase">
                LOG IN
              </button>
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all font-mono text-sm uppercase">
                SIGN UP
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm font-mono mb-2">
              © 2024 Rune. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs font-mono">
              This is a beta version using AI. Use as a guide only and consult a medical professional for accurate advice.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}