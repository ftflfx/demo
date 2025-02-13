import { getFact } from '../components/Facts/actions';
import FactsClient from '../components/Facts/FactsClient';

export default async function Home() {
  const initialFact = await getFact('en');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <FactsClient initialFact={initialFact} />
      </main>
    </div>
  );
}
