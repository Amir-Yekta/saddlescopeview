import AnimalForm from './components/AnimalForm';
import AnimalList from './components/AnimalList';
import { getAnimals, getExhibits } from '@/app/actions';
import ExhibitForm from './components/ExhibitForm';
import ExhibitList from './components/ExhibitList';

const Home = async () => {
  // Server-side data fetching using our server actions
  const animals = await getAnimals();
  const exhibits = await getExhibits();
  
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <section>
          <div className="flex items-center mt-20 mb-8">
            <div className="h-10 w-2 bg-green-500 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Animals</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimalForm />
            <AnimalList initialAnimals={animals} />
          </div>
        </section>

        <section>
          <div className="flex items-center mt-20 mb-8">
            <div className="h-10 w-2 bg-green-500 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Exhibits</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExhibitForm />
            <ExhibitList initialExhibits={exhibits} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
