export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
};

export default function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <article key={item.id} className="border rounded-lg p-5 hover:shadow-sm transition">
          <h3 className="font-semibold text-lg text-gray-900">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-2 text-gray-600 line-clamp-3">{item.excerpt}</p>
          )}
          <div className="mt-4 text-xs text-gray-500">
            {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('id-ID') : ''}
          </div>
        </article>
      ))}
    </div>
  );
}



