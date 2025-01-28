import type { Metadata, ResolvingMetadata } from 'next';
import { BlogPost as BlogPostComponent } from '@/components/BlogPost';
import { blogPosts } from '@/lib/blog';

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Wait for params to resolve
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug];

  // Get parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${post.title} | Queflow IA Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [...previousImages]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  };
}

export default async function Page({ params, searchParams }: Props) {
  // Wait for params to resolve
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug];
  return <BlogPostComponent post={post} />;
}
