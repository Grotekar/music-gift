export default function Home() {
  return (
    <main className="flex min-h-screen items-center bg-[#f4f0e8] px-5 py-16 text-[#292b28]">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-10 size-14 rounded-full border border-[#a89984]/40 bg-[#d9cfc0]/40 shadow-[inset_0_0_0_10px_rgba(255,255,255,0.22)]" />
        <p className="mb-5 text-xs font-medium tracking-[0.22em] text-[#776c5e] uppercase">
          Музыка как знак внимания
        </p>
        <h1 className="font-serif text-[clamp(3.4rem,15vw,6.8rem)] leading-[0.86] tracking-[-0.055em]">
          Music
          <br />
          Gift
        </h1>
        <div className="mt-10 max-w-lg space-y-5 text-lg leading-8 text-[#555750]">
          <p>
            Это небольшие музыкальные подарки. Каждая страница создаётся для
            поддержки человека в определённый момент.
          </p>
          <p>
            Открыть свою открытку можно по полученной ссылке или коснувшись
            NFC-метки смартфоном.
          </p>
        </div>
      </div>
    </main>
  );
}
