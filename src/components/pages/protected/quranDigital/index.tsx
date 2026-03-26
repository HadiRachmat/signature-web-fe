import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Surah = {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
};

type Ayah = {
  number: number;
  text: string;
  translation?: string;
};

const QuranDigitalPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loadingSurahs, setLoadingSurahs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<number | null>(1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loadingAyahs, setLoadingAyahs] = useState(false);

  const [fontSize, setFontSize] = useState(20);

  // Fetch surah list from a public Quran API (Sutanlab)
  type SurahApi = {
    number: number;
    name: string;
    name_simple?: string;
    englishName?: string;
    translation?: string;
    numberOfAyahs?: number;
    number_of_ayah?: number;
  };

  useEffect(() => {
    const fetchSurahs = async () => {
      setLoadingSurahs(true);
      setError(null);
      try {
        const res = await axios.get<{ data: SurahApi[] }>('https://api.quran.sutanlab.id/surah');
        // API returns data.data which is array of surahs
        const list = res.data.data.map((s: SurahApi) => ({
          number: s.number,
          name: s.name,
          englishName: s.name_simple || s.englishName || s.translation || s.name,
          numberOfAyahs: s.numberOfAyahs ?? s.number_of_ayah ?? 0,
        }));
        setSurahs(list);
        if (list.length > 0) setSelected(list[0].number);
      } catch (e: unknown) {
        console.error(e);
        // fallback to demo data so UI remains usable when API is unreachable
        console.warn('Falling back to demo surah list due to fetch error', e);
        const demo = [
          { number: 1, name: 'Al-Fatihah', englishName: 'The Opening', numberOfAyahs: 7 },
          { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', numberOfAyahs: 286 },
          { number: 112, name: 'Al-Ikhlas', englishName: 'Sincerity', numberOfAyahs: 4 },
        ];
        setSurahs(demo);
        if (demo.length > 0) setSelected(demo[0].number);
        setError('Failed to load surah list from API — using demo data.');
      } finally {
        setLoadingSurahs(false);
      }
    };
    fetchSurahs();
  }, []);

  // Fetch ayahs for selected surah (both arabic and simple translation)
  useEffect(() => {
    if (!selected) return;
    const fetchAyahs = async () => {
      setLoadingAyahs(true);
      setAyahs([]);
      setError(null);
      try {
        // this endpoint returns verses and translations
        const res = await axios.get(`https://api.quran.sutanlab.id/surah/${selected}`);
        type VerseApi = {
          number?: { inSurah?: number } | number;
          number_of_ayah?: number;
          text?: { arab?: string; text?: string } | string;
          text_uthmani?: string;
          arab?: string;
          translation?: { id?: string; text?: string } | string;
          translation_id?: string;
          translation_en?: string;
        };
        const versesData = res.data.data.verses || res.data.data.ayahs || [];
        const verses: VerseApi[] = versesData as VerseApi[];
        const mapped: Ayah[] = verses.map((v: VerseApi) => ({
          number:
            typeof v.number === 'object'
              ? v.number.inSurah ?? 0
              : (v.number as number) ?? v.number_of_ayah ?? 0,
          text:
            (typeof v.text === 'object' ? v.text.arab ?? v.text.text : (v.text as string)) ||
            v.text_uthmani ||
            v.arab ||
            '',
          translation:
            (v.translation && typeof v.translation === 'object' && (v.translation.id || v.translation.text)) ||
            v.translation_id ||
            v.translation_en ||
            (typeof v.translation === 'string' ? v.translation : undefined),
        }));
        setAyahs(mapped);
      } catch (e: unknown) {
        console.error(e);
        // fallback demo ayahs so the reader still shows content
        console.warn('Falling back to demo ayahs for surah', selected, e);
        const demoAyahsMap: Record<number, Ayah[]> = {
          1: [
            { number: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
            { number: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
            { number: 3, text: 'الرَّحْمَـٰنِ الرَّحِيمِ' },
            { number: 4, text: 'مَالِكِ يَوْمِ الدِّينِ' },
            { number: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
            { number: 6, text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ' },
            { number: 7, text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ' },
          ],
          112: [
            { number: 1, text: 'قُلْ هُوَ اللَّهُ أَحَدٌ' },
            { number: 2, text: 'اللَّهُ الصَّمَدُ' },
            { number: 3, text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ' },
            { number: 4, text: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ' },
          ],
        };
        setAyahs(demoAyahsMap[selected as number] || demoAyahsMap[1]);
        setError('Failed to load ayahs from API — using demo verses.');
      } finally {
        setLoadingAyahs(false);
      }
    };
    fetchAyahs();
  }, [selected]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Qur'an Digital</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left: Surah list */}
        <aside className="lg:col-span-1 bg-white rounded shadow p-3 h-150 overflow-y-auto">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Surahs</div>
            <div className="text-xs text-gray-500">{surahs.length}</div>
          </div>

          {loadingSurahs && <div className="text-sm text-gray-500">Loading surahs...</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          <ul className="space-y-1">
            {surahs.map((s) => (
              <li key={s.number}>
                <button
                  onClick={() => setSelected(s.number)}
                  className={`w-full text-left px-2 py-2 rounded hover:bg-gray-50 flex items-center justify-between ${selected === s.number ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                >
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.englishName}</div>
                  </div>
                  <div className="text-xs text-gray-400">{s.number}</div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: Ayahs */}
        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">Font size:</div>
              <input
                type="range"
                min={14}
                max={36}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
              <div className="text-sm text-gray-500">{fontSize}px</div>
            </div>
            <div className="text-sm text-gray-500">
              {selected ? `Surah ${selected}` : 'No surah selected'}
            </div>
          </div>

          <div className="bg-white rounded shadow p-4 min-h-130 overflow-y-auto">
            {loadingAyahs && <div className="text-sm text-gray-500">Loading ayahs...</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}

            {!loadingAyahs && ayahs.length === 0 && (
              <div className="text-sm text-gray-500">No ayahs to display.</div>
            )}

            <div className="space-y-6">
              {ayahs.map((a) => (
                <div key={a.number} className="p-3 border-b last:border-b-0">
                  <div
                    className="text-right"
                    style={{ fontSize: fontSize, lineHeight: 1.8, fontFamily: '"Amiri", serif' }}
                  >
                    {a.text}
                  </div>
                  {a.translation && (
                    <div className="mt-2 text-sm text-gray-600">{a.translation}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuranDigitalPage;
