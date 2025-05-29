import { cityData } from '@/lib/cities';

export default async function Home({ searchParams }) {
  const sPrams = await searchParams;
  const cityKey = sPrams?.city || 'default';
  const city = cityData[cityKey] || cityData.default;

  const isDefault = cityKey === 'default';

  return (
    <main className="p-8">
      {isDefault ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Choose Your City</h1>
          <ul className="space-y-2">
            {Object.keys(cityData)
              .filter(key => key !== 'default')
              .map(city => (
                <li key={city}>
                  <a
                    href={`http://${city}.${process.env.NEXT_PUBLIC_DOMAIN}`}
                    className="text-blue-600 hover:underline"
                  >
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </a>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">Welcome to {city.title}</h1>
          <ul className="list-disc pl-6">
            {city.attractions.map((place, i) => (
              <li key={i}>{place}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
