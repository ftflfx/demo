'use client';

import { useState, useEffect } from 'react';
import { Heart, TrashIcon } from 'lucide-react';
import { getFact } from '@/components/Facts/actions';
import { Language, Fact } from '@/app/types';
import { Button } from '@/components/ui/button';
import PopoverComponent from '@/components/Facts/Popover';

function FactsClient({ initialFact }: { initialFact: Fact }) {
  const [currentFact, setCurrentFact] = useState<Fact>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentFact');
      return saved ? JSON.parse(saved) : initialFact;
    }
    return initialFact;
  });
  const [favorites, setFavorites] = useState<Fact[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    localStorage.setItem('currentFact', JSON.stringify(currentFact));
  }, [currentFact]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleNewFact = async () => {
    setIsLoading(true);
    try {
      const newFact = await getFact(language);
      setCurrentFact(newFact);
    } catch (error) {
      console.error('Failed to fetch new fact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsLoading(true);
    try {
      const newFact = await getFact(newLanguage);
      setCurrentFact(newFact);
    } catch (error) {
      console.error('Failed to fetch fact in new language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (fact: Fact) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((item) => item.id === fact.id);
      if (isFavorite) {
        return prev.filter((item) => item.id !== fact.id);
      } else {
        return [...prev, fact];
      }
    });
  };

  const isFavorite = (fact: Fact) =>
    favorites.some((item) => item.id === fact.id);

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Buttons (with respective state) */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4">
          <Button
            variant={showFavorites ? 'outline' : 'default'}
            onClick={() => setShowFavorites(false)}
          >
            All Facts
          </Button>
          <Button
            variant={showFavorites ? 'default' : 'outline'}
            onClick={() => setShowFavorites(true)}
          >
            Favorites ({favorites.length})
          </Button>
        </div>

        {/* Popover to handle lang change in server action */}
        <PopoverComponent
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
      </div>

      {showFavorites ? (
        <div className="space-y-4">
          {favorites.map((fact) => (
            <div
              key={fact.id}
              className="p-4 border rounded-lg flex justify-between items-start"
            >
              <p>{fact.text}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(fact)}
              >
                <TrashIcon className="h-5 w-5 fill-grey-500 text-grey-500" />
              </Button>
            </div>
          ))}
          {favorites.length === 0 && (
            <p className="text-gray-500 text-center">No favorites yet</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg flex justify-between items-start">
            <p>{currentFact.text}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(currentFact)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite(currentFact)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }`}
              />
            </Button>
          </div>
          <Button
            onClick={handleNewFact}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Loading...' : 'Get New Fact'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default FactsClient;
