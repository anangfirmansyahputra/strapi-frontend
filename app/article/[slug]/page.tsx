import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type ContentBlock = {
  type: string;
  children: { type: string; text: string; bold: boolean }[];
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

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 10;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const res = await fetch(
    `${process.env.API_URL}/api/articles/${params.slug}?populate=*`
  );
  const { data }: { data: Article } = await res.json();

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      images: `${process.env.API_URL}/${data.thumbnail.url}`,
      url: `${process.env.API_URL}/api/articles/${params.slug}`,
    },
  };
};

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.API_URL}/api/articles/${params.slug}?populate=*`
  );
  const { data }: { data: Article } = await res.json();

  return (
    <div className="container max-w-3xl mx-auto space-y-10 my-10 px-4">
      <Link
        className="inline-block bg-[#222] hover:bg-black transition-colors text-white font-medium px-5 py-2 rounded"
        href={"/article"}
      >
        Back
      </Link>

      <h1 className="text-4xl font-semibold text-center">{data.title}</h1>
      <div className="aspect-video relative rounded-lg overflow-hidden shadow-md mb-5">
        <Image
          src={`${process.env.API_URL}${data.thumbnail.url}`}
          fill
          alt={data.title}
          className="absolute object-cover"
        />
      </div>

      <div className="prose max-w-none">
        {data.content.map((block, index) => (
          <div key={index}>
            {block.type === "paragraph" && (
              <p className="mb-4">
                {block.children.map((child, childIndex) => (
                  <span
                    className={`${child.bold ? "font-bold" : ""} `}
                    key={childIndex}
                  >
                    {child.text}
                  </span>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
