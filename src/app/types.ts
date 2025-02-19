export type Fact = {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
};

// refactored out
// export type GetFactLanguageProps = 'en' | 'de';

export type Language = 'en' | 'de';
