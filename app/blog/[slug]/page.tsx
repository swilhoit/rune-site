import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
  };
  excerpt?: string;
  publishedAt: string;
  body: Array<{
    _type: string;
    [key: string]: unknown;
  }>;
  author?: {
    name: string;
    image?: {
      asset?: {
        _ref?: string;
      };
    };
    bio?: string;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    }
  }`;
  
  return client.fetch(query, { slug });
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const query = `*[_type == "post"] { slug }`;
  const posts = await client.fetch(query);
  
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

// Custom portable text components
const components = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <Image
            src={urlForImage(value).width(800).height(450).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-headline font-normal mt-8 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-headline font-normal mt-8 mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-headline font-normal mt-6 mb-3 text-gray-900">{children}</h3>,
    h4: ({ children }: { children: React.ReactNode }) => <h4 className="text-xl font-headline font-normal mt-6 mb-3 text-gray-900">{children}</h4>,
    normal: ({ children }: { children: React.ReactNode }) => <p className="mb-4 text-gray-700 font-mono leading-relaxed">{children}</p>,
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-orange-500 pl-6 my-6 italic text-gray-700 font-mono">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside mb-4 text-gray-700 font-mono">{children}</ul>,
    number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal list-inside mb-4 text-gray-700 font-mono">{children}</ol>,
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    code: ({ children }: { children: React.ReactNode }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm">{children}</code>,
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="text-orange-600 hover:text-orange-700 underline">
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: Post | null = null;
  
  try {
    post = await getPost(slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    notFound();
  }

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
              <Link href="/blog" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">Blog</Link>
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
          
          <div className="relative z-10 container mx-auto px-16 max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-8 animate-fadeIn">
              <Link href="/blog" className="text-gray-600 hover:text-gray-800 font-mono text-sm">
                ← Back to Blog
              </Link>
            </div>

            <article className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              {/* Hero Image */}
              {post.mainImage && (
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={urlForImage(post.mainImage).width(1200).height(600).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              )}

              <div className="p-12">
                {/* Header */}
                <header className="mb-8">
                  <h1 className="text-[48px] font-normal font-headline leading-[1.1] text-gray-900 mb-4">
                    {post.title}
                  </h1>
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mb-6"></div>
                  
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-600">
                    {post.author && (
                      <div className="flex items-center gap-3">
                        {post.author.image && (
                          <Image
                            src={urlForImage(post.author.image).width(60).height(60).url()}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{post.author.name}</p>
                          {post.author.bio && (
                            <p className="text-xs text-gray-500 line-clamp-1">{post.author.bio}</p>
                          )}
                        </div>
                      </div>
                    )}
                    <span className="text-gray-400">•</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    {post.categories && post.categories.length > 0 && (
                      <>
                        <span className="text-gray-400">•</span>
                        <div className="flex gap-2">
                          {post.categories.map((category) => (
                            <span
                              key={category.slug.current}
                              className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs uppercase"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </header>

                {/* Excerpt */}
                {post.excerpt && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <p className="text-lg text-gray-700 font-mono leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>

                {/* Call to Action */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/blog"
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all font-mono text-sm uppercase"
                    >
                      Back to Blog
                    </Link>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 border border-gray-600 text-gray-700 hover:border-gray-400 hover:text-gray-900 rounded-md transition-all font-mono text-sm uppercase">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
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