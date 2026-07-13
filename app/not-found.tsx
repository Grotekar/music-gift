import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#f4f0e8] px-5 py-16 text-[#292b28]">
      <div className="mx-auto w-full max-w-xl">
        <p className="text-xs tracking-[0.2em] text-[#776c5e] uppercase">404</p>
        <h1 className="mt-5 font-serif text-5xl tracking-tight">Открытка не найдена</h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-[#555750]">
          Возможно, в ссылке потерялся один символ. Проверьте её или вернитесь
          на главную страницу.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block rounded-full border border-[#a89984] px-5 py-3 text-sm transition-colors hover:bg-white/40"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
