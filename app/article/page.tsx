import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type ContentBlock = {
  type: string;
  children: { type: string; text: string }[];
};

type Article = {
  id: number;
  documentId: string;
  title: string;
  content: ContentBlock[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  keywords: string;
  description: string;
  thumbnail: {
    url: string;
  };
  slug: string;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const res = await fetch(`${process.env.API_URL}/api/article-page`);
  const { data }: { data: Article } = await res.json();

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
  };
};

export default async function Article() {
  const res = await fetch(`${process.env.API_URL}/api/articles?populate=*`);
  const { data }: { data: Article[] } = await res.json();

  return (
    <div className="container mx-auto space-y-10 my-20 px-4">
      <h1 className="text-center font-bold text-5xl">Article Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((d, i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative aspect-video">
              <Image
                src={process.env.API_URL + d.thumbnail.url}
                fill
                alt={d.title}
                className="absolute object-cover"
                sizes="(max-width: 640px) 100vw, (min-width: 640px) 50vw, (min-width: 1024px) 33vw" // Ukuran responsif
              />
            </div>
            <div className="p-5 space-y-5">
              <h5 className="font-semibold text-lg">{d.title}</h5>
              <p>
                {d.description.length > 150
                  ? `${d.description.substring(0, 150)}...`
                  : d.description}
              </p>
              <Link
                href={"/article/" + d.slug}
                className="bg-[#222] text-white px-5 py-2 rounded font-bold hover:bg-black transition-colors inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
